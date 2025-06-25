"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function FloatingInput({ className, label, ...props }: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        className={cn(
          "w-full px-6 py-4 bg-white/[0.03] backdrop-blur-xl",
          "border border-white/[0.08] rounded-2xl",
          "text-white placeholder:text-white/[0.4]",
          "focus:outline-none focus:ring-2 focus:ring-neon_blue-500/[0.5] focus:border-neon_blue-500/[0.3]",
          "transition-all duration-300",
          className,
        )}
        {...props}
      />
      {label && (
        <label className="absolute -top-2 left-4 px-2 bg-black text-xs text-white/[0.6] font-medium">{label}</label>
      )}
    </div>
  )
}
