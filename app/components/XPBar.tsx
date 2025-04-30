"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Award, Star, X } from "lucide-react"
import { useXP } from "../contexts/XPContext"
import { useTheme } from "./ThemeProvider"

export default function XPBar() {
  const { xp, level, levelProgress, notifications, dismissNotification, unlockedAchievements } = useXP()
  const { theme } = useTheme()
  const [expanded, setExpanded] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [previousLevel, setPreviousLevel] = useState(level)

  // Check for level up
  useEffect(() => {
    if (level > previousLevel && previousLevel > 0) {
      setShowLevelUp(true)

      // Auto-hide level up notification after 5 seconds
      const timer = setTimeout(() => {
        setShowLevelUp(false)
      }, 5000)

      return () => clearTimeout(timer)
    }

    setPreviousLevel(level)
  }, [level, previousLevel])

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 ${expanded ? "w-64" : "w-12"} transition-all duration-300`}
    >
      {/* Main XP Bar Container */}
      <div
        className={`
          ${expanded ? "rounded-r-lg" : "rounded-r-full"} 
          ${theme === "dark" ? "bg-gray-800 bg-opacity-90" : "bg-white bg-opacity-90"} 
          backdrop-blur-md shadow-lg transition-all duration-300 overflow-hidden
        `}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`
            absolute right-2 top-2 p-1 rounded-full 
            ${theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            transition-colors duration-200
          `}
          aria-label={expanded ? "Collapse XP bar" : "Expand XP bar"}
        >
          {expanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>

        {/* Level Display */}
        <div className="p-2 flex items-center justify-center">
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
              ${theme === "dark" ? "bg-teal-500 text-gray-900" : "bg-teal-600 text-white"}
            `}
          >
            {level}
          </div>

          {expanded && (
            <div className="ml-2 flex-1">
              <p className={`text-sm font-semibold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                Level {level}
              </p>
              <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{xp} XP total</p>
            </div>
          )}
        </div>

        {/* XP Progress Bar */}
        <div className={`px-2 pb-2 ${!expanded && "hidden"}`}>
          <div className={`h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-teal-400 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs mt-1 text-center text-gray-500">
            {Math.round(levelProgress)}% to Level {level + 1}
          </p>
        </div>

        {/* Achievements Section (when expanded) */}
        {expanded && (
          <div className={`mt-2 p-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <p className={`text-xs font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              ACHIEVEMENTS ({unlockedAchievements.length})
            </p>

            <div className="max-h-40 overflow-y-auto pr-1 space-y-2">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`
                      text-xs p-2 rounded-md flex items-start
                      ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}
                    `}
                  >
                    <Award
                      className={`w-4 h-4 mr-2 flex-shrink-0 ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}
                    />
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                        {achievement.description}
                      </p>
                      <p className={`text-xs font-semibold ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                        +{achievement.xp} XP
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={`text-xs italic ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                  Explore the site to unlock achievements!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: expanded ? 270 : 50, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className={`
              absolute left-0 p-3 rounded-lg shadow-lg mb-2 w-64
              ${theme === "dark" ? "bg-gray-800" : "bg-white"}
              border-l-4 border-teal-500
            `}
            style={{ top: `${notifications.indexOf(notification) * 90}px` }}
          >
            <button
              onClick={() => dismissNotification(notification.id)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start">
              <div className="mr-3">
                <Trophy className={`w-6 h-6 ${theme === "dark" ? "text-yellow-400" : "text-yellow-500"}`} />
              </div>
              <div>
                <p className={`text-sm font-bold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                  {notification.achievement.title}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  {notification.achievement.description}
                </p>
                <p className={`text-xs font-semibold mt-1 ${theme === "dark" ? "text-teal-400" : "text-teal-600"}`}>
                  +{notification.achievement.xp} XP
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Level Up Notification */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`
              fixed top-24 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg
              ${theme === "dark" ? "bg-gray-800" : "bg-white"}
              border-2 border-yellow-500 z-50 w-80
            `}
          >
            <button
              onClick={() => setShowLevelUp(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Dismiss level up notification"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center flex-col">
              <Star className="w-12 h-12 text-yellow-500 mb-2" />
              <h3 className={`text-xl font-bold ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>Level Up!</h3>
              <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-center mt-1`}>
                Congratulations! You've reached level {level}.
              </p>
              <div className="mt-3 bg-gradient-to-r from-teal-400 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                New skills unlocked
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Chevron icons for the toggle button
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  )
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  )
}

