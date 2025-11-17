"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "default" | "ocean" | "sunset" | "forest"

interface ThemeContextType {
  currentTheme: Theme
  setCurrentTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("default")

  useEffect(() => {
    const saved = localStorage.getItem("moneymates-theme") as Theme
    if (saved) {
      setCurrentTheme(saved)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("moneymates-theme", currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

export const themeStyles = {
  default: {
    background: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950",
    header: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800",
    card: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
  },
  ocean: {
    background: "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-950 dark:via-cyan-950 dark:to-teal-950",
    header: "bg-blue-100/80 dark:bg-blue-900/80 backdrop-blur-lg border-b border-blue-200 dark:border-blue-800",
    card: "bg-white dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700",
  },
  sunset: {
    background: "bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-orange-950 dark:via-pink-950 dark:to-purple-950",
    header: "bg-orange-100/80 dark:bg-orange-900/80 backdrop-blur-lg border-b border-orange-200 dark:border-orange-800",
    card: "bg-white dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700",
  },
  forest: {
    background: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950 dark:via-emerald-950 dark:to-teal-950",
    header: "bg-green-100/80 dark:bg-green-900/80 backdrop-blur-lg border-b border-green-200 dark:border-green-800",
    card: "bg-white dark:bg-green-900/30 border border-green-200 dark:border-green-700",
  },
}
