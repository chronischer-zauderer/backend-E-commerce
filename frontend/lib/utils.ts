import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function for making authenticated API requests
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @returns Promise with the fetch response
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // Obtener el token de acceso de localStorage
  const accessToken = localStorage.getItem("access_token");

  // Loguear el valor del token para depuración
  console.log("Access token value:", accessToken);

  // Construir headers, solo agrega Authorization si hay token
  const headers = {
    ...(options.headers || {}),
    "Content-Type": "application/json",
    ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
  };

  // Ejecutar la petición fetch con los headers adecuados
  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
