import { cn } from "@/lib/utils"
import type React from "react"

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function DashboardCard({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn("rounded-2xl border border-white/[0.15] bg-white/[0.08] backdrop-blur-md shadow-lg", className)}
      {...props}
    >
      {children}
    </div>
  )
}
