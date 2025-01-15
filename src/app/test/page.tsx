"use client";

import { Hero } from "@/components/commonUserPages/hero";
import { Categories } from "@/components/commonUserPages/categories";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/commonUserPages/product-grid";

export default function CommonUserPage() {
  return (
    <div>
      <main>
        <Hero />
        <Categories />
        <ProductGrid />
      </main>
    </div>
  );
}
