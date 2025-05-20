"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido a tu carrito.`,
    })
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Eliminado de favoritos" : "Añadido a favoritos",
      description: `${product.name} ha sido ${isFavorite ? "eliminado de" : "añadido a"} tus favoritos.`,
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      {product.discount > 0 && (
        <Badge variant="destructive" className="absolute left-2 top-2 z-10">
          -{product.discount}%
        </Badge>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={toggleFavorite}
      >
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        <span className="sr-only">Añadir a favoritos</span>
      </Button>

      <Link href={`/productos/${product.id}`} className="overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="h-[200px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <Link href={`/productos/${product.id}`} className="mb-2 line-clamp-1">
          <h3 className="font-medium">{product.name}</h3>
        </Link>

        <Link href={`/categorias/${product.category.slug}`}>
          <Badge variant="outline" className="mb-2 w-fit">
            {product.category.name}
          </Badge>
        </Link>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</span>
            {product.discount > 0 && (
              <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Añadir al carrito</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
