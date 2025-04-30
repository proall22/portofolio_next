"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

const initialCode = `
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>
}

render(<Welcome name="Developer" />)
`

export default function InteractiveCodePlayground() {
  const [code, setCode] = useState(initialCode)

  return (
    <section className="py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
      >
        Interactive Code Playground
      </motion.h2>
      <div className="max-w-4xl mx-auto">
        <LiveProvider code={code} noInline={true}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <LiveEditor onChange={setCode} />
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <LiveError />
              <LivePreview />
            </div>
          </div>
        </LiveProvider>
      </div>
    </section>
  )
}

