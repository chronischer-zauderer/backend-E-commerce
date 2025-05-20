"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User } from "@/lib/types"
import { fetchWithAuth } from "@/lib/utils"

// Interfaces for API requests and responses
interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  register: (
      username: string,
      password: string,
      email: string,
      firstName: string,
      lastName: string,
      roleId: number
  ) => Promise<void>
  logout: () => Promise<void>
  loading: boolean
  error: string | null
}


const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si hay un token de acceso en localStorage
        const accessToken = localStorage.getItem("access_token")

        if (accessToken) {
          try {
            const response = await fetchWithAuth("http://localhost:8080/api/auth/validate-token", {
              method: "GET"
            });

            if (response.ok) {
              // Si el token es válido, usar los datos del usuario devueltos por el backend
              const userData = await response.json();
              setUser(userData);
            } else {
              // Si el token no es válido, limpiar el almacenamiento y usar datos locales
              console.log("Token inválido, usando datos locales");
              // Continuar con la lógica de fallback (usar datos de localStorage)
              const userData = JSON.parse(localStorage.getItem("user_data") || "{}")

              if (userData && userData.id) {
                setUser(userData)
              } else {
                // Si no hay datos de usuario válidos, limpiar el almacenamiento
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                localStorage.removeItem("user_data")
              }
            }
          } catch (error) {
            console.error("Error al validar el token:", error);

            // Si hay un error en la petición (no en la validación), intentar usar los datos almacenados en localStorage
            // Este caso es diferente al token inválido, aquí hubo un error de red o servidor
            const userData = JSON.parse(localStorage.getItem("user_data") || "{}")

            if (userData && userData.id) {
              setUser(userData)
            } else {
              // Si no hay datos de usuario válidos, limpiar el almacenamiento
              localStorage.removeItem("access_token")
              localStorage.removeItem("refresh_token")
              localStorage.removeItem("user_data")
            }
          }
        } else {
          // Si no hay token, establecer loading a false inmediatamente
          // para permitir el inicio de sesión normal
          console.log("No hay token de acceso, permitiendo inicio de sesión normal");
          setLoading(false);
          return; // Salir temprano de la función
        }
      } catch (err) {
        console.error("Error al verificar autenticación:", err)
        // En caso de error, limpiar el almacenamiento
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user_data")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // Crear el objeto de solicitud
      const loginRequest: LoginRequest = {
        username,
        password
      };

      // Realizar la petición al endpoint de login
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginRequest),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al iniciar sesión");
        } catch (jsonError) {
          // Si no se puede parsear la respuesta como JSON, mostrar un mensaje genérico
          throw new Error("Nombre de usuario o contraseña incorrectos");
        }
      }


      const authResponse: AuthResponse = await response.json();

      // Guardar ambos tokens
      localStorage.setItem("access_token", authResponse.accessToken);
      localStorage.setItem("refresh_token", authResponse.refreshToken);


      // Por ahora, crearemos un objeto de usuario básico
      const userData: User = {
        id: "1", // Este valor debería venir del backend o del token decodificado
        name: username, // Usamos el username como nombre temporal
        email: username, // Asumimos que el username es un email
        role: "user", // Rol por defecto, debería venir del backend o token
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      localStorage.setItem("user_data", JSON.stringify(userData));
      setUser(userData);

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const register = async (
      username: string,
      password: string,
      email: string,
      firstName: string,
      lastName: string,
      roleId: number
  ) => {
    setLoading(true);
    setError(null);

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
          roleId,
        }),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al registrarse");
        } catch (jsonError) {

          throw new Error("Error al registrarse. Por favor, intente nuevamente.");
        }
      }
      const userData = await response.json();


      setUser(userData);

      router.push("/"); // redirigir a home u otra página
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      setLoading(true);

      // Obtener el refreshToken de localStorage
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        console.error("No hay refresh token para cerrar sesión");
        return;
      }

      const response = await fetchWithAuth("http://localhost:8080/api/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error("Error al cerrar sesión:", errorData.message);
        } catch (jsonError) {
          console.error("Error al cerrar sesión");
        }
        // Si la API no devuelve 200, no cerramos la sesión en el frontend
        return;
      } else {
        console.log("Sesión cerrada correctamente en el servidor");
        // Solo si la API devuelve 200, cerramos la sesión en el frontend
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
        setUser(null);
        router.push("/");
      }
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }

  return context
}
