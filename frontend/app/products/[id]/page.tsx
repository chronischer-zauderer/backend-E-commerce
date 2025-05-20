import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Minus, Plus, ShoppingCart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: Number.parseInt(params.id),
    name: "Wireless Headphones",
    price: 99.99,
    description:
      "Experience premium sound quality with our wireless headphones. Features include noise cancellation, long battery life, and comfortable ear cushions for extended wear.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    rating: 4.5,
    reviews: 120,
    inventory: 25,
    specifications: {
      "Battery Life": "Up to 20 hours",
      "Bluetooth Version": "5.0",
      "Noise Cancellation": "Active",
      Weight: "250g",
      Warranty: "1 year",
    },
  }

  return (
    <div className="container px-4 py-8 mx-auto sm:px-6">
      <div className="flex items-center mb-6 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
        <Link href="/category/electronics" className="text-muted-foreground hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden border rounded-lg">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="object-cover w-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <div key={index} className="overflow-hidden border rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={200}
                  height={200}
                  className="object-cover w-full aspect-square"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2 gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <div>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Minus className="w-4 h-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="w-8 text-center">1</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="w-4 h-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1">
                Buy Now
              </Button>
            </div>
            <div className="mt-4 text-sm text-center text-muted-foreground">
              {product.inventory > 10
                ? "In Stock"
                : product.inventory > 0
                  ? `Only ${product.inventory} left in stock!`
                  : "Out of Stock"}
            </div>
          </div>

          <Tabs defaultValue="specifications">
            <TabsList className="w-full">
              <TabsTrigger value="specifications" className="flex-1">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                        <dd className="mt-1">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="p-4">
                  <p className="text-center text-muted-foreground">Reviews will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
