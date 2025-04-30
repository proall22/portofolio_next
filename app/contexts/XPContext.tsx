"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define the milestones/achievements that award XP
export const ACHIEVEMENTS = {
  VISIT_HERO: { id: "visit_hero", xp: 10, title: "First Contact", description: "Visited the home page" },
  VISIT_ABOUT: { id: "visit_about", xp: 15, title: "Getting to Know Me", description: "Learned about my background" },
  VISIT_SKILLS: { id: "visit_skills", xp: 20, title: "Skill Explorer", description: "Discovered my skill set" },
  VISIT_PROJECTS: { id: "visit_projects", xp: 25, title: "Project Investigator", description: "Explored my projects" },
  VISIT_CONTACT: { id: "visit_contact", xp: 30, title: "Ready to Connect", description: "Reached out to connect" },
  SCROLL_50_PERCENT: {
    id: "scroll_50",
    xp: 15,
    title: "Halfway There",
    description: "Scrolled through half the portfolio",
  },
  SCROLL_100_PERCENT: { id: "scroll_100", xp: 25, title: "Completionist", description: "Viewed the entire portfolio" },
  THEME_TOGGLE: { id: "theme_toggle", xp: 10, title: "Customizer", description: "Toggled the theme" },
  INTERACT_PROJECT: {
    id: "interact_project",
    xp: 20,
    title: "Project Enthusiast",
    description: "Interacted with a project",
  },
  EASTER_EGG: { id: "easter_egg", xp: 50, title: "Secret Finder", description: "Found the Easter egg" },
}

// Calculate XP thresholds for each level
const LEVEL_THRESHOLDS = Array.from({ length: 10 }, (_, i) => Math.round(100 * Math.pow(1.5, i)))

// Define types
type AchievementId = keyof typeof ACHIEVEMENTS
type Achievement = (typeof ACHIEVEMENTS)[AchievementId]

interface XPNotification {
  id: string
  achievement: Achievement
  timestamp: number
}

interface XPContextType {
  xp: number
  level: number
  levelProgress: number
  nextLevelThreshold: number
  unlockAchievement: (achievementId: AchievementId) => void
  notifications: XPNotification[]
  dismissNotification: (id: string) => void
  achievements: Achievement[]
  unlockedAchievements: Achievement[]
}

const XPContext = createContext<XPContextType | undefined>(undefined)

export function XPProvider({ children }: { children: ReactNode }) {
  const [xp, setXP] = useState(0)
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<string[]>([])
  const [notifications, setNotifications] = useState<XPNotification[]>([])

  // Calculate current level based on XP
  const calculateLevel = (xpAmount: number) => {
    return LEVEL_THRESHOLDS.findIndex((threshold) => xpAmount < threshold) || LEVEL_THRESHOLDS.length
  }

  const level = calculateLevel(xp)
  const currentLevelThreshold = level > 0 ? LEVEL_THRESHOLDS[level - 1] : 0
  const nextLevelThreshold =
    level < LEVEL_THRESHOLDS.length ? LEVEL_THRESHOLDS[level] : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]
  const levelProgress = ((xp - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100

  // Load saved XP and achievements from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedXP = localStorage.getItem("portfolio_xp")
      const savedAchievements = localStorage.getItem("portfolio_achievements")

      if (savedXP) {
        setXP(Number.parseInt(savedXP, 10))
      }

      if (savedAchievements) {
        setUnlockedAchievementIds(JSON.parse(savedAchievements))
      }
    }
  }, [])

  // Save XP and achievements to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined" && xp > 0) {
      localStorage.setItem("portfolio_xp", xp.toString())
      localStorage.setItem("portfolio_achievements", JSON.stringify(unlockedAchievementIds))
    }
  }, [xp, unlockedAchievementIds])

  // Function to unlock an achievement and award XP
  const unlockAchievement = (achievementId: AchievementId) => {
    const achievement = ACHIEVEMENTS[achievementId]

    // Check if achievement exists and hasn't been unlocked yet
    if (achievement && !unlockedAchievementIds.includes(achievement.id)) {
      // Add achievement to unlocked list
      setUnlockedAchievementIds((prev) => [...prev, achievement.id])

      // Award XP
      setXP((prev) => prev + achievement.xp)

      // Create notification
      const notification: XPNotification = {
        id: `${achievement.id}_${Date.now()}`,
        achievement,
        timestamp: Date.now(),
      }

      setNotifications((prev) => [...prev, notification])

      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        dismissNotification(notification.id)
      }, 5000)
    }
  }

  // Function to dismiss a notification
  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Get all achievements and unlocked achievements
  const achievements = Object.values(ACHIEVEMENTS)
  const unlockedAchievements = achievements.filter((achievement) => unlockedAchievementIds.includes(achievement.id))

  return (
    <XPContext.Provider
      value={{
        xp,
        level,
        levelProgress,
        nextLevelThreshold,
        unlockAchievement,
        notifications,
        dismissNotification,
        achievements,
        unlockedAchievements,
      }}
    >
      {children}
    </XPContext.Provider>
  )
}

export function useXP() {
  const context = useContext(XPContext)
  if (context === undefined) {
    throw new Error("useXP must be used within an XPProvider")
  }
  return context
}

