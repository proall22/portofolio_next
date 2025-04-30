"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "vertical" | "horizontal"
  overflow?: "visible" | "hidden"
  zIndex?: number
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = "",
  direction = "vertical",
  overflow = "hidden",
  zIndex = 0,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll()

  // Calculate the range for the parallax effect
  const initial = elementTop - clientHeight
  const final = elementTop + (ref.current?.offsetHeight || 0)

  // Create the transform based on scroll position
  const transformValue = useTransform(
    scrollY,
    [initial, final],
    direction === "vertical" ? [speed * 100, -speed * 100] : [speed * 100, -speed * 100],
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const setValues = () => {
      setElementTop(element.offsetTop)
      setClientHeight(window.innerHeight)
    }

    setValues()
    window.addEventListener("resize", setValues)

    return () => {
      window.removeEventListener("resize", setValues)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`relative ${overflow === "hidden" ? "overflow-hidden" : ""} ${className}`}
      style={{ zIndex }}
    >
      <motion.div
        style={{
          [direction === "vertical" ? "y" : "x"]: transformValue,
          height: direction === "vertical" ? "100%" : undefined,
          width: direction === "horizontal" ? "100%" : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

