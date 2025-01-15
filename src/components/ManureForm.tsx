'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const compostFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be a positive number'),
  image: z.string().url('Invalid image URL').optional(),
  timestamp: z.date(),
})

export default function CompostForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [uid, setUid] = useState<string | null>(null);

  const form = useForm<z.infer<typeof compostFormSchema>>({
    resolver: zodResolver(compostFormSchema),
    defaultValues: {
      timestamp: new Date(),
    },
  })

    useEffect(() => {
      const user = localStorage.getItem('user');
      if(user){
        const storedUid = JSON.parse(user).uid
        if (storedUid) {
          setUid(storedUid);
        } 
      }
    }, []);

  const onSubmit = async (values: z.infer<typeof compostFormSchema>) => {
    setLoading(true)
    try {
      await addDoc(collection(db, "Composts"), {
        ...values,
        image: imageUrl,
        timestamp: new Date(),
        manure_by: uid,
      })
      toast({
        title: "Compost Submitted",
        description: "Your compost has been successfully submitted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit compost. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        if (data.url) {
          setImageUrl(data.url)
          toast({
            title: "Image Uploaded",
            description: "Your image has been successfully uploaded.",
          })
        } else {
          console.error('Error uploading image:', data.error)
        }
      } catch (error) {
        console.error('Error uploading image:', error)
      }
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Compost</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter compost name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter compost description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="Enter price" 
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" onChange={handleImageUpload} />
              </FormControl>
              {imageUrl && (
                <div className="mt-2">
                  <img src={imageUrl} alt="Uploaded compost" className="max-w-xs rounded-md" />
                </div>
              )}
            </FormItem>

            {/* Timestamp (auto-filled) */}
            <FormField
              control={form.control}
              name="timestamp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timestamp</FormLabel>
                  <Input value={format(field.value, 'PPPpp')} disabled />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {loading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
