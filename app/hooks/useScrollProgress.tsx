"use client"

import { useState, useEffect } from "react"

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      setDocumentHeight(document.documentElement.scrollHeight)
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      // Calculate scroll progress as a percentage
      const scrollProgress = Math.min(100, Math.max(0, (currentScrollY / (documentHeight - viewportHeight)) * 100))

      setProgress(scrollProgress)
    }

    // Initialize values
    handleResize()
    handleScroll()

    // Add event listeners
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [documentHeight, viewportHeight])

  return { progress, scrollY, viewportHeight, documentHeight }
}

