import { CreditCard, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheckoutPage() {
  // Sample order summary data
  const orderSummary = {
    subtotal: 499.97,
    shipping: 10.0,
    tax: 50.0,
    total: 559.97,
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 99.99 },
      { name: "Smart Watch", quantity: 2, price: 199.99 },
    ],
  }

  return (
    <div className="container px-4 py-8 mx-auto sm:px-6">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                  <Input id="address2" placeholder="Apartment, suite, etc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" placeholder="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" placeholder="10001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" placeholder="United States" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" type="tel" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="john.doe@example.com" type="email" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credit-card">
                <TabsList className="w-full">
                  <TabsTrigger value="credit-card" className="flex-1">
                    Credit Card
                  </TabsTrigger>
                  <TabsTrigger value="paypal" className="flex-1">
                    PayPal
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-month">Expiry Month</Label>
                      <Input id="expiry-month" placeholder="MM" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry-year">Expiry Year</Label>
                      <Input id="expiry-year" placeholder="YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-on-card">Name on Card</Label>
                    <Input id="name-on-card" placeholder="John Doe" />
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="mt-4">
                  <div className="text-center">
                    <p className="mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                    <Button>Continue with PayPal</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${orderSummary.total.toFixed(2)}</span>
              </div>

              <div className="pt-4 space-y-4">
                <Button className="w-full" size="lg">
                  Place Order
                </Button>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <CreditCard className="w-4 h-4" />
                  <span>We accept all major credit cards</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
