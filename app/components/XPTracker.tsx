"use client"

import { useEffect, useRef } from "react"
import { useXP } from "../contexts/XPContext"
import { useScrollProgress } from "../hooks/useScrollProgress"

export default function XPTracker() {
  const { unlockAchievement } = useXP()
  const { progress } = useScrollProgress()
  const visitedSections = useRef<Set<string>>(new Set())
  const scrollMilestones = useRef<Set<string>>(new Set())

  // Track section visits
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id

            // Only award XP if this section hasn't been visited before
            if (!visitedSections.current.has(sectionId)) {
              visitedSections.current.add(sectionId)

              // Award XP based on the section
              switch (sectionId) {
                case "hero":
                  unlockAchievement("VISIT_HERO")
                  break
                case "about":
                  unlockAchievement("VISIT_ABOUT")
                  break
                case "skills":
                  unlockAchievement("VISIT_SKILLS")
                  break
                case "projects":
                  unlockAchievement("VISIT_PROJECTS")
                  break
                case "contact":
                  unlockAchievement("VISIT_CONTACT")
                  break
              }
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    // Observe all sections
    const sections = ["hero", "about", "skills", "projects", "contact"]
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [unlockAchievement])

  // Track scroll progress milestones
  useEffect(() => {
    if (progress >= 50 && !scrollMilestones.current.has("50")) {
      scrollMilestones.current.add("50")
      unlockAchievement("SCROLL_50_PERCENT")
    }

    if (progress >= 99 && !scrollMilestones.current.has("100")) {
      scrollMilestones.current.add("100")
      unlockAchievement("SCROLL_100_PERCENT")
    }
  }, [progress, unlockAchievement])

  // Track theme toggle
  useEffect(() => {
    const originalToggleTheme = document.body.onclick

    document.body.addEventListener("click", (e) => {
      // Check if the click was on the theme toggle button
      const target = e.target as HTMLElement
      const themeToggle = target.closest('button[aria-label*="Switch to"]')

      if (themeToggle) {
        unlockAchievement("THEME_TOGGLE")
      }
    })

    return () => {
      document.body.onclick = originalToggleTheme as any
    }
  }, [unlockAchievement])

  // Track project interactions
  useEffect(() => {
    const handleProjectInteraction = () => {
      unlockAchievement("INTERACT_PROJECT")
    }

    // Find project elements that can be interacted with
    const projectButtons = document.querySelectorAll("#projects button")
    projectButtons.forEach((button) => {
      button.addEventListener("click", handleProjectInteraction)
    })

    return () => {
      projectButtons.forEach((button) => {
        button.removeEventListener("click", handleProjectInteraction)
      })
    }
  }, [unlockAchievement])

  return null // This is a utility component with no UI
}

