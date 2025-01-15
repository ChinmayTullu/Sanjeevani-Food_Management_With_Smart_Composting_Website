'use client'

import { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { ManureCard } from './ManureCard'
import { ManureModal } from './ManureModal'

export default function ManureListing() {
  const [manures, setManures] = useState([])
  const [selectedManure, setSelectedManure] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      const storedUid = JSON.parse(user).uid
      if (storedUid) {
        setUid(storedUid)
      }
    }
  }, [])

  useEffect(() => {
    const fetchManures = async () => {
      const compostCollection = collection(db, 'Composts')
      const compostSnapshot = await getDocs(compostCollection)

      const manureList = compostSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(manure => manure.manure_by === uid)

      setManures(manureList)
    }

    if (uid) {
      fetchManures()
    }
  }, [uid])

  const handleCardClick = (manure: any) => {
    setSelectedManure(manure)
    setIsModalOpen(true)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Available Compost & Manures</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {manures.map((manure) => (
          <ManureCard
            key={manure.id}
            manure={manure}
            onCardClick={() => handleCardClick(manure)}
          />
        ))}
      </div>
      <ManureModal
        manure={selectedManure}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
