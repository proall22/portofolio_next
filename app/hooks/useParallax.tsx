"use client"

import { useEffect, useState } from "react"

interface ParallaxOptions {
  speed?: number
  direction?: "up" | "down" | "left" | "right"
  reverse?: boolean
  clamp?: boolean
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = "up", reverse = false, clamp = true } = options

  const [offset, setOffset] = useState(0)
  const [elementTop, setElementTop] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate how far the element is from the top of the viewport
      const elementPosition = elementTop - scrollY

      // Calculate the element's position relative to the viewport (0 to 1)
      const relativePosition = 1 - (elementPosition + elementHeight) / (windowHeight + elementHeight)

      // Apply clamping if enabled
      const clampedPosition = clamp ? Math.max(0, Math.min(1, relativePosition)) : relativePosition

      // Apply speed and direction
      let parallaxOffset = clampedPosition * speed * 100

      // Apply reverse if needed
      if (reverse) {
        parallaxOffset = -parallaxOffset
      }

      setOffset(parallaxOffset)
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    // Initialize
    handleResize()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [speed, direction, reverse, clamp, elementTop, elementHeight])

  const ref = (element: HTMLElement | null) => {
    if (element) {
      const rect = element.getBoundingClientRect()
      setElementTop(rect.top + window.scrollY)
      setElementHeight(rect.height)
    }
  }

  const style = () => {
    switch (direction) {
      case "up":
        return { transform: `translateY(${-offset}px)` }
      case "down":
        return { transform: `translateY(${offset}px)` }
      case "left":
        return { transform: `translateX(${-offset}px)` }
      case "right":
        return { transform: `translateX(${offset}px)` }
      default:
        return { transform: `translateY(${-offset}px)` }
    }
  }

  return { ref, style, offset }
}

