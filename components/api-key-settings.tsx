"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Key } from "lucide-react"

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
      name: "Groq API Key",
      placeholder: "gsk_...",
      description: "Get your key from console.groq.com",
    },
    {
      id: "gemini" as keyof typeof apiKeys,
      name: "Gemini API Key",
      placeholder: "AIza...",
      description: "Get your key from makersuite.google.com",
    },
    {
      id: "xai" as keyof typeof apiKeys,
      name: "xAI API Key",
      placeholder: "xai-...",
      description: "Get your key from console.x.ai",
    },
  ]

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          <Key className="h-4 w-4" />
          API Key Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="space-y-2">
            <Label htmlFor={provider.id} className="text-sm font-medium">
              {provider.name}
            </Label>
            <div className="relative">
              <Input
                id={provider.id}
                type={showKeys[provider.id] ? "text" : "password"}
                placeholder={provider.placeholder}
                value={apiKeys[provider.id]}
                onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => toggleShowKey(provider.id)}
              >
                {showKeys[provider.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-gray-500">{provider.description}</p>
          </div>
        ))}

        <div className="pt-2 border-t">
          <p className="text-xs text-gray-600">
            💡 <strong>Tip:</strong> API keys are stored locally in your browser and never sent to our servers. They're
            only used to make direct API calls to the respective providers.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
