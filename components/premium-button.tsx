"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "glass"
  size?: "sm" | "md" | "lg"
  glow?: boolean
  loading?: boolean
}

export function PremiumButton({
  children,
  className,
  variant = "primary",
  size = "md",
  glow = false,
  loading = false,
  ...props
}: PremiumButtonProps) {
  const variants = {
    primary: cn(
      "bg-gradient-to-r from-blue-500/80 to-purple-600/80",
      "hover:from-blue-400/90 hover:to-purple-500/90",
      "text-white font-medium",
      "shadow-lg shadow-blue-500/25",
      "hover:shadow-xl hover:shadow-blue-500/40",
    ),
    secondary: cn(
      "bg-gradient-to-r from-slate-600/60 to-slate-700/60",
      "hover:from-slate-500/70 hover:to-slate-600/70",
      "text-white font-medium",
      "shadow-lg shadow-slate-500/20",
    ),
    ghost: cn(
      "bg-white/[0.08] hover:bg-white/[0.15]",
      "backdrop-blur-xl",
      "border border-white/[0.12] hover:border-white/[0.2]",
      "text-white/90 hover:text-white",
      "shadow-lg shadow-black/[0.05]",
    ),
    glass: cn(
      "bg-white/[0.05] hover:bg-white/[0.12]",
      "backdrop-blur-2xl",
      "border border-white/[0.08] hover:border-white/[0.15]",
      "text-white/80 hover:text-white",
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
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        variants[variant],
        sizes[size],
        glow && "hover:shadow-2xl hover:shadow-current/30",
        className,
      )}
      disabled={loading}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.1] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] hover:translate-x-[100%]" />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Content */}
      <span className={cn("relative z-10 flex items-center justify-center gap-2", loading && "opacity-0")}>
        {children}
      </span>
    </button>
  )
}
