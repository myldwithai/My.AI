import { cn } from "@/lib/utils"
import type React from "react"

interface AdvancedGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: "card" | "panel" | "overlay" | "floating" | "sidebar"
  blur?: "sm" | "md" | "lg" | "xl"
  opacity?: "low" | "medium" | "high"
  border?: boolean
  shadow?: "none" | "soft" | "medium" | "strong"
}

export function AdvancedGlass({
  children,
  className,
  variant = "card",
  blur = "lg",
  opacity = "medium",
  border = true,
  shadow = "medium",
  ...props
}: AdvancedGlassProps) {
  const variants = {
    card: "rounded-3xl",
    panel: "rounded-2xl",
    overlay: "rounded-xl",
    floating: "rounded-full",
    sidebar: "rounded-r-3xl",
  }

  const blurLevels = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  }

  const opacityLevels = {
    low: "bg-white/[0.03]",
    medium: "bg-white/[0.08]",
    high: "bg-white/[0.15]",
  }

  const shadowLevels = {
    none: "",
    soft: "shadow-lg shadow-black/[0.05]",
    medium: "shadow-xl shadow-black/[0.1]",
    strong: "shadow-2xl shadow-black/[0.2]",
  }

  const borderStyle = border ? "border border-white/[0.12]" : ""

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        variants[variant],
        blurLevels[blur],
        opacityLevels[opacity],
        shadowLevels[shadow],
        borderStyle,
        className,
      )}
      {...props}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-white/[0.02] to-transparent" />

      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/[0.03]" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
