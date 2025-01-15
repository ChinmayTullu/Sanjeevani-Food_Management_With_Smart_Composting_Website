"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react"; // Import Lucide icon

export interface Item {
  id: string;
  name: string;
  purchaseDate: string;
  expiryDate: string;
  status: string;
  image: string | null; // Image property
}

const Timeline = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", expiryDate: "", image: null });

  const addItem = () => {
    if (newItem.name && newItem.expiryDate) {
      const purchaseDate = new Date().toISOString();
      const expiryDate = newItem.expiryDate;

      const expDate = new Date(expiryDate).getTime();
      const now = new Date().getTime();
      const daysRemaining = (expDate - now) / (1000 * 60 * 60 * 24);

      let status = "Expired";
      if (daysRemaining > 0 && daysRemaining <= 3) {
        status = "Expiring Soon";
      } else if (daysRemaining > 3) {
        status = "Fresh";
      }

      setItems([
        ...items,
        {
          id: crypto.randomUUID(),
          name: newItem.name,
          purchaseDate,
          expiryDate,
          status,
          image: newItem.image,
        },
      ]);

      setNewItem({ name: "", expiryDate: "", image: null });
      setIsAddDialogOpen(false);
    }
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const calculatePosition = (expiryDate: string): string => {
    const now = new Date().getTime();
    const expDate = new Date(expiryDate).getTime();
    const range = 30 * 24 * 60 * 60 * 1000; // 30 days
    const position = ((expDate - now) / range) * 100;

    return `${Math.max(0, Math.min(100, position))}%`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Fresh":
        return "green";
      case "Expiring Soon":
        return "yellow";
      case "Expired":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="container mx-auto p-6 pl-20 pr-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Expiry Timeline</h1>

      {/* Timeline */}
      <div className="relative mb-6">
        <div className="h-3 bg-gradient-to-r from-red-500 to-green-500 rounded-full"></div>
        <div className="absolute -top-6 left-0 text-red-600 font-bold">Expired</div>
        <div className="absolute -top-6 right-0 text-green-600 font-bold">Fresh</div>
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute -top-1 transform -translate-x-1/2"
            style={{ left: calculatePosition(item.expiryDate) }}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: getStatusColor(item.status) }}
            ></div>
            <div className="text-xs text-center">
              <p className="font-bold">{item.name}</p>
              <p>{new Date(item.expiryDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <Button onClick={() => setIsAddDialogOpen(true)}>Add Item</Button>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="border rounded-2xl shadow-md overflow-hidden  w-200 h-400">
            {item.image && (
              <div className="h-40 bg-gray-100">
                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
              </div>
            )}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500">
                Purchase Date: {new Date(item.purchaseDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Expiry Date: {new Date(item.expiryDate).toLocaleDateString()}
              </p>
              <p
                className={`text-sm font-bold ${
                  item.status === "Fresh"
                    ? "text-green-600"
                    : item.status === "Expiring Soon"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {item.status}
              </p>
              <div
                className="flex justify-end mt-4 text-red-500 cursor-pointer"
                onClick={() => deleteItem(item.id)}
              >
                <Trash className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Dialog */}
      {isAddDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="border p-2 w-full mb-4"
            />
            <input
              type="date"
              value={newItem.expiryDate}
              onChange={(e) =>
                setNewItem({ ...newItem, expiryDate: e.target.value })
              }
              className="border p-2 w-full mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewItem({
                  ...newItem,
                  image: e.target.files?.[0]
                    ? URL.createObjectURL(e.target.files[0])
                    : null,
                })
              }
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setIsAddDialogOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button onClick={addItem}>Add</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
