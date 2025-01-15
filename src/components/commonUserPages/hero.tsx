import { Button } from "@/components/ui/button"
import Image from "next/image"
import bag from "@/public/img/bag.png"
import pumpkin from  "@/public/img/pumpkin.png"
import { useTheme } from "next-themes";

export function Hero() {
   const { theme } = useTheme();
   return (
    <div className="relative bg-orange-100 overflow-hidden">
      <div className="container px-0 py-0 md:py-0">
        <div className="grid md:grid-cols-2 gap-2 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-orange-600  ml-20 leading-tight">
              We bring the store to your door
            </h1>
            <p className="text-lg text-orange-400/80 ml-20">
              Get organic produce and sustainably sourced groceries delivered at up to 4% off grocery prices.
            </p>
            
          </div>
  
          {/* Image Section */}
          <div className="relative flex justify-center md:justify-end">
            <div className="bg-brown-100 p-0 rounded-lg ">
              <Image
                src={theme === "dark" ? pumpkin : pumpkin}
                alt="Organic Grocery Bag"
                width={300}
                height={300}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

