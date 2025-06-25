"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  glow?: boolean
}

export function NeonButton({
  children,
  className,
  variant = "primary",
  size = "md",
  glow = true,
  ...props
}: NeonButtonProps) {
  const variants = {
    primary: cn(
      "bg-gradient-to-r from-neon_blue-500 to-vivid_sky_blue-500",
      "hover:from-neon_blue-400 hover:to-vivid_sky_blue-400",
      "text-white font-medium",
      glow && "shadow-lg shadow-neon_blue-500/[0.4] hover:shadow-xl hover:shadow-neon_blue-500/[0.6]",
    ),
    secondary: cn(
      "bg-gradient-to-r from-rose-500 to-grape-500",
      "hover:from-rose-400 hover:to-grape-400",
      "text-white font-medium",
      glow && "shadow-lg shadow-rose-500/[0.4] hover:shadow-xl hover:shadow-rose-500/[0.6]",
    ),
    ghost: cn(
      "bg-white/[0.05] hover:bg-white/[0.1]",
      "border border-white/[0.1] hover:border-white/[0.2]",
      "text-white/[0.8] hover:text-white",
      glow && "hover:shadow-lg hover:shadow-white/[0.1]",
    ),
  }

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-xl",
    md: "px-6 py-3 text-base rounded-2xl",
    lg: "px-8 py-4 text-lg rounded-3xl",
  }

  return (
    <button
      className={cn(
        "relative overflow-hidden transition-all duration-300 ease-out",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        "backdrop-blur-sm",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 transform translate-x-[-100%] hover:translate-x-[100%]" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
