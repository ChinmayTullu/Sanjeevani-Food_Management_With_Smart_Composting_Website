'use client'

import { Home, Book, Menu, Target } from 'lucide-react'
import Link from "next/link"
import React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from "@/public/logo.png"
import { useTheme } from "next-themes";

interface LeftSideLinksProps {
  userType: string
}

const LeftSideLinks: React.FC<LeftSideLinksProps> = ({ userType }) => {
  const { theme } = useTheme();
  const pathname = usePathname()

  const getLinkClasses = (path: string) => {
    return cn(
      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out",
      pathname === path
        ? "text-white bg-[#a79f54] shadow-md" // Olive-inspired greenish-brownish-yellowish color
        : "text-gray-700 hover:text-white hover:bg-[#d4c98f]" // Lighter version of the color for hover
    );
  };
  

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div>
            <Image
              src={theme === "dark" ? logo : logo}
              alt="logo"
              width={50}
              height={50}
              className="rounded-md"
            />
          </div>
          <span className="font-montserrat font-extrabold text-3xl text-primary">
            Sanjeevni
          </span>
        </div>
  
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <nav className="text-sm font-medium flex items-center space-x-6">
            {userType!=="business" && userType!=="commonPeople" && (
              <Link href="/landing" className={getLinkClasses("/landing")}>
                <Home className="h-5 w-5" />
                <span className="hover:text-accent transition">Home</span>
              </Link>
            )}
            
            {userType === "commonPeople" && (
              <Link href="http://127.0.0.1:5500/src/Circular%20carousel/index_get.html" className={getLinkClasses("http://127.0.0.1:5500/src/Circular%20carousel/index_get.html")} target='_blank'>
                <Book className="h-5 w-5" />
                <span className="hover:text-accent transition">Home</span>
              </Link>
            )}

            {userType === "commonPeople" && (
              <Link href="/landing" className={getLinkClasses("/landing")} target='_blank'>
                <Book className="h-5 w-5" />
                <span className="hover:text-accent transition">Marketplace</span>
              </Link>
            )}

            {userType === "commonPeople" && (
              <Link href="http://127.0.0.1:5000/" className={getLinkClasses("http://127.0.0.1:5000/")} target='_blank'>
                <Book className="h-5 w-5" />
                <span className="hover:text-accent transition">Recipe Recommend</span>
              </Link>
            )}

            {userType === "commonPeople" && (
              <Link href="/landing/awareness" className={getLinkClasses("/landing/awareness")}>
                <Book className="h-5 w-5" />
                <span className="hover:text-accent transition">Awareness</span>
              </Link>
            )}

              {userType === "commonPeople" && (
                <Link href="/landing/timeline" className={getLinkClasses("/landing/timeline" )}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Inventory</span>
                </Link>
              )}

              {userType === "commonPeople" && (
                <Link href="http://127.0.0.1:5005/" className={getLinkClasses("/landing/smartcompost" )}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Smart Compost</span>
                </Link>
              )}
              
              {/* -------------------------------BUSNINESS--------------------------------- */}

              {userType === "business" && (
                <Link href="/landing/food" className={getLinkClasses("/landing/food")}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Food</span>
                </Link>
              )}

              {userType === "business" && (
                <Link href="/landing/inventory" className={getLinkClasses("/landing/inventory")}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Inventory</span>
                </Link>
              )}

              {userType === "business" && (
                <Link href="/landing/manure" className={getLinkClasses("/landing/manure")}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Manure</span>
                </Link>
              )}

          </nav>
        </div>
      </div>
  
      {/* Mobile Menu Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
  
        {/* Mobile Menu */}
        <SheetContent side="left">
          <div className="flex flex-col space-y-4 mt-6 px-4">
            <nav className="text-sm font-medium space-y-3">
              {userType!=="business" && userType!=="commonPeople" && (
                <Link href="/landing" className={getLinkClasses("/landing")}>
                  <Home className="h-5 w-5" />
                  <span className="hover:text-accent transition">Home</span>
                </Link>
              )}
  
              {userType === "commonPeople" && (
                <Link href="http://127.0.0.1:5000/" className={getLinkClasses("http://127.0.0.1:5000/" )} target="_blank">
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Recommend Recipe</span>
                </Link>
              )}

              {userType === "commonPeople" && (
                <Link href="/landing/awareness" className={getLinkClasses("/landing/awareness" )}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Awareness</span>
                </Link>
              )}

              {userType === "commonPeople" && (
                <Link href="/landing/timeline" className={getLinkClasses("/landing/timeline" )}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Inventory</span>
                </Link>
              )}

              {userType === "commonPeople" && (
                <Link href="http://127.0.0.1:5005/" className={getLinkClasses("/landing/smartcompost" )}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Smart Compost</span>
                </Link>
              )}

            {/* -------------------------------BUSNINESS--------------------------------- */}

                {userType === "business" && (
                  <Link href="/landing/food" className={getLinkClasses("/landing/food")}>
                    <Book className="h-5 w-5" />
                    <span className="hover:text-accent transition">Food</span>
                  </Link>
                )}

                {userType === "business" && (
                  <Link href="/landing/" className={getLinkClasses("/landing/")}>
                    <Book className="h-5 w-5" />
                    <span className="hover:text-accent transition">Food</span>
                  </Link>
                )}

              {userType === "business" && (
                <Link href="/landing/inventory" className={getLinkClasses("/landing/inventory")}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Inventory</span>
                </Link>
              )}

              {userType === "business" && (
                <Link href="/landing/manure" className={getLinkClasses("/landing/manure")}>
                  <Book className="h-5 w-5" />
                  <span className="hover:text-accent transition">Manure</span>
                </Link>
              )}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
  
}

export default LeftSideLinks

