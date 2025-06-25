"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface MinimalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "ghost" | "minimal"
  size?: "sm" | "md" | "lg"
}

export function MinimalButton({ children, className, variant = "primary", size = "md", ...props }: MinimalButtonProps) {
  const variants = {
    primary: cn(
      "bg-white/10 hover:bg-white/20",
      "border border-white/20 hover:border-white/40",
      "text-white/90 hover:text-white",
    ),
    ghost: cn(
      "bg-transparent hover:bg-white/5",
      "border border-transparent hover:border-white/20",
      "text-white/70 hover:text-white/90",
    ),
    minimal: cn("bg-transparent hover:bg-white/5", "text-white/60 hover:text-white/90", "border-0"),
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(
        "relative overflow-hidden transition-all duration-300 ease-out",
        "backdrop-blur-sm rounded-2xl",
        "font-medium tracking-wide",
        "transform hover:scale-[1.02] active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{children}</span>
    </button>
  )
}
