'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { FoodCard } from '../FoodCard'
import { FoodModal } from '../FoodModal'

export default function FoodListing() {
  const [foods, setFoods] = useState([])
  const [selectedFood, setSelectedFood] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState<string | null>(null);
  
  useEffect(() => {
      const user = localStorage.getItem('user');
      if (user) {
        const storedType = JSON.parse(user).type;
        if (storedType) {
          setType(storedType);
        }
      }
    }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      // Fetch the food collection from Firestore
      const foodCollection = collection(db, 'Food')
      const foodSnapshot = await getDocs(foodCollection)

      // Map and set the food list
      const foodList = foodSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setFoods(foodList)
    }

    fetchFoods()
  }, []) // Removed dependency on `uid`

  const handleImageClick = (food: any) => {
    setSelectedFood(food)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Our Food Selection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foods
          .filter((food) => {
            if (type === "commonPeople") {
              return !food.sold; // Show only unsold food for "commonPeople"
            }
            return true; // Show all food for other users
          })
          .map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onImageClick={() => handleImageClick(food)}
            />
          ))}
      </div>
      <FoodModal
        food={selectedFood}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
  
}
