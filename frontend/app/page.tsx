import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductCard } from "@/components/product-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <Link href="/" className="text-xl font-bold">
            ShopNow
          </Link>
          <div className="hidden w-full max-w-sm mx-auto md:block">
            <form className="relative">
              <Input type="search" placeholder="Search products..." className="w-full" />
            </form>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -mt-1 -mr-1">
                  3
                </span>
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 bg-muted">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Welcome to ShopNow</h1>
              <p className="max-w-md mx-auto mt-4 text-muted-foreground">
                Discover our wide range of products at competitive prices
              </p>
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4 mx-auto sm:px-6">
            <h2 className="mb-8 text-2xl font-bold">Featured Categories</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="flex flex-col items-center p-4 transition-colors border rounded-lg hover:border-primary"
                >
                  <div className="w-16 h-16 mb-2 bg-muted rounded-full flex items-center justify-center">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-center">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4 mx-auto sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Popular Products</h2>
              <Link href="/products" className="text-sm font-medium text-primary">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container px-4 mx-auto sm:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-medium">ShopNow</h3>
              <p className="text-sm text-muted-foreground">Your one-stop shop for all your needs.</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Contact</h3>
              <address className="not-italic text-sm text-muted-foreground">
                <p>123 Shop Street</p>
                <p>Shopville, SH 12345</p>
                <p className="mt-2">Email: info@shopnow.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t">
            <p className="text-sm text-center text-muted-foreground">
              © {new Date().getFullYear()} ShopNow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const categories = [
  { id: 1, name: "Electronics", icon: "📱" },
  { id: 2, name: "Clothing", icon: "👕" },
  { id: 3, name: "Home", icon: "🏠" },
  { id: 4, name: "Sports", icon: "⚽" },
  { id: 5, name: "Beauty", icon: "💄" },
]

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Clothing",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    rating: 4.8,
    reviews: 230,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sports",
    rating: 4.6,
    reviews: 175,
  },
]
