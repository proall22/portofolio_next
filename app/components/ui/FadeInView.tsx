"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface FadeInViewProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  threshold?: number
  className?: string
  once?: boolean
}

export default function FadeInView({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 50,
  threshold = 0.1,
  className = "",
  once = true,
}: FadeInViewProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin: "0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, once])

  // Set initial animation values based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: distance }
      case "down":
        return { y: -distance }
      case "left":
        return { x: distance }
      case "right":
        return { x: -distance }
      case "none":
        return {}
      default:
        return { y: distance }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{
          opacity: 0,
          ...getInitialPosition(),
        }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : getInitialPosition().x,
          y: isInView ? 0 : getInitialPosition().y,
        }}
        transition={{
          duration,
          delay,
          ease: "easeOut",
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

