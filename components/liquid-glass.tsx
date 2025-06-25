import { cn } from "@/lib/utils"
import type React from "react"

interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glow?: boolean
  intensity?: "low" | "medium" | "high"
}

export function LiquidGlass({ children, className, glow = false, intensity = "medium", ...props }: LiquidGlassProps) {
  const glowIntensity = {
    low: "shadow-lg shadow-neon_blue-500/[0.2]",
    medium: "shadow-xl shadow-neon_blue-500/[0.3]",
    high: "shadow-2xl shadow-neon_blue-500/[0.4]",
  }

  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/[0.03] border border-white/[0.08]",
        "rounded-3xl relative overflow-hidden",
        glow && glowIntensity[intensity],
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
