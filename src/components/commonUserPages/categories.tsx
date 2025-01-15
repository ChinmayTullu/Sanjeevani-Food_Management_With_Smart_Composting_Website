import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  {
    title: "Vegetable",
    subtitle: "Local market",
    icon: "🥦",
  },
  {
    title: "Snacks & Breads",
    subtitle: "In store delivery",
    icon: "🥖",
  },
  {
    title: "Fruits",
    subtitle: "Comical free",
    icon: "🍊",
  },
  {
    title: "Chicken legs",
    subtitle: "Frozen Meal",
    icon: "🍗",
  },
  {
    title: "Milk & Dairy",
    subtitle: "Process food",
    icon: "🧀",
  },
]

export function Categories() {
  return (
    <section className="pt-9 pb-4">
      
      <div className="container px-2  ">
      <h1 className="text-3xl font-semibold pb-5 ml-12">What we Serve</h1>
        <div className="flex overflow-x-auto gap-4  ml-12">
          {categories.map((category) => (
            <Card key={category.title} className="min-w-[220px] p-2 flex flex-col gap-2">
              <span className="text-4xl">{category.icon}</span>
              <h3 className="font-semibold">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.subtitle}</p>
            </Card>
          ))}
          <Button className="min-w-[200px] bg-secondary hover:bg-secondary/90 text-primary flex gap-2">
            See all
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

