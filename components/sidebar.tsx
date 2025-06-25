import Link from "next/link"
import { LayoutDashboardIcon as Dashboard, Book, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { GlassCard } from "./glass-card"

interface SidebarProps {
  activeItem: string
}

export function Sidebar({ activeItem }: SidebarProps) {
  const navItems = [
    { name: "Dashboard", icon: Dashboard, href: "/dashboard" },
    { name: "Courses", icon: Book, href: "/courses" },
    { name: "Progress", icon: TrendingUp, href: "/progress" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ]

  return (
    <GlassCard variant="elevated" className="p-8 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-grape-500 rounded-2xl blur-lg opacity-30" />
          <div className="relative p-3 rounded-2xl bg-gradient-to-br from-rose-500 to-grape-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-brain-circuit text-white"
            >
              <path d="M12 5a3 3 0 1 0-3 3" />
              <path d="M12 5a3 3 0 1 1 3 3" />
              <path d="M12 5v3" />
              <path d="M8.5 14a2.5 2.5 0 1 0 0 5" />
              <path d="M8.5 14c-.93 0-1.78.38-2.4.99L4 17" />
              <path d="M15.5 14a2.5 2.5 0 1 1 0 5" />
              <path d="M15.5 14c.93 0 1.78.38 2.4.99L20 17" />
              <path d="M12 10a4 4 0 1 0 0 8" />
              <path d="M12 18v-2" />
              <path d="M12 14v-2" />
              <path d="M12 12V8" />
              <path d="M16 20h2c.5 0 1-.5 1-1v-1" />
              <path d="M6 20H4c-.5 0-1-.5-1-1v-1" />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">MY.AI</h2>
          <p className="text-sm text-gray-600">Adaptive Learning</p>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.name === activeItem
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl transition-all duration-200",
                isActive
                  ? "bg-white/[0.8] text-gray-900 shadow-lg shadow-black/[0.05] border border-white/[0.5]"
                  : "text-gray-600 hover:bg-white/[0.4] hover:text-gray-900",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </GlassCard>
  )
}
