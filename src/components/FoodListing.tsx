'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { FoodCard } from './FoodCard'
import { FoodModal } from './FoodModal'

export default function FoodListing() {
  const [foods, setFoods] = useState([])
  const [selectedFood, setSelectedFood] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve the user UID from localStorage
    const user = localStorage.getItem('user')
    if (user) {
      const storedUid = JSON.parse(user).uid
      if (storedUid) {
        setUid(storedUid)
      }
    }
  }, [])

  useEffect(() => {
    const fetchFoods = async () => {
      // Fetch the food collection from Firestore
      const foodCollection = collection(db, 'Food')
      const foodSnapshot = await getDocs(foodCollection)

      // Map and filter the documents based on `cooked_by_uid`
      const foodList = foodSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(food => food.cooked_by_uid === uid) // Filter based on `uid`

      setFoods(foodList)
    }

    // Only fetch foods if UID is available
    if (uid) {
      fetchFoods()
    }
  }, [uid]) // Dependency on `uid`

  const handleImageClick = (food: any) => {
    setSelectedFood(food)
    setIsModalOpen(true)
  }

  return (
    <div className="container ml-10 pt-0 mt-0">
      <h1 className="ml-10 text-3xl font-bold">Our Food Selection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {foods.map((food) => (
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
  )
}
