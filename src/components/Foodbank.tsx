"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, MapPin, Phone } from 'lucide-react';

const FoodDonationSystem = () => {
  const [dish, setDish] = useState('');
  const [bowls, setBowls] = useState('');
  const [items, setItems] = useState([]);
  const [totalBowls, setTotalBowls] = useState(0);

  const foodBanks = {
    large: [
      {
        name: "Community Food Share",
        image: "/api/placeholder/200/200",
        phone: "(555) 123-4567",
        address: "1234 Hope Street, Springfield, ST 12345"
      },
      {
        name: "City Harvest Center",
        image: "/api/placeholder/200/200",
        phone: "(555) 987-6543",
        address: "789 Giving Ave, Metro City, ST 67890"
      }
    ],
    small: [
      {
        name: "Local Food Pantry",
        image: "/api/placeholder/200/200",
        phone: "(555) 234-5678",
        address: "456 Charity Lane, Townsville, ST 23456"
      },
      {
        name: "Neighborhood Kitchen",
        image: "/api/placeholder/200/200",
        phone: "(555) 876-5432",
        address: "321 Kindness Road, Village, ST 34567"
      }
    ]
  };

  const handleAddItem = () => {
    if (dish.trim() && bowls && parseInt(bowls) > 0) {
      const newItem = {
        id: Date.now(),
        dish: dish.trim(),
        bowls: parseInt(bowls)
      };
      setItems(prevItems => [...prevItems, newItem]);
      setTotalBowls(prevTotal => prevTotal + parseInt(bowls));
      setDish('');
      setBowls('');
    }
  };

  const handleDelete = (id, bowlCount) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    setTotalBowls(prevTotal => prevTotal - bowlCount);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 pt-16 px-8 pb-16 font-montserrat">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-orange-700 mb-4 tracking-tight">
            Food Bank Donation System
          </h1>
          <p className="text-orange-600 text-lg">Share your kindness with those in need</p>
        </div>

        {/* Input Section */}
        <Card className="mb-16 mt-8 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="p-12">
            <div className="flex gap-6 items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-orange-700 mb-3">
                  Dish Name
                </label>
                <Input
                  value={dish}
                  onChange={(e) => setDish(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="border-orange-200 focus:border-orange-500 h-12 text-lg transition-all duration-300 hover:border-orange-300"
                  placeholder="Enter dish name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-orange-700 mb-3">
                  Number of Bowls
                </label>
                <Input
                  type="number"
                  value={bowls}
                  onChange={(e) => setBowls(e.target.value)}
                  onKeyPress={handleKeyPress}
                  min="1"
                  className="border-orange-200 focus:border-orange-500 h-12 text-lg transition-all duration-300 hover:border-orange-300"
                  placeholder="Enter number of bowls"
                />
              </div>
              <Button 
                onClick={handleAddItem}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 h-12 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                <Plus className="mr-2 h-5 w-5" /> Add Item
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card className="mb-16 mt-8 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold text-orange-700 mb-8">Added Items</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-5 bg-orange-50 rounded-xl hover:bg-orange-100 transition-all duration-300"
                >
                  <span className="text-orange-900 font-semibold text-lg flex-1">{item.dish}</span>
                  <span className="text-orange-700 text-lg flex-1">{item.bowls} bowls</span>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(item.id, item.bowls)}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-200 transition-all duration-300"
                  >
                    <Trash2 size={24} />
                  </Button>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center text-orange-500 py-10">
                  No items added yet. Start by adding your first dish above.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Food Banks Section */}
        {items.length > 0 && (
          <div className="space-y-8 mt-16">
            <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">
              Recommended Food Banks
              <span className="block text-lg font-normal text-orange-600 mt-3">
                {totalBowls > 30 ? "Large Capacity Centers" : "Small Capacity Centers"}
              </span>
            </h2>
            <div className="grid gap-10 mt-8">
              {(totalBowls > 30 ? foodBanks.large : foodBanks.small).map((bank, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex">
                    <div className="w-64 h-64 relative overflow-hidden">
                      <img
                        src={bank.image}
                        alt={bank.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-12 flex-1 bg-white">
                      <h3 className="text-2xl font-bold text-orange-700 mb-6">
                        {bank.name}
                      </h3>
                      <div className="space-y-4">
                        <p className="text-orange-600 flex items-center">
                          <Phone className="mr-3 h-5 w-5" />
                          {bank.phone}
                        </p>
                        <p className="text-orange-800 flex items-center">
                          <MapPin className="mr-3 h-5 w-5" />
                          {bank.address}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDonationSystem;