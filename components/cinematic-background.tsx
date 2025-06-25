"use client"

import { useEffect, useState } from "react"

export function CinematicBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Atmospheric layers */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-700/10 to-slate-900/30" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 3D-like geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-blue-400/20 to-slate-600/20 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute bottom-1/3 left-1/5 w-48 h-48 opacity-15">
        <div
          className="w-full h-full bg-gradient-to-tl from-slate-400/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}
