'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { initializeApp } from 'firebase/app'  
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { db } from '@/config/firebase'
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchFoodExpiry } from '@/constants/genAi'

const formSchema = z.object({
  food_title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string(),
  cuisine: z.string(),
  date_of_cook: z.date(),
  cooked_by: z.string().optional(),
  cooking_method: z.string(),
  spice_level: z.string(),
  kept_in_refrigerator: z.boolean(),
  shelf_life: z.string(),
  storage_instructions: z.string(),
//   expiration_date: z.date(),
  price: z.number().positive(),
  discount: z.number().min(0),
  quantity_available: z.number().int().positive(),
  location: z.string(),
  delivery_availability: z.boolean(),
})

export default function FoodForm() {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState<boolean>(false);
  const [uid, setUid] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kept_in_refrigerator: false,
      delivery_availability: false,
      cooked_by_uid: '',
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
    const expiryDateResponse = await fetchFoodExpiry(values.food_title);
    const expirationDate = new Date(expiryDateResponse.text);
      const docRef = await addDoc(collection(db, "Food"), {
        ...values,
        image_url: imageUrl,
        cooked_by_uid: uid,
        sold: false,
        preparation_details: {
          date_of_cook: values.date_of_cook,
          cooked_by: values.cooked_by,
          cooking_method: values.cooking_method,
          spice_level: values.spice_level
        },
        storage_details: {
          kept_in_refrigerator: values.kept_in_refrigerator,
          shelf_life: values.shelf_life,
          storage_instructions: values.storage_instructions,
        //   expiration_date: values.expiration_date
        expiration_date: expirationDate,

        },
        pricing_and_availability: {
          price: values.price,
          discount: values.discount,
          quantity_available: values.quantity_available,
        },
        logistics: {
          location: values.location,
          delivery_availability: values.delivery_availability
        }
      })
      toast({
        title: "Food Uploaded",
        description: "Food Successfully Uploaded",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Please try again",
        variant: "destructive",
      });
    } finally{
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        if (data.url) {
          setImageUrl(data.url);
        } else {
          console.error('Error uploading image:', data.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };


  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Food Item</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="food_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter food title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                        <SelectItem value="Non-Vegetarian">Non-Vegetarian</SelectItem>
                        <SelectItem value="Vegan">Vegan</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter food description" className="min-h-[100px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload Section */}
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input type="file" onChange={handleImageUpload} />
              </FormControl>
              <FormDescription>Upload an image of the food item</FormDescription>
              {imageUrl && (
                <div className="mt-2">
                  <img src={imageUrl} alt="Uploaded food" className="max-w-xs rounded-md" />
                </div>
              )}
            </FormItem>

            {/* Cooking Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter cuisine type" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cooking_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooking Method</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter cooking method" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spice_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spice Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select spice level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Mild">Mild</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hot">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Dates Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date_of_cook"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Cook</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Storage Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="shelf_life"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shelf Life</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter shelf life" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="storage_instructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage Instructions</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter storage instructions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing and Availability Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (  
                  <FormItem>
                    <FormLabel>Discount</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="Enter discount" 
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity_available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity Available</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter quantity" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Additional Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="cooked_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cooked By</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Who cooked ?" {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Checkboxes Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="kept_in_refrigerator"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Kept in Refrigerator</FormLabel>
                      <FormDescription>
                        Check if the food item needs to be refrigerated
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="delivery_availability"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Delivery Available</FormLabel>
                      <FormDescription>
                        Check if delivery is available for this food item
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

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
  );  

}

