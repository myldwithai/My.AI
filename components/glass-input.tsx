"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useState } from "react"

interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: React.ReactNode
  error?: string
}

export function GlassInput({ className, label, icon, error, ...props }: GlassInputProps) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="relative group">
      {/* Label */}
      {label && (
        <label
          className={cn(
            "absolute transition-all duration-300 pointer-events-none",
            "text-white/60 font-medium",
            focused || props.value ? "-top-6 left-0 text-xs tracking-wider uppercase" : "top-4 left-4 text-base",
          )}
        >
          {label}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Icon */}
        {icon && <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">{icon}</div>}

        {/* Input */}
        <input
          className={cn(
            "w-full px-4 py-4 bg-white/[0.05] backdrop-blur-xl",
            "border border-white/[0.12] rounded-2xl",
            "text-white placeholder:text-white/40",
            "focus:outline-none focus:bg-white/[0.08] focus:border-white/[0.25]",
            "transition-all duration-300",
            "shadow-lg shadow-black/[0.05]",
            icon && "pl-12",
            error && "border-red-400/50 focus:border-red-400/75",
            className,
          )}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {/* Focus ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none",
            "ring-2 ring-transparent",
            focused && "ring-blue-400/30 shadow-lg shadow-blue-400/20",
          )}
        />
      </div>

      {/* Error message */}
      {error && <p className="mt-2 text-sm text-red-300/80">{error}</p>}
    </div>
  )
}
