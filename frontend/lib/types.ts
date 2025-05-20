// Tipos para el sistema de e-commerce

// Usuario
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
}

// Dirección
export interface Address {
  id: string
  userId: string
  name: string
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

// Categoría
export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId?: string
}

// Producto
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  discount: number
  images: string[]
  categoryId: string
  category: Category
  rating: number
  reviewCount: number
  inStock: boolean
  stockQuantity: number
  createdAt: Date
  updatedAt: Date
}

// Reseña
export interface Review {
  id: string
  productId: string
  userId: string
  user: {
    id: string
    name: string
  }
  rating: number
  comment: string
  createdAt: Date
}

// Carrito de compras
export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  price: number
}

// Método de pago
export interface PaymentMethod {
  id: string
  userId: string
  type: "credit_card" | "paypal" | "bank_transfer"
  provider: string
  accountNumber: string
  expiryDate?: string
  isDefault: boolean
}

// Pedido
export interface Order {
  id: string
  userId: string
  user: User
  items: OrderItem[]
  addressId: string
  address: Address
  paymentMethodId: string
  paymentMethod: PaymentMethod
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  createdAt: Date
  updatedAt: Date
}

// Detalle de pedido
export interface OrderItem {
  id: string
  orderId: string
  productId: string
  product: Product
  quantity: number
  price: number
}

// Inventario
export interface Inventory {
  id: string
  productId: string
  quantity: number
  updatedAt: Date
}

// Métricas para el dashboard de administrador
export interface AdminMetrics {
  totalSales: number
  totalOrders: number
  activeUsers: number
  totalProducts: number
  lowStockProducts: number
  topSellingProducts: Product[]
  recentOrders: Order[]
  salesByCategory: {
    category: string
    sales: number
  }[]
  monthlySales: {
    month: string
    sales: number
  }[]
}
