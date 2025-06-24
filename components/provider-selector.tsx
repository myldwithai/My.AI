"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, Sparkles } from "lucide-react"

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
    color: "bg-orange-500",
    badge: "Fast",
  },
  {
    id: "gemini" as Provider,
    name: "Gemini",
    description: "Google's advanced AI",
    model: "Gemini 1.5 Flash",
    icon: Sparkles,
    color: "bg-blue-500",
    badge: "Smart",
  },
  {
    id: "xai" as Provider,
    name: "xAI Grok",
    description: "Elon's witty AI",
    model: "Grok 3",
    icon: Brain,
    color: "bg-purple-500",
    badge: "Witty",
  },
]

export function ProviderSelector({ selectedProvider, onProviderChange, disabled }: ProviderSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      {providers.map((provider) => {
        const Icon = provider.icon
        const isSelected = selectedProvider === provider.id

        return (
          <Card
            key={provider.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !disabled && onProviderChange(provider.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${provider.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{provider.name}</h3>
                    <p className="text-xs text-gray-600">{provider.model}</p>
                  </div>
                </div>
                <Badge variant={isSelected ? "default" : "secondary"} className="text-xs">
                  {provider.badge}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">{provider.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
