"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface FloatingElementProps {
  className?: string
  children?: React.ReactNode
  delay?: number
}

export function FloatingElement({ className, children, delay = 0 }: FloatingElementProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn("relative transform-gpu transition-all duration-1000 ease-out", "animate-pulse", className)}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "4s",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.3] to-transparent rounded-full blur-xl" />
      <div className="relative bg-gradient-to-br from-white/[0.8] to-white/[0.4] backdrop-blur-xl rounded-full border border-white/[0.5] shadow-2xl">
        {children}
      </div>
    </div>
  )
}
