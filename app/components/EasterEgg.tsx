"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useXP } from "../contexts/XPContext"

export default function EasterEgg() {
  const [isVisible, setIsVisible] = useState(false)
  const [konami, setKonami] = useState("")
  const { unlockAchievement } = useXP()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami((prev) => {
        const updated = prev + e.key
        if (updated.endsWith("ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba")) {
          setIsVisible(true)
          unlockAchievement("EASTER_EGG")
          return ""
        }
        return updated.slice(-20)
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [unlockAchievement])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsVisible(false)}
        >
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-bold mb-4">You found an Easter Egg!</h3>
            <p className="text-lg">Congratulations! You've unlocked a secret achievement.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

