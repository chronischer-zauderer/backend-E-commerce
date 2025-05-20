import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CartPage() {
  // Sample cart data
  const cartItems = [
    {
      id: 1,
      productId: 1,
      name: "Wireless Headphones",
      price: 99.99,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      productId: 3,
      name: "Smart Watch",
      price: 199.99,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10.0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="container px-4 py-8 mx-auto sm:px-6">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cartItems.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-md"
                          />
                        </TableCell>
                        <TableCell>
                          <Link href={`/products/${item.productId}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center border rounded-md w-fit">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Minus className="w-3 h-3" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Plus className="w-3 h-3" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-red-500">
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Continue Shopping</Button>
                <Button variant="outline">Update Cart</Button>
              </CardFooter>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <div className="pt-4">
                  <div className="mb-4">
                    <h3 className="mb-2 font-medium">Promo Code</h3>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="mb-4 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-8 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link href="/">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
