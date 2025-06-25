"use client"
import { Zap, Brain, Sparkles } from "lucide-react"
import { GlassMorphism } from "./glass-morphism"
import { CinematicText } from "./cinematic-text"

export type Provider = "groq" | "gemini" | "xai"

interface ProviderSelectorProps {
  selectedProvider: Provider
  onProviderChange: (provider: Provider) => void
  disabled?: boolean
}

const providers = [
  {
    id: "groq" as Provider,
    name: "Groq",
    description: "Ultra-fast inference",
    model: "Llama 3.1 8B",
    icon: Zap,
  },
  {
    id: "gemini" as Provider,
    name: "Gemini",
    description: "Google's advanced AI",
    model: "Gemini 1.5 Flash",
    icon: Sparkles,
  },
  {
    id: "xai" as Provider,
    name: "xAI Grok",
    description: "Elon's witty AI",
    model: "Grok 3",
    icon: Brain,
  },
]

export function ProviderSelector({ selectedProvider, onProviderChange, disabled }: ProviderSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {providers.map((provider) => {
        const Icon = provider.icon
        const isSelected = selectedProvider === provider.id

        return (
          <GlassMorphism
            key={provider.id}
            intensity={isSelected ? "strong" : "subtle"}
            className={`p-6 cursor-pointer transition-all duration-500 ${
              isSelected ? "ring-1 ring-white/20" : "hover:bg-white/[0.08]"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !disabled && onProviderChange(provider.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-white/80" />
                </div>
                <div>
                  <CinematicText weight="medium" className="text-sm">
                    {provider.name}
                  </CinematicText>
                  <CinematicText className="text-white/50 text-xs">{provider.model}</CinematicText>
                </div>
              </div>
              {isSelected && <div className="w-2 h-2 bg-white/60 rounded-full" />}
            </div>
            <CinematicText className="text-white/40 text-xs font-light">{provider.description}</CinematicText>
          </GlassMorphism>
        )
      })}
    </div>
  )
}
