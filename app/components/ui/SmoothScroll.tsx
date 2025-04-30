"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import type { ReactNode } from "react"

interface SmoothScrollProps {
  children: ReactNode
  smoothness?: number
}

export default function SmoothScroll({ children, smoothness = 0.1 }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const smoothScrollY = useSpring(scrollY, {
    damping: 50,
    stiffness: 400,
    mass: 3,
  })

  useEffect(() => {
    const contentElement = contentRef.current
    const scrollerElement = scrollerRef.current

    if (!contentElement || !scrollerElement) return

    const updateHeight = () => {
      // Set the scroller height to match the content
      scrollerElement.style.height = `${contentElement.scrollHeight}px`
    }

    // Update on mount
    updateHeight()

    // Update on window resize
    window.addEventListener("resize", updateHeight)

    // Update when content changes
    const resizeObserver = new ResizeObserver(updateHeight)
    resizeObserver.observe(contentElement)

    return () => {
      window.removeEventListener("resize", updateHeight)
      resizeObserver.disconnect()
    }
  }, [])

  // Transform the content in the opposite direction of the scroll
  const y = useTransform(smoothScrollY, (value) => -value)

  return (
    <>
      {/* This div controls the scroll height */}
      <div ref={scrollerRef} className="absolute top-0 left-0 right-0 pointer-events-none" />

      {/* This div contains the actual content */}
      <motion.div ref={contentRef} style={{ y }} className="fixed top-0 left-0 right-0 will-change-transform">
        {children}
      </motion.div>
    </>
  )
}

