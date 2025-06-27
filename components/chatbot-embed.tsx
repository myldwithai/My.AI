"use client"

import { ChatbotIntegration } from "./chatbot-integration"
import { CinematicBackground } from "./cinematic-background"

interface ChatbotEmbedProps {
  width?: string
  height?: string
  className?: string
  showBackground?: boolean
}

export function ChatbotEmbed({
  width = "100%",
  height = "600px",
  className = "",
  showBackground = true,
}: ChatbotEmbedProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={{ width, height }}>
      {showBackground && <CinematicBackground />}
      <div className="relative z-10 h-full">
        <ChatbotIntegration className="h-full" showHeader={true} enableFileUpload={true} enableVoiceInput={true} />
      </div>
    </div>
  )
}
