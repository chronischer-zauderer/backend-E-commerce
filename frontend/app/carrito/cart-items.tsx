"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/components/ui/use-toast"

export default function CartItems() {
  const { items, updateItemQuantity, removeItem } = useCart()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState<Record<string, boolean>>({})

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    setIsUpdating((prev) => ({ ...prev, [productId]: true }))

    // Simular un pequeño retraso para mostrar el estado de actualización
    setTimeout(() => {
      updateItemQuantity(productId, newQuantity)
      setIsUpdating((prev) => ({ ...prev, [productId]: false }))
    }, 300)
  }

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId)
    toast({
      title: "Producto eliminado",
      description: `${productName} ha sido eliminado de tu carrito.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border p-8 text-center">
        <div className="rounded-full bg-muted p-3">
          <ShoppingCartIcon className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
        <p className="text-muted-foreground">Parece que aún no has añadido ningún producto a tu carrito.</p>
        <Button asChild className="mt-2">
          <Link href="/productos">Explorar Productos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <div className="p-4 md:p-6">
        <h2 className="mb-4 text-xl font-semibold">Productos en tu carrito</h2>

        <div className="divide-y">
          {items.map((item) => (
            <div key={item.productId} className="py-4 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                  <Link href={`/productos/${item.productId}`}>
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <Link href={`/productos/${item.productId}`} className="font-medium hover:text-primary">
                      {item.product.name}
                    </Link>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <div className="mt-1">
                    <Link
                      href={`/categorias/${item.product.category.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item.product.category.name}
                    </Link>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1 || isUpdating[item.productId]}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Disminuir cantidad</span>
                      </Button>

                      <span className="w-8 text-center">{isUpdating[item.productId] ? "..." : item.quantity}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockQuantity || isUpdating[item.productId]}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Aumentar cantidad</span>
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveItem(item.productId, item.product.name)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Eliminar producto</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
