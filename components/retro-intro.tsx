"use client"

import { useState } from "react"

interface RetroIntroProps {
  onEnter: () => void
}

export function RetroIntro({ onEnter }: RetroIntroProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleEnter = () => {
    setIsAnimating(true)
    setTimeout(() => {
      onEnter()
    }, 800)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-800 ${
        isAnimating ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      {/* Retro Background */}
      <div className="absolute inset-0 bg-black">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Animated Scanlines */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full animate-pulse"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.03) 2px,
                rgba(0, 255, 255, 0.03) 4px
              )`,
            }}
          />
        </div>

        {/* Neon Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center space-y-12 px-8 max-w-4xl mx-auto">
        {/* Pixel Art Logo/Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-2xl blur-lg opacity-60 animate-pulse" />
            <div
              className="relative w-24 h-24 bg-black border-4 border-cyan-400 rounded-2xl flex items-center justify-center"
              style={{
                boxShadow: `
                  0 0 20px rgba(0, 255, 255, 0.5),
                  inset 0 0 20px rgba(0, 255, 255, 0.1)
                `,
              }}
            >
              {/* Pixel Robot Face */}
              <div className="text-cyan-400 text-4xl font-bold font-mono">AI</div>
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1
            className="text-6xl md:text-8xl font-bold font-mono tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 animate-pulse"
            style={{
              textShadow: `
                0 0 10px rgba(0, 255, 255, 0.8),
                0 0 20px rgba(0, 255, 255, 0.6),
                0 0 30px rgba(0, 255, 255, 0.4)
              `,
              filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))",
            }}
          >
            MY.AI
          </h1>

          <div
            className="text-2xl md:text-3xl font-mono font-bold text-pink-400 animate-pulse"
            style={{
              textShadow: `
                0 0 10px rgba(255, 20, 147, 0.8),
                0 0 20px rgba(255, 20, 147, 0.6)
              `,
            }}
          >
            RETRO EDITION
          </div>
        </div>

        {/* Subtitle */}
        <div className="space-y-4">
          <p
            className="text-lg md:text-xl font-mono text-cyan-300 max-w-2xl mx-auto leading-relaxed"
            style={{
              textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
            }}
          >
            &gt; MULTIMODAL AI CHATBOT SYSTEM
          </p>
          <p
            className="text-base md:text-lg font-mono text-purple-300 max-w-2xl mx-auto"
            style={{
              textShadow: "0 0 10px rgba(147, 51, 234, 0.5)",
            }}
          >
            &gt; POWERED BY GROQ • GEMINI • XAI
          </p>
        </div>

        {/* Enter Button */}
        <div className="pt-8">
          <button
            onClick={handleEnter}
            className="group relative px-12 py-6 font-mono font-bold text-2xl md:text-3xl text-black bg-gradient-to-r from-cyan-400 to-pink-500 rounded-2xl transform hover:scale-105 transition-all duration-300 active:scale-95"
            style={{
              boxShadow: `
                0 0 20px rgba(0, 255, 255, 0.6),
                0 0 40px rgba(255, 20, 147, 0.4),
                inset 0 0 20px rgba(255, 255, 255, 0.2)
              `,
            }}
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Button Content */}
            <span className="relative z-10 tracking-wider">{isAnimating ? "LOADING..." : "[ ENTER ]"}</span>

            {/* Pixel Border Effect */}
            <div
              className="absolute inset-0 rounded-2xl border-4 border-white/30"
              style={{
                background: `
                  linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)
                `,
              }}
            />

            {/* Loading Animation */}
            {isAnimating && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-black/30 border-t-black rounded-full animate-spin" />
              </div>
            )}
          </button>
        </div>

        {/* Retro Instructions */}
        <div className="pt-8 space-y-2">
          <p
            className="text-sm font-mono text-cyan-500/80 animate-pulse"
            style={{
              textShadow: "0 0 5px rgba(0, 255, 255, 0.3)",
            }}
          >
            &gt; CLICK TO INITIALIZE SYSTEM
          </p>
          <div className="flex justify-center space-x-8 text-xs font-mono text-purple-400/60">
            <span>READY</span>
            <span className="animate-pulse">●</span>
            <span>PLAYER 1</span>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8">
        <div
          className="w-16 h-16 border-4 border-cyan-400 rounded-lg"
          style={{
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)",
          }}
        />
      </div>
      <div className="absolute top-8 right-8">
        <div
          className="w-16 h-16 border-4 border-pink-400 rounded-lg"
          style={{
            boxShadow: "0 0 15px rgba(255, 20, 147, 0.5)",
          }}
        />
      </div>
      <div className="absolute bottom-8 left-8">
        <div
          className="w-16 h-16 border-4 border-purple-400 rounded-lg"
          style={{
            boxShadow: "0 0 15px rgba(147, 51, 234, 0.5)",
          }}
        />
      </div>
      <div className="absolute bottom-8 right-8">
        <div
          className="w-16 h-16 border-4 border-yellow-400 rounded-lg"
          style={{
            boxShadow: "0 0 15px rgba(255, 255, 0, 0.5)",
          }}
        />
      </div>
    </div>
  )
}
