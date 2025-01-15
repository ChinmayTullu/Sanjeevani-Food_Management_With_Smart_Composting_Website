"use client";

import { Hero } from "@/components/commonUserPages/hero";
import { Categories } from "@/components/commonUserPages/categories";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FoodListing from "@/components/commonUserPages/product-grid";

export default function CommonUserPage() {

  return (
    <div>
      {/* <Header /> */}
      <main>
        <Hero />
        <Categories />
        <div className="pl-12">
          <FoodListing />
        </div>
      </main>
    </div>
  );
}
