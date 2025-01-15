"use client"

import CompostForm from "@/components/ManureForm";
import ManureListing from "@/components/ManureListing";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export default function Manure(){

    return (
        <div>
            <div className="p-5 flex justify-between items-center">
                <Dialog>
                    <DialogTrigger>
                        <button className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600">
                            +
                        </button>
                    </DialogTrigger>
                    <DialogContent className="h-[90%] overflow-scroll">
                        <CompostForm />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="p-5">
                <ManureListing />
            </div>
        </div>
    );

}