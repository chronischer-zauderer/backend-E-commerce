import { getAllProducts, getAllCategories } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()])

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Todos los Productos</h1>

      {/* Filtros y búsqueda */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar productos..." className="pl-9" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Select defaultValue="relevance">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevancia</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="newest">Más Recientes</SelectItem>
              <SelectItem value="rating">Mejor Valorados</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
                <SheetDescription>Ajusta los filtros para encontrar exactamente lo que buscas.</SheetDescription>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-6">
                {/* Filtro por categoría */}
                <div>
                  <h3 className="mb-3 font-medium">Categorías</h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center gap-2">
                        <Checkbox id={`category-${category.id}`} />
                        <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filtro por precio */}
                <div>
                  <h3 className="mb-3 font-medium">Precio</h3>
                  <div className="space-y-4">
                    <Slider defaultValue={[0, 1000]} max={2000} step={10} />
                    <div className="flex items-center justify-between">
                      <div className="w-20">
                        <Input type="number" placeholder="Min" />
                      </div>
                      <span>-</span>
                      <div className="w-20">
                        <Input type="number" placeholder="Max" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtro por valoración */}
                <div>
                  <h3 className="mb-3 font-medium">Valoración</h3>
                  <div className="flex flex-col gap-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill={i < rating ? "currentColor" : "none"}
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={i < rating ? "text-yellow-500" : "text-gray-300"}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                          {rating === 1 ? " y más" : ""}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Filtro por disponibilidad */}
                <div>
                  <h3 className="mb-3 font-medium">Disponibilidad</h3>
                  <div className="flex items-center gap-2">
                    <Checkbox id="in-stock" />
                    <Label htmlFor="in-stock">En stock</Label>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="mt-auto flex gap-2">
                  <Button className="flex-1">Aplicar Filtros</Button>
                  <Button variant="outline">Limpiar</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
