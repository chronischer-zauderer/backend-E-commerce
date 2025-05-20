"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  // Check if passwords match in real-time
  useEffect(() => {
    if (confirmPassword === "") {
      // Don't show error when confirm password field is empty
      setPasswordsMatch(true)
    } else {
      setPasswordsMatch(password === confirmPassword)
    }
  }, [password, confirmPassword])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setEmailError(null)
    setUsernameError(null)

    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: "Campos requeridos",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor, verifica que las contraseñas sean iguales.",
        variant: "destructive",
      })
      return
    }

    if (!acceptTerms) {
      toast({
        title: "Términos y condiciones",
        description: "Debes aceptar los términos y condiciones para registrarte.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          firstName,
          lastName,
          roleId: 1, // Usando roleId 1 como se muestra en el controlador
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        let errorMessage = "Error al registrarse";

        // Check if the response contains a message field
        if (errorData.message) {
          errorMessage = errorData.message;
        } 
        // Check if the response contains an error field
        else if (errorData.error) {
          errorMessage = errorData.error;
        }

        throw new Error(errorMessage);
      }

      const userData = await response.json()

      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente.",
      })

      // Opcional: guardar datos del usuario en localStorage si es necesario
      // localStorage.setItem("user_data", JSON.stringify(userData))

      // Redirect to login page with success message
      router.push("/login?registered=true")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al registrarse";

      // Check for specific error messages
      if (errorMessage.includes("El correo ya está en uso")) {
        setEmailError("Este correo electrónico ya está en uso");
        toast({
          title: "Error de registro",
          description: "El correo electrónico ya está registrado. Por favor, utiliza otro.",
          variant: "destructive",
        });
      } else if (errorMessage.includes("El nombre de usuario ya está en uso")) {
        setUsernameError("Este nombre de usuario ya está en uso");
        toast({
          title: "Error de registro",
          description: "El nombre de usuario ya está registrado. Por favor, elige otro.",
          variant: "destructive",
        });
      } else {
        setError(errorMessage);
        toast({
          title: "Error de registro",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container flex flex-col items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <ShoppingBag className="h-12 w-12" />
          <h1 className="text-3xl font-bold">Crear Cuenta</h1>
          <p className="text-muted-foreground">Regístrate para disfrutar de todos nuestros servicios</p>
        </div>

        {error && <div className="rounded-lg bg-destructive/15 p-4 text-center text-destructive">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input 
              id="username" 
              placeholder="usuario123" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              className={usernameError ? "border-red-500" : ""} 
            />
            {usernameError && (
              <p className="text-sm text-red-500 mt-1">{usernameError}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre</Label>
              <Input id="firstName" placeholder="Tu nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" placeholder="Tu apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && (
              <p className="text-sm text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={!passwordsMatch ? "border-red-500" : ""}
            />
            {!passwordsMatch && (
              <p className="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm leading-none">
              Acepto los{" "}
              <Link href="/terminos" className="font-medium text-primary underline-offset-4 hover:underline">
                términos y condiciones
              </Link>{" "}
              y la{" "}
              <Link href="/privacidad" className="font-medium text-primary underline-offset-4 hover:underline">
                política de privacidad
              </Link>
              .
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <div className="relative flex items-center justify-center">
          <Separator className="w-full" />
          <span className="absolute bg-background px-2 text-xs text-muted-foreground">O regístrate con</span>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.01c.55 0 1-.45 1-1V6.26c0-.55-.45-1-1-1h-3.01v2.77c1.18.78 2 2.04 2 3.51z" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
              <path d="M12 2.04C6.5 2.04 2 6.58 2 12c0 5.42 4.5 9.96 10 9.96 5.5 0 10-4.54 10-9.96C22 6.58 17.5 2.04 12 2.04zm5.49 3.5H6.51c-.89 0-1.79.35-2.36.94l-1.18.88a10.97 10.97 0 0 0-.5 1.54h13.78c-.12-.58-.52-1.08-1.12-1.4z" />
            </svg>
            Facebook
          </Button>
        </div>
      </div>
    </div>
  )
}
