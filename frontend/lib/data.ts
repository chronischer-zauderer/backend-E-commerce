import type { Product, Category, Order, User, AdminMetrics } from "@/lib/types"

// Datos de ejemplo para categorías
export const categories: Category[] = [
  {
    id: "1",
    name: "Electrónica",
    slug: "electronica",
    description: "Productos electrónicos y gadgets",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Ropa",
    slug: "ropa",
    description: "Ropa y accesorios de moda",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Hogar",
    slug: "hogar",
    description: "Productos para el hogar y decoración",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Deportes",
    slug: "deportes",
    description: "Equipamiento y ropa deportiva",
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Datos de ejemplo para productos
export const products: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ Pro",
    slug: "smartphone-xyz-pro",
    description: "El último smartphone con cámara de alta resolución y batería de larga duración.",
    price: 799.99,
    discount: 10,
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    categoryId: "1",
    category: categories[0],
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockQuantity: 50,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Laptop UltraBook",
    slug: "laptop-ultrabook",
    description: "Laptop ultradelgada con procesador de última generación y pantalla de alta resolución.",
    price: 1299.99,
    discount: 0,
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    categoryId: "1",
    category: categories[0],
    rating: 4.8,
    reviewCount: 95,
    inStock: true,
    stockQuantity: 30,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "3",
    name: "Camiseta Premium",
    slug: "camiseta-premium",
    description: "Camiseta de algodón 100% de alta calidad con diseño exclusivo.",
    price: 29.99,
    discount: 15,
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    categoryId: "2",
    category: categories[1],
    rating: 4.2,
    reviewCount: 210,
    inStock: true,
    stockQuantity: 150,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05"),
  },
  {
    id: "4",
    name: "Zapatillas Running Pro",
    slug: "zapatillas-running-pro",
    description: "Zapatillas de running con tecnología de amortiguación avanzada y diseño ligero.",
    price: 119.99,
    discount: 0,
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    categoryId: "4",
    category: categories[3],
    rating: 4.7,
    reviewCount: 78,
    inStock: true,
    stockQuantity: 45,
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-04-20"),
  },
  {
    id: "5",
    name: "Lámpara Moderna",
    slug: "lampara-moderna",
    description: "Lámpara de diseño moderno para decorar cualquier espacio de tu hogar.",
    price: 89.99,
    discount: 20,
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    categoryId: "3",
    category: categories[2],
    rating: 4.3,
    reviewCount: 45,
    inStock: true,
    stockQuantity: 25,
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12"),
  },
  {
    id: "6",
    name: "Auriculares Inalámbricos",
    slug: "auriculares-inalambricos",
    description: "Auriculares inalámbricos con cancelación de ruido y gran calidad de sonido.",
    price: 149.99,
    discount: 5,
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    categoryId: "1",
    category: categories[0],
    rating: 4.6,
    reviewCount: 112,
    inStock: true,
    stockQuantity: 60,
    createdAt: new Date("2023-06-08"),
    updatedAt: new Date("2023-06-08"),
  },
  {
    id: "7",
    name: "Reloj Inteligente",
    slug: "reloj-inteligente",
    description: "Reloj inteligente con múltiples funciones y monitoreo de actividad física.",
    price: 199.99,
    discount: 0,
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    categoryId: "1",
    category: categories[0],
    rating: 4.4,
    reviewCount: 87,
    inStock: true,
    stockQuantity: 40,
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15"),
  },
  {
    id: "8",
    name: "Sofá Modular",
    slug: "sofa-modular",
    description: "Sofá modular de diseño contemporáneo y gran comodidad para tu sala de estar.",
    price: 899.99,
    discount: 15,
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    categoryId: "3",
    category: categories[2],
    rating: 4.9,
    reviewCount: 32,
    inStock: true,
    stockQuantity: 10,
    createdAt: new Date("2023-08-20"),
    updatedAt: new Date("2023-08-20"),
  },
]

// Función para obtener productos destacados
export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Devolver algunos productos como destacados
  return products.slice(0, 4)
}

// Función para obtener todos los productos
export async function getAllProducts(): Promise<Product[]> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return products
}

// Función para obtener un producto por ID
export async function getProductById(id: string): Promise<Product | null> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  const product = products.find((p) => p.id === id)
  return product || null
}

// Función para obtener productos por categoría
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return products.filter((p) => p.categoryId === categoryId)
}

// Función para obtener todas las categorías
export async function getAllCategories(): Promise<Category[]> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return categories
}

