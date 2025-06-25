import { cn } from "@/lib/utils"
import type React from "react"

interface GlassMorphismProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  intensity?: "subtle" | "medium" | "strong"
}

export function GlassMorphism({ children, className, intensity = "medium", ...props }: GlassMorphismProps) {
  const intensities = {
    subtle: "bg-white/[0.02] backdrop-blur-sm border-white/[0.05]",
    medium: "bg-white/[0.05] backdrop-blur-md border-white/[0.08]",
    strong: "bg-white/[0.08] backdrop-blur-lg border-white/[0.12]",
  }

  return (
    <div
      className={cn(
        "border rounded-3xl relative overflow-hidden",
        "shadow-2xl shadow-black/[0.3]",
        intensities[intensity],
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
