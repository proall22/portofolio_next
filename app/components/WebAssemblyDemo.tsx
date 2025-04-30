"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// JavaScript implementation of Fibonacci
function fibonacciJS(n: number): number {
  if (n < 2) return n
  let a = 0,
    b = 1
  for (let i = 2; i <= n; i++) {
    const temp = a + b
    a = b
    b = temp
  }
  return b
}

export default function WebAssemblyDemo() {
  const [result, setResult] = useState<number | null>(null)
  const [n, setN] = useState(10)
  const [calculating, setCalculating] = useState(false)

  useEffect(() => {
    setCalculating(true)

    // Use setTimeout to simulate processing time and avoid UI freezing for large numbers
    const timer = setTimeout(() => {
      setResult(fibonacciJS(n))
      setCalculating(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [n])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 0 && value <= 40) {
      setN(value)
    }
  }

  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Algorithm Demo
      </motion.h2>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl mb-4">This demo calculates the Fibonacci number using optimized JavaScript:</p>
        <div className="mb-6">
          <label htmlFor="fibonacci-input" className="block text-sm font-medium mb-2">
            Enter a number (0-40):
          </label>
          <input
            id="fibonacci-input"
            type="number"
            min="0"
            max="40"
            value={n}
            onChange={handleChange}
            className="w-24 px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <motion.div
          className="bg-gray-800 dark:bg-gray-700 p-6 rounded-lg inline-block"
          initial={{ scale: 0.95 }}
          animate={{
            scale: calculating ? [1, 0.98, 1] : 1,
            transition: {
              duration: 0.5,
              repeat: calculating ? Number.POSITIVE_INFINITY : 0,
            },
          }}
        >
          <p className="text-lg mb-2">Fibonacci({n}) =</p>
          <p className="text-3xl font-bold text-teal-400">{calculating ? "Calculating..." : result}</p>
        </motion.div>
      </div>
    </section>
  )
}

