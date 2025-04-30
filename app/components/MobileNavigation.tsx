"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Code, Briefcase, Mail, Home } from "lucide-react"
import { useTheme } from "./ThemeProvider"

interface MobileNavigationProps {
  sections: string[]
  currentSection: number
}

export default function MobileNavigation({ sections, currentSection }: MobileNavigationProps) {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNavClick = (href: string) => {
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Get the header height to offset the scroll position
      const headerHeight = document.querySelector("header")?.offsetHeight || 0

      // Calculate the target position with offset
      const targetPosition = targetElement.offsetTop - headerHeight

      // Scroll to the target position
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  }

  const getIcon = (section: string) => {
    switch (section) {
      case "hero":
        return <Home className="w-5 h-5" />
      case "about":
        return <User className="w-5 h-5" />
      case "skills":
        return <Code className="w-5 h-5" />
      case "projects":
        return <Briefcase className="w-5 h-5" />
      case "contact":
        return <Mail className="w-5 h-5" />
      default:
        return <Home className="w-5 h-5" />
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed bottom-0 left-0 right-0 z-40 ${
        theme === "dark" ? "bg-gray-900 bg-opacity-90" : "bg-white bg-opacity-90"
      } backdrop-blur-md shadow-lg`}
    >
      <div className="flex justify-around items-center py-3">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleNavClick(`#${section}`)}
            className="flex flex-col items-center justify-center p-2 rounded-full"
          >
            <motion.div
              animate={{
                scale: currentSection === index ? 1.2 : 1,
                y: currentSection === index ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className={
                currentSection === index
                  ? "text-teal-400 dark:text-teal-300"
                  : theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
              }
            >
              {getIcon(section)}

              <AnimatePresence>
                {currentSection === index && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    className="h-0.5 bg-teal-400 dark:bg-teal-300 mt-1 rounded-full"
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <span
              className={`text-xs mt-1 capitalize ${
                currentSection === index
                  ? "text-teal-400 dark:text-teal-300"
                  : theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-500"
              }`}
            >
              {section}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

