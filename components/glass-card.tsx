import { cn } from "@/lib/utils"
import type React from "react"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "elevated" | "minimal"
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
  const variants = {
    default: "bg-white/[0.7] backdrop-blur-xl border border-white/[0.3] shadow-xl shadow-black/[0.05]",
    elevated: "bg-white/[0.8] backdrop-blur-xl border border-white/[0.4] shadow-2xl shadow-black/[0.1]",
    minimal: "bg-white/[0.5] backdrop-blur-lg border border-white/[0.2] shadow-lg shadow-black/[0.03]",
  }

  return (
    <div className={cn("rounded-3xl", variants[variant], className)} {...props}>
      {children}
    </div>
  )
}
