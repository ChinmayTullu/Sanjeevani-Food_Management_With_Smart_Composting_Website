import { NextResponse } from 'next/server';
import { db } from '@/config/firebase';

export async function PUT(request: Request) {
  try {
    const { id, sold } = await request.json();

    // Update the food item in your database
    const updatedFood = await db.food.update({
      where: {
        id: id
      },
      data: {
        sold: sold
      }
    });

    return NextResponse.json(updatedFood);
  } catch (error) {
    console.error('Error updating food status:', error);
    return NextResponse.json(
      { error: 'Error updating food status' },
      { status: 500 }
    );
  }
}