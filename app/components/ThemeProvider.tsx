"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark"

type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// Create context with default values to prevent the "must be used within a ThemeProvider" error
const defaultThemeContext: ThemeContextType = {
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultThemeContext)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [mounted, setMounted] = useState(false)

  // Initialize theme on client-side
  useEffect(() => {
    setMounted(true)

    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null

    if (savedTheme && (savedTheme === "dark" || savedTheme === "light")) {
      setTheme(savedTheme)
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  // Update the DOM when theme changes
  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    // Remove both classes first
    root.classList.remove("light", "dark")

    // Add the current theme class
    root.classList.add(theme)

    // Store the theme preference in localStorage
    localStorage.setItem("theme", theme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === "dark" ? "#0f172a" : "#ffffff")
    }
  }, [theme, mounted])

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  // Provide a value object that won't change unless theme changes
  const contextValue = {
    theme,
    setTheme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

