import { cn } from "@/lib/utils"

interface ProgressCircleProps {
  progress: number
  size?: number
  strokeWidth?: number
  className?: string
}

export function ProgressCircle({ progress, size = 200, strokeWidth = 8, className }: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg
        className="absolute top-0 left-0 transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-gray-200/[0.5]"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-neon_blue-500 transition-all duration-1000 ease-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="relative z-10 text-center">
        <div className="text-4xl font-bold text-gray-900">{`${Math.round(progress)}%`}</div>
        <div className="text-sm text-gray-600 mt-1">Complete</div>
      </div>
    </div>
  )
}
