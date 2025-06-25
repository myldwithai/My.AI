import { cn } from "@/lib/utils"
import type React from "react"

interface CinematicTextProps {
  children: React.ReactNode
  className?: string
  variant?: "hero" | "title" | "subtitle" | "body"
  weight?: "light" | "normal" | "medium" | "semibold"
}

export function CinematicText({ children, className, variant = "body", weight = "normal" }: CinematicTextProps) {
  const variants = {
    hero: "text-4xl md:text-6xl lg:text-8xl tracking-tight",
    title: "text-2xl md:text-3xl lg:text-4xl tracking-tight",
    subtitle: "text-lg md:text-xl tracking-wide",
    body: "text-base tracking-normal",
  }

  const weights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  }

  return (
    <div className={cn("text-white/90 leading-tight", variants[variant], weights[weight], className)}>{children}</div>
  )
}
