import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

interface FoodModalProps {
  food: any;
  isOpen: boolean;
  onClose: () => void;
}

export function FoodModal({ food, isOpen, onClose }: FoodModalProps) {
  if (!food) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full">
        <DialogHeader>
          <DialogTitle>{food.food_title}</DialogTitle>
          <DialogDescription>{food.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-4">
            <div className="relative w-full h-[300px]">
              <Image
                src={food.image_url}
                alt={food.food_title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold">Preparation Details</h3>
                <p>Date of Cook: {food.preparation_details.date_of_cook.toDate().toLocaleDateString()}</p>
                <p>Cooked By: {food.preparation_details.cooked_by}</p>
                <p>Cooking Method: {food.preparation_details.cooking_method}</p>
                <p>Spice Level: {food.preparation_details.spice_level}</p>
              </div>
              <div>
                <h3 className="font-bold">Storage Details</h3>
                <p>Kept in Refrigerator: {food.storage_details.kept_in_refrigerator ? 'Yes' : 'No'}</p>
                <p>Shelf Life: {food.storage_details.shelf_life}</p>
                <p>Storage Instructions: {food.storage_details.storage_instructions}</p>
                <p>Expiration Date: {food.storage_details.expiration_date.toDate().toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold">Pricing and Availability</h3>
              <p>Price: ${food.pricing_and_availability.price}</p>
              <p>Discount: {food.pricing_and_availability.discount}%</p>
              <p>Quantity Available: {food.pricing_and_availability.quantity_available}</p>
            </div>
            <div>
              <h3 className="font-bold">Logistics</h3>
              <p>Location: {food.logistics.location}</p>
              <p>Delivery Available: {food.logistics.delivery_availability ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

