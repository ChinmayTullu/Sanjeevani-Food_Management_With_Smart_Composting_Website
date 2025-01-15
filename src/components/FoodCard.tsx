"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, Plus, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FoodCardProps {
  food: any;
  onImageClick: () => void;
}

export function FoodCard({ food, onImageClick }: FoodCardProps) {
  const [type, setType] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const storedType = JSON.parse(user).type;
      if (storedType) {
        setType(storedType);
      }
    }
  }, []);

  const addToCart = () => {
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add new item to cart
    const updatedCart = [...existingCart, {
      id: food.id,
      title: food.food_title,
      price: food.pricing_and_availability.price,
      image: food.image_url,
      quantity: 1
    }];
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const navigateToCart = () => {
    router.push('/cart'); // Navigate to cart page
  };

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold line-clamp-2">{food.food_title}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {food.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="relative w-full pt-[75%] overflow-hidden rounded-lg cursor-pointer group"
          onClick={onImageClick}
        >
          <img
            src={food.image_url}
            alt={food.food_title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-3">
          {food.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {food.cuisine}
          </Badge>
          {food.pricing_and_availability?.available && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Available now
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">
              ${food.pricing_and_availability.price}
            </p>
            {food.pricing_and_availability?.original_price && (
              <p className="text-sm text-gray-500 line-through">
                ${food.pricing_and_availability.original_price}
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            {type === "commonPeople" && (
              <Button 
                onClick={addToCart}
                variant="outline"
                className="w-12"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
            <Button 
              onClick={onImageClick}
              className="w-32"
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
      {type === "commonPeople" && (
        <CardFooter>
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={navigateToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            View Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}