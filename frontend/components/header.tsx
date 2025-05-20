"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  LogOut,
  ShoppingBag,
  Heart,
  Settings,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import { cn } from "@/lib/utils"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { items } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementar búsqueda
    console.log("Buscando:", searchQuery)
  }

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevenir múltiples clics

    setIsLoggingOut(true);
    try {
      await logout();
      // No es necesario hacer nada más aquí, ya que el logout
      // se encarga de redirigir y limpiar el estado
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const isAdmin = user?.role === "admin"
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingBag className="h-6 w-6" />
          <span>NextCommerce</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/productos" || pathname.startsWith("/productos/")
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            Productos
          </Link>
          <Link
            href="/categorias"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/categorias" || pathname.startsWith("/categorias/")
                ? "text-primary"
                : "text-muted-foreground",
            )}
          >
            Categorías
          </Link>
          <Link
            href="/contacto"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contacto" ? "text-primary" : "text-muted-foreground",
            )}
          >
            Contacto
          </Link>
        </nav>

        {/* Search, Cart, User */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-[200px] lg:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
              <Search className="h-4 w-4" />
              <span className="sr-only">Buscar</span>
            </Button>
          </form>

          {/* Cart */}
          <Link href="/carrito">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]"
                >
                  {totalItems}
                </Badge>
              )}
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Perfil</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/perfil" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pedidos" className="cursor-pointer">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>Mis Pedidos</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favoritos" className="cursor-pointer">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Favoritos</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Panel Admin</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/configuracion" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Configuración</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout} 
                  className="cursor-pointer"
                  disabled={isLoggingOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesión
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center justify-center">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <ShoppingBag className="h-6 w-6" />
                    <span>NextCommerce</span>
                  </Link>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                      <span className="sr-only">Cerrar</span>
                    </Button>
                  </SheetTrigger>
                </div>

                <form onSubmit={handleSearch} className="flex relative">
                  <Input
                    type="search"
                    placeholder="Buscar productos..."
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Buscar</span>
                  </Button>
                </form>

                <nav className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/" ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    Inicio
                  </Link>
                  <Link
                    href="/productos"
                    className={cn(
                      "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/productos" || pathname.startsWith("/productos/")
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    Productos
                  </Link>
                  <Link
                    href="/categorias"
                    className={cn(
                      "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/categorias" || pathname.startsWith("/categorias/")
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    Categorías
                  </Link>
                  <Link
                    href="/contacto"
                    className={cn(
                      "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname === "/contacto" ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    Contacto
                  </Link>
                </nav>

                <div className="mt-auto flex flex-col gap-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 py-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Link href="/perfil">
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-4 w-4" />
                          Mi Perfil
                        </Button>
                      </Link>
                      <Link href="/pedidos">
                        <Button variant="outline" className="w-full justify-start">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Mis Pedidos
                        </Button>
                      </Link>
                      {isAdmin && (
                        <Link href="/admin">
                          <Button variant="outline" className="w-full justify-start">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Panel Admin
                          </Button>
                        </Link>
                      )}
                      <Button variant="default" className="w-full justify-start" onClick={handleLogout} disabled={isLoggingOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Link href="/login">
                        <Button className="w-full">Iniciar Sesión</Button>
                      </Link>
                      <Link href="/registro">
                        <Button variant="outline" className="w-full">
                          Registrarse
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
