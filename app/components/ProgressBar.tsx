"use client"

import { motion, useSpring } from "framer-motion"
import { useScrollProgress } from "../hooks/useScrollProgress"

interface ProgressBarProps {
  progress?: number
  color?: string
}

export default function ProgressBar({
  progress: externalProgress,
  color = "from-teal-400 to-purple-500",
}: ProgressBarProps) {
  // Use the custom hook if no external progress is provided
  const { progress: internalProgress } = useScrollProgress()

  // Use external progress if provided, otherwise use internal progress
  const progress = externalProgress !== undefined ? externalProgress : internalProgress

  // Create a smooth spring animation for the progress
  const smoothProgress = useSpring(progress, {
    damping: 30,
    stiffness: 300,
    mass: 0.5,
  })

  return (
    <div className="fixed top-16 left-0 right-0 h-1 bg-gray-700 dark:bg-gray-800 z-50">
      <motion.div
        className={`h-full bg-gradient-to-r ${color}`}
        style={{ width: smoothProgress.toString() + "%" }}
        transition={{ ease: "easeOut" }}
      />
    </div>
  )
}

