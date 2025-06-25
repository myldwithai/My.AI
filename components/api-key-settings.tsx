"use client"

import { useState } from "react"
import { Eye, EyeOff, Key } from "lucide-react"
import { GlassMorphism } from "./glass-morphism"
import { CinematicText } from "./cinematic-text"
import { MinimalInput } from "./minimal-input"
import { MinimalButton } from "./minimal-button"

interface ApiKeySettingsProps {
  onApiKeysChange: (keys: { groq?: string; gemini?: string; xai?: string }) => void
}

export function ApiKeySettings({ onApiKeysChange }: ApiKeySettingsProps) {
  const [apiKeys, setApiKeys] = useState({
    groq: "",
    gemini: "",
    xai: "",
  })

  const [showKeys, setShowKeys] = useState({
    groq: false,
    gemini: false,
    xai: false,
  })

  const handleKeyChange = (provider: keyof typeof apiKeys, value: string) => {
    const newKeys = { ...apiKeys, [provider]: value }
    setApiKeys(newKeys)
    onApiKeysChange(newKeys)
  }

  const toggleShowKey = (provider: keyof typeof showKeys) => {
    setShowKeys((prev) => ({ ...prev, [provider]: !prev[provider] }))
  }

  const providers = [
    {
      id: "groq" as keyof typeof apiKeys,
      name: "Groq",
      placeholder: "gsk_...",
      description: "console.groq.com",
    },
    {
      id: "gemini" as keyof typeof apiKeys,
      name: "Gemini",
      placeholder: "AIza...",
      description: "makersuite.google.com",
    },
    {
      id: "xai" as keyof typeof apiKeys,
      name: "xAI",
      placeholder: "xai-...",
      description: "console.x.ai",
    },
  ]

  return (
    <GlassMorphism intensity="subtle" className="p-6">
      <div className="flex items-center gap-3 mb-8">
        <Key className="h-5 w-5 text-white/60" />
        <CinematicText variant="subtitle" weight="medium">
          API Configuration
        </CinematicText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {providers.map((provider) => (
          <div key={provider.id} className="space-y-4">
            <div className="relative">
              <MinimalInput
                type={showKeys[provider.id] ? "text" : "password"}
                placeholder={provider.placeholder}
                value={apiKeys[provider.id]}
                onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                label={provider.name}
                className="pr-12"
              />
              <MinimalButton
                type="button"
                variant="minimal"
                size="sm"
                className="absolute right-0 top-4 p-2"
                onClick={() => toggleShowKey(provider.id)}
              >
                {showKeys[provider.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </MinimalButton>
            </div>
            <CinematicText className="text-white/40 text-xs">{provider.description}</CinematicText>
          </div>
        ))}
      </div>

      <div className="pt-6 mt-6 border-t border-white/10">
        <CinematicText className="text-white/50 text-xs font-light">
          API keys are stored locally and never transmitted to our servers.
        </CinematicText>
      </div>
    </GlassMorphism>
  )
}
