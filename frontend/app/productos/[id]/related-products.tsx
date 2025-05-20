import { getProductsByCategory } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export default async function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const allCategoryProducts = await getProductsByCategory(categoryId)

  // Filtrar el producto actual y limitar a 4 productos relacionados
  const relatedProducts = allCategoryProducts.filter((product) => product.id !== currentProductId).slice(0, 4)

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">Productos Relacionados</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
