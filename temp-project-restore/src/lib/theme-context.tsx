"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Theme = "default" | "romance" | "miami" | "galaxy" | "pink-finance" | "infinite-wealth"

interface ThemeContextType {
  currentTheme: Theme
  setTheme: (theme: Theme) => void
  unlockedThemes: Set<Theme>
  unlockTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>("default")
  const [unlockedThemes, setUnlockedThemes] = useState<Set<Theme>>(new Set(["default"]))

  // Load from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("moneymates-theme") as Theme
    const savedUnlocked = localStorage.getItem("moneymates-unlocked-themes")
    
    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }
    
    if (savedUnlocked) {
      setUnlockedThemes(new Set(JSON.parse(savedUnlocked)))
    }
  }, [])

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    localStorage.setItem("moneymates-theme", theme)
  }

  const unlockTheme = (theme: Theme) => {
    const newUnlocked = new Set([...unlockedThemes, theme])
    setUnlockedThemes(newUnlocked)
    localStorage.setItem("moneymates-unlocked-themes", JSON.stringify([...newUnlocked]))
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, unlockedThemes, unlockTheme }}>
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

// Theme configurations
export const themeStyles = {
  default: {
    background: "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20",
    header: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-purple-100 dark:border-purple-800/30",
    card: "bg-white dark:bg-gray-800",
  },
  romance: {
    background: "bg-gradient-to-br from-pink-300 via-rose-400 to-red-500 dark:from-pink-900 dark:via-rose-800 dark:to-red-900",
    header: "bg-pink-100/90 dark:bg-pink-950/90 backdrop-blur-sm border-b border-rose-300 dark:border-rose-800/50",
    card: "bg-pink-50/90 dark:bg-pink-900/50 backdrop-blur-sm",
  },
  miami: {
    background: "bg-gradient-to-br from-cyan-300 via-teal-400 to-orange-400 dark:from-cyan-900 dark:via-teal-800 dark:to-orange-900",
    header: "bg-cyan-100/90 dark:bg-cyan-950/90 backdrop-blur-sm border-b border-teal-300 dark:border-teal-800/50",
    card: "bg-cyan-50/90 dark:bg-cyan-900/50 backdrop-blur-sm",
  },
  galaxy: {
    background: "bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-950",
    header: "bg-purple-100/90 dark:bg-purple-950/90 backdrop-blur-sm border-b border-indigo-300 dark:border-indigo-800/50",
    card: "bg-purple-50/90 dark:bg-purple-900/50 backdrop-blur-sm",
  },
  "pink-finance": {
    background: "bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 dark:from-pink-950 dark:via-rose-900 dark:to-pink-800",
    header: "bg-pink-50/90 dark:bg-pink-950/90 backdrop-blur-sm border-b border-rose-200 dark:border-rose-800/50",
    card: "bg-white/90 dark:bg-pink-900/50 backdrop-blur-sm",
  },
  "infinite-wealth": {
    background: "bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 dark:from-yellow-900 dark:via-amber-800 dark:to-orange-900",
    header: "bg-yellow-100/90 dark:bg-yellow-950/90 backdrop-blur-sm border-b border-amber-300 dark:border-amber-800/50",
    card: "bg-yellow-50/90 dark:bg-yellow-900/50 backdrop-blur-sm",
  },
}
