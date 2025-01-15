"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Item } from "@/constants/types/item";

interface AddItemDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: Item) => void;
}

export default function AddItemDialog({
  isOpen,
  onClose,
  onAddItem,
}: AddItemDialogProps) {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleAdd = () => {
    if (name && expiryDate) {
      const newItem: Item = {
        id: crypto.randomUUID(),
        name,
        expiryDate: new Date(expiryDate),
        purchaseDate: new Date(),
      };
      onAddItem(newItem);
      onClose();
      setName("");
      setExpiryDate("");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add New Item</h2>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleAdd}>Add Item</Button>
        </div>
      </div>
    </div>
  ) : null;
}
