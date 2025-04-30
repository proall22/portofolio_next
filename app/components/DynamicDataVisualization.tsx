"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const initialData = [
  { name: "Project A", value: 400 },
  { name: "Project B", value: 300 },
  { name: "Project C", value: 200 },
  { name: "Project D", value: 100 },
]

export default function DynamicDataVisualization() {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(
        data.map((item) => ({
          ...item,
          value: Math.floor(Math.random() * 500),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [data])

  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Dynamic Project Stats
      </motion.h2>
      <div className="max-w-4xl mx-auto">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