// Función para obtener una categoría por ID
export async function getCategoryById(id: string): Promise<Category | null> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  const category = categories.find((c) => c.id === id)
  return category || null
}

// Datos de ejemplo para pedidos
export const orders: Order[] = [
  {
    id: "1",
    userId: "2",
    user: {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      role: "user",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
    },
    items: [
      {
        id: "1",
        orderId: "1",
        productId: "1",
        product: products[0],
        quantity: 1,
        price: 719.99, // Precio con descuento
      },
      {
        id: "2",
        orderId: "1",
        productId: "3",
        product: products[2],
        quantity: 2,
        price: 25.49, // Precio con descuento
      },
    ],
    addressId: "1",
    address: {
      id: "1",
      userId: "2",
      name: "Casa",
      street: "Calle Principal 123",
      city: "Madrid",
      state: "Madrid",
      postalCode: "28001",
      country: "España",
      phone: "+34 612345678",
      isDefault: true,
    },
    paymentMethodId: "1",
    paymentMethod: {
      id: "1",
      userId: "2",
      type: "credit_card",
      provider: "Visa",
      accountNumber: "****1234",
      expiryDate: "12/25",
      isDefault: true,
    },
    status: "delivered",
    subtotal: 770.97,
    tax: 161.9,
    shipping: 0,
    discount: 0,
    total: 932.87,
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-18"),
  },
  {
    id: "2",
    userId: "2",
    user: {
      id: "2",
      name: "Regular User",
      email: "user@example.com",
      role: "user",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
    },
    items: [
      {
        id: "3",
        orderId: "2",
        productId: "6",
        product: products[5],
        quantity: 1,
        price: 142.49, // Precio con descuento
      },
    ],
    addressId: "1",
    address: {
      id: "1",
      userId: "2",
      name: "Casa",
      street: "Calle Principal 123",
      city: "Madrid",
      state: "Madrid",
      postalCode: "28001",
      country: "España",
      phone: "+34 612345678",
      isDefault: true,
    },
    paymentMethodId: "1",
    paymentMethod: {
      id: "1",
      userId: "2",
      type: "credit_card",
      provider: "Visa",
      accountNumber: "****1234",
      expiryDate: "12/25",
      isDefault: true,
    },
    status: "shipped",
    subtotal: 142.49,
    tax: 29.92,
    shipping: 4.99,
    discount: 0,
    total: 177.4,
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-06"),
  },
]

// Función para obtener pedidos de un usuario
export async function getUserOrders(userId: string): Promise<Order[]> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return orders.filter((o) => o.userId === userId)
}

// Función para obtener un pedido por ID
export async function getOrderById(id: string): Promise<Order | null> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  const order = orders.find((o) => o.id === id)
  return order || null
}

// Datos de ejemplo para usuarios
export const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    createdAt: new Date("2023-02-15"),
    updatedAt: new Date("2023-02-15"),
  },
  {
    id: "4",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    createdAt: new Date("2023-03-20"),
    updatedAt: new Date("2023-03-20"),
  },
]

// Función para obtener todos los usuarios
export async function getAllUsers(): Promise<User[]> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  return users
}

// Función para obtener un usuario por ID
export async function getUserById(id: string): Promise<User | null> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = users.find((u) => u.id === id)
  return user || null
}

// Datos de ejemplo para métricas de administrador
export async function getAdminMetrics(): Promise<AdminMetrics> {
  // Simulación de una llamada a API
  await new Promise((resolve) => setTimeout(resolve, 800))

  return {
    totalSales: 15487.65,
    totalOrders: 128,
    activeUsers: 45,
    totalProducts: products.length,
    lowStockProducts: 3,
    topSellingProducts: [products[0], products[5], products[2], products[3]],
    recentOrders: orders,
    salesByCategory: [
      { category: "Electrónica", sales: 8750.25 },
      { category: "Ropa", sales: 3250.75 },
      { category: "Hogar", sales: 2100.5 },
      { category: "Deportes", sales: 1386.15 },
    ],
    monthlySales: [
      { month: "Ene", sales: 1250.5 },
      { month: "Feb", sales: 1450.75 },
      { month: "Mar", sales: 1350.25 },
      { month: "Abr", sales: 1550.0 },
      { month: "May", sales: 1650.5 },
      { month: "Jun", sales: 1750.25 },
      { month: "Jul", sales: 1850.75 },
      { month: "Ago", sales: 1950.0 },
      { month: "Sep", sales: 2050.5 },
      { month: "Oct", sales: 2150.25 },
      { month: "Nov", sales: 0 },
      { month: "Dic", sales: 0 },
    ],
  }
}
