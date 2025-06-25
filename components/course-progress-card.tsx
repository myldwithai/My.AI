import { GlassCard } from "./glass-card"
import { ProgressBar } from "./progress-bar"

interface CourseProgressCardProps {
  title: string
  progress: number
  description?: string
  gradientFrom?: string
  gradientTo?: string
}

export function CourseProgressCard({
  title,
  progress,
  description,
  gradientFrom,
  gradientTo,
}: CourseProgressCardProps) {
  return (
    <GlassCard className="p-6 flex flex-col justify-between h-full hover:scale-[1.02] transition-transform duration-300">
      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-2">{title}</h4>
        {description && <p className="text-sm text-gray-600 mb-6">{description}</p>}
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-900">{`${progress}%`}</span>
        </div>
        <ProgressBar progress={progress} gradientFrom={gradientFrom} gradientTo={gradientTo} />
      </div>
    </GlassCard>
  )
}
