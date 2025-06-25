"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface MinimalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function MinimalInput({ className, label, ...props }: MinimalInputProps) {
  return (
    <div className="relative group">
      <input
        className={cn(
          "w-full px-0 py-4 bg-transparent",
          "border-0 border-b border-white/20",
          "text-white/90 placeholder:text-white/40",
          "focus:outline-none focus:border-white/60",
          "transition-all duration-500 ease-out",
          "text-lg font-light tracking-wide",
          className,
        )}
        {...props}
      />
      {label && (
        <label className="absolute -top-6 left-0 text-xs text-white/50 font-medium tracking-widest uppercase">
          {label}
        </label>
      )}
      <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-slate-300 transition-all duration-500 group-focus-within:w-full" />
    </div>
  )
}
