import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
  gradientFrom?: string
  gradientTo?: string
}

export function ProgressBar({
  progress,
  className,
  gradientFrom = "from-rose-500",
  gradientTo = "to-grape-500",
}: ProgressBarProps) {
  return (
    <div className={cn("w-full h-3 rounded-full bg-gray-200/[0.5] overflow-hidden", className)}>
      <div
        className={cn(
          "h-full rounded-full transition-all duration-700 ease-out",
          `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
        )}
        style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
      />
    </div>
  )
}
