"use client"

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge'
import { ExternalLink } from 'lucide-react'

interface ManureCardProps {
  manure: any;
  onCardClick: () => void;
}

export function ManureCard({ manure, onCardClick }: ManureCardProps) {
  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold line-clamp-2">
          {manure.manure_title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="relative w-full pt-[75%] overflow-hidden rounded-lg cursor-pointer group"
          onClick={onCardClick}
        >
          <img
            src={manure.image_url}
            alt={manure.manure_title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-4 line-clamp-3">
          {manure.description}
        </p>
        <Badge variant="secondary" className="mt-2">
          {manure.type}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onCardClick}
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
