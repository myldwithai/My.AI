import type React from "react"
import { cn } from "@/lib/utils"

interface GlassTextProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function GlassText({ children, className, size = "md" }: GlassTextProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  }

  return (
    <h1
      className={cn(
        "font-bold bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent",
        "drop-shadow-sm",
        sizes[size],
        className,
      )}
      style={{
        textShadow: "0 0 20px rgba(0,0,0,0.1)",
      }}
    >
      {children}
    </h1>
  )
}
