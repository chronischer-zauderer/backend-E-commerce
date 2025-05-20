import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/data"
import { ArrowRight, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Banner promocional"
          width={1200}
          height={500}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">Descubre Nuestra Colección</h1>
          <p className="mb-6 max-w-lg text-lg">Productos de alta calidad con los mejores precios del mercado</p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/productos">
                Ver Productos <ShoppingBag className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10">
              <Link href="/categorias">Explorar Categorías</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Productos Destacados</h2>
          <Button variant="ghost" asChild>
            <Link href="/productos" className="flex items-center">
              Ver todos <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container">
        <h2 className="mb-6 text-3xl font-bold">Categorías Populares</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Link href="/categorias/electronica" className="group relative h-40 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=160&width=300"
              alt="Electrónica"
              width={300}
              height={160}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-bold text-white">Electrónica</h3>
            </div>
          </Link>
          <Link href="/categorias/ropa" className="group relative h-40 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=160&width=300"
              alt="Ropa"
              width={300}
              height={160}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-bold text-white">Ropa</h3>
            </div>
          </Link>
          <Link href="/categorias/hogar" className="group relative h-40 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=160&width=300"
              alt="Hogar"
              width={300}
              height={160}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-bold text-white">Hogar</h3>
            </div>
          </Link>
          <Link href="/categorias/deportes" className="group relative h-40 overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=160&width=300"
              alt="Deportes"
              width={300}
              height={160}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl font-bold text-white">Deportes</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-12">
        <div className="container">
          <h2 className="mb-8 text-center text-3xl font-bold">Lo que dicen nuestros clientes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} filled={star <= 5} />
                  ))}
                </div>
                <p className="mb-4 text-muted-foreground">
                  "Excelente servicio y productos de alta calidad. Definitivamente volveré a comprar."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      alt="Avatar"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Cliente {i}</p>
                    <p className="text-sm text-muted-foreground">Cliente frecuente</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={filled ? "text-yellow-500" : "text-gray-300"}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
