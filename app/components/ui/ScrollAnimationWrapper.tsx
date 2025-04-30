"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import type { ReactNode } from "react"

interface ScrollAnimationWrapperProps {
  children: ReactNode
  animation?: "fade" | "slide" | "scale" | "rotate" | "text"
  direction?: "up" | "down" | "left" | "right"
  threshold?: number
  duration?: number
  delay?: number
  distance?: number
  repeat?: boolean
  className?: string
  stagger?: number
  staggerChildren?: boolean
  springConfig?: {
    stiffness?: number
    damping?: number
    mass?: number
  }
}

export default function ScrollAnimationWrapper({
  children,
  animation = "fade",
  direction = "up",
  threshold = 0.2,
  duration = 0.6,
  delay = 0,
  distance = 50,
  repeat = true,
  className = "",
  stagger = 0.1,
  staggerChildren = false,
  springConfig = {
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(ref, {
    amount: threshold,
    once: !repeat,
  })

  // Reset animation state when scrolling back up if repeat is true
  useEffect(() => {
    if (!isInView && repeat && hasAnimated) {
      const timer = setTimeout(() => {
        setHasAnimated(false)
      }, 300) // Small delay to prevent flickering
      return () => clearTimeout(timer)
    }

    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, repeat, hasAnimated])

  // Define initial and animate states based on animation type
  const getAnimationProps = () => {
    // Base animation properties
    let initial = {}
    let animate = {}

    // Set animation based on type
    switch (animation) {
      case "fade":
        initial = { opacity: 0 }
        animate = { opacity: 1 }
        break

      case "slide":
        switch (direction) {
          case "up":
            initial = { opacity: 0, y: distance }
            animate = { opacity: 1, y: 0 }
            break
          case "down":
            initial = { opacity: 0, y: -distance }
            animate = { opacity: 1, y: 0 }
            break
          case "left":
            initial = { opacity: 0, x: distance }
            animate = { opacity: 1, x: 0 }
            break
          case "right":
            initial = { opacity: 0, x: -distance }
            animate = { opacity: 1, x: 0 }
            break
        }
        break

      case "scale":
        initial = { opacity: 0, scale: 0.8 }
        animate = { opacity: 1, scale: 1 }
        break

      case "rotate":
        initial = { opacity: 0, rotate: direction === "left" ? -15 : 15 }
        animate = { opacity: 1, rotate: 0 }
        break

      case "text":
        // Text animation is handled differently with staggered children
        initial = {}
        animate = {}
        break
    }

    return { initial, animate }
  }

  const { initial, animate } = getAnimationProps()

  // For text animation, we need to handle it differently
  if (animation === "text" && typeof children === "string") {
    const words = children.split(" ")

    return (
      <div ref={ref} className={className}>
        <div className="flex flex-wrap">
          {words.map((word, i) => (
            <div key={i} className="mr-2 overflow-hidden">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{
                  duration,
                  delay: delay + i * stagger,
                  ease: "easeOut",
                  ...springConfig,
                }}
              >
                {word}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // For staggered children
  if (staggerChildren && Array.isArray(children)) {
    return (
      <div ref={ref} className={className}>
        {children.map((child, i) => (
          <motion.div
            key={i}
            initial={initial}
            animate={isInView ? animate : initial}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: "easeOut",
              ...springConfig,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    )
  }

  // Default animation
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        ...springConfig,
      }}
    >
      {children}
    </motion.div>
  )
}

