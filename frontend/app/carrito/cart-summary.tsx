"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function CartSummary() {
  const { items, subtotal, total, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)

    // Simular verificación de cupón
    setTimeout(() => {
      toast({
        title: "Cupón inválido",
        description: "El código de cupón ingresado no es válido o ha expirado.",
        variant: "destructive",
      })
      setIsApplyingCoupon(false)
    }, 1000)
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Inicia sesión para continuar",
        description: "Debes iniciar sesión para proceder con el pago.",
      })
      router.push("/login?redirect=/checkout")
      return
    }

    if (items.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Añade productos a tu carrito antes de proceder al pago.",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

  // Calcular impuestos (simulación: 21% IVA)
  const tax = subtotal * 0.21

  // Calcular envío (simulación: gratis si el subtotal > $50, de lo contrario $4.99)
  const shipping = subtotal > 50 ? 0 : 4.99

  // Total final
  const finalTotal = subtotal + tax + shipping

  return (
    <div className="rounded-lg border">
      <div className="p-4 md:p-6">
        <h2 className="mb-4 text-xl font-semibold">Resumen del Pedido</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Impuestos (21%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Envío</span>
            <span>{shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <Separator />

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>

          <div className="pt-4">
            <div className="mb-2 flex gap-2">
              <Input placeholder="Código de cupón" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
              <Button variant="outline" onClick={handleApplyCoupon} disabled={isApplyingCoupon || !couponCode.trim()}>
                {isApplyingCoupon ? "Aplicando..." : "Aplicar"}
              </Button>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Proceder al Pago
            </Button>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>
                Al proceder con el pago, aceptas nuestros{" "}
                <Link href="/terminos" className="underline hover:text-primary">
                  Términos y Condiciones
                </Link>{" "}
                y{" "}
                <Link href="/privacidad" className="underline hover:text-primary">
                  Política de Privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
