import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductById } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, Star, Truck, ShieldCheck, RotateCcw, Heart, Share2 } from "lucide-react"
import AddToCartButton from "./add-to-cart-button"
import ProductImageGallery from "./product-image-gallery"
import RelatedProducts from "./related-products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const discountedPrice = product.price * (1 - product.discount / 100)

  return (
    <div className="container py-8">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              <Home className="h-4 w-4" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/categorias/${product.category.slug}`}>{product.category.name}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Producto */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Galería de imágenes */}
        <ProductImageGallery images={product.images} name={product.name} />

        {/* Información del producto */}
        <div className="flex flex-col gap-4">
          <div>
            <Link href={`/categorias/${product.category.slug}`}>
              <Badge variant="outline" className="mb-2">
                {product.category.name}
              </Badge>
            </Link>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reseñas)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">${discountedPrice.toFixed(2)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <Badge variant="destructive">-{product.discount}%</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="my-2 flex items-center gap-2">
            <Badge variant={product.inStock ? "default" : "secondary"}>
              {product.inStock ? "En Stock" : "Agotado"}
            </Badge>
            {product.inStock && (
              <span className="text-sm text-muted-foreground">{product.stockQuantity} unidades disponibles</span>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <AddToCartButton product={product} />
            <Button variant="outline" className="gap-2">
              <Heart className="h-5 w-5" />
              Añadir a Favoritos
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Compartir</span>
            </Button>
          </div>

          <div className="mt-6 grid gap-4 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Envío Gratis</p>
                <p className="text-sm text-muted-foreground">En pedidos superiores a $50</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Garantía de 2 años</p>
                <p className="text-sm text-muted-foreground">Contra defectos de fabricación</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Devoluciones gratuitas</p>
                <p className="text-sm text-muted-foreground">Hasta 30 días después de la compra</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs de información adicional */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt,
                nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies
                tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
              </p>
              <p>
                Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget
                nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl
                eget nisl.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <tbody className="divide-y">
                  <tr className="bg-muted/50">
                    <td className="px-4 py-3 font-medium">Marca</td>
                    <td className="px-4 py-3">NextCommerce</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Modelo</td>
                    <td className="px-4 py-3">XYZ-123</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-4 py-3 font-medium">Dimensiones</td>
                    <td className="px-4 py-3">10 x 15 x 5 cm</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Peso</td>
                    <td className="px-4 py-3">0.5 kg</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-4 py-3 font-medium">Material</td>
                    <td className="px-4 py-3">Aluminio / Plástico</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Color</td>
                    <td className="px-4 py-3">Negro / Plata</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-4 py-3 font-medium">Garantía</td>
                    <td className="px-4 py-3">2 años</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Resumen de reseñas */}
              <div className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row">
                <div className="flex flex-col items-center justify-center md:w-1/4">
                  <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
                  <div className="mt-2 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{product.reviewCount} reseñas</div>
                </div>

                <div className="flex flex-col gap-2 md:w-3/4">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Simulación de distribución de reseñas
                    const percentage = rating === 5 ? 65 : rating === 4 ? 20 : rating === 3 ? 10 : rating === 2 ? 3 : 2

                    return (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="flex w-24 items-center justify-end gap-1">
                          <span>{rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
                        </div>
                        <div className="w-12 text-sm text-muted-foreground">{percentage}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Lista de reseñas */}
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
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
                          <div className="font-medium">Usuario {i + 1}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(2023, 9 - i, 15 - i * 5).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 5 - i ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm">
                      {i === 0
                        ? "Excelente producto, cumple con todas mis expectativas. La calidad es muy buena y el envío fue rápido. Lo recomiendo totalmente."
                        : i === 1
                          ? "Buen producto, relación calidad-precio adecuada. Llegó en el tiempo estimado y sin problemas."
                          : "Producto aceptable, aunque esperaba un poco más por el precio. El servicio de entrega fue bueno."}
                    </p>
                  </div>
                ))}
              </div>

              <Button className="w-full">Ver todas las reseñas</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Productos relacionados */}
      <RelatedProducts categoryId={product.categoryId} currentProductId={product.id} />
    </div>
  )
}
