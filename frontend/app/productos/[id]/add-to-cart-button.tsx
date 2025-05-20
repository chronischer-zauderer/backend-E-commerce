"use client"

import { useState } from "react"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: "Producto añadido",
      description: `${quantity} ${quantity === 1 ? "unidad" : "unidades"} de ${product.name} ${quantity === 1 ? "ha sido añadida" : "han sido añadidas"} a tu carrito.`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center rounded-md border">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none border-r"
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Disminuir cantidad</span>
        </Button>
        <div className="flex h-10 w-12 items-center justify-center text-center">{quantity}</div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-none border-l"
          onClick={increaseQuantity}
          disabled={quantity >= product.stockQuantity}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Aumentar cantidad</span>
        </Button>
      </div>

      <Button className="h-10 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
        <ShoppingCart className="h-5 w-5" />
        Añadir al Carrito
      </Button>
    </div>
  )
}
