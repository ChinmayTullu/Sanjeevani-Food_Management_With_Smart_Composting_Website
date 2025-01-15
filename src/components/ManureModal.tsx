import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface ManureModalProps {
  manure: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ManureModal({ manure, isOpen, onClose }: ManureModalProps) {
  if (!manure) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>{manure.manure_title}</DialogTitle>
          <DialogDescription>{manure.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-4">
            <div className="relative w-full h-[300px]">
              <Image
                src={manure.image_url}
                alt={manure.manure_title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div>
              <h3 className="font-bold">Details</h3>
              <p>Type: {manure.type}</p>
              <p>Organic: {manure.organic ? 'Yes' : 'No'}</p>
              <p>Nutritional Content: {manure.nutritional_content}</p>
            </div>
            <div>
              <h3 className="font-bold">Pricing</h3>
              <p>Price: ${manure.price}</p>
              <p>Available Quantity: {manure.quantity_available}</p>
            </div>
            <div>
              <h3 className="font-bold">Logistics</h3>
              <p>Location: {manure.location}</p>
              <p>Delivery Available: {manure.delivery ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
