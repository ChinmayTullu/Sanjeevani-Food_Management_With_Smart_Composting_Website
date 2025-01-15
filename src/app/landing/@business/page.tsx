"use client"

import BusinessAddandViewFood from "@/components/BusinessAddandViewFood"
import FoodListing from "@/components/FoodListing"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function Page(){

    return (
        <div>
            <div className="p-5 flex justify-between items-center">
                <h1 className="text-lg font-bold">Food Service</h1>
                <Dialog>
                    <DialogTrigger>
                        <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            +
                        </button>
                    </DialogTrigger>
                    <DialogContent className="h-[90%] overflow-scroll">
                        <BusinessAddandViewFood />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="p-5">
                <FoodListing />
            </div>
        </div>
    );

}