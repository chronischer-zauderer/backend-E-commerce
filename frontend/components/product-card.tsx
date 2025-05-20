import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground">{product.category}</div>
        <Link href={`/products/${product.id}`} className="block mt-1">
          <h3 className="font-medium">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-1 gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="mt-2 font-semibold">${product.price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
