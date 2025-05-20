import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartItems from "./cart-items"
import CartSummary from "./cart-summary"

export default function CartPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Tu Carrito</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItems />
        </div>

        <div>
          <CartSummary />
        </div>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-lg border bg-muted/50 p-6 text-center">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">¿Necesitas ayuda con tu compra?</h2>
        <p className="text-muted-foreground">
          Nuestro equipo de atención al cliente está disponible para ayudarte con cualquier duda.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/contacto">Contactar Soporte</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/faq">Preguntas Frecuentes</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
