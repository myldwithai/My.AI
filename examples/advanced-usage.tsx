"use client"

// Advanced usage example with custom integration
import { ChatbotIntegration } from "@/components/chatbot-integration"
import { useState } from "react"

export default function AdvancedExample() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Your existing app content */}
      <div className="p-8">
        <h1 className="text-white text-3xl mb-6">My Advanced App</h1>

        <button onClick={() => setShowChat(!showChat)} className="bg-blue-500 text-white px-4 py-2 rounded">
          {showChat ? "Hide" : "Show"} AI Assistant
        </button>
      </div>

      {/* Conditional chatbot */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-96 h-96 z-50">
          <ChatbotIntegration
            className="h-full bg-black/80 backdrop-blur-xl rounded-2xl border border-white/20"
            initialProvider="groq"
            showHeader={true}
            enableFileUpload={true}
            enableVoiceInput={false}
          />
        </div>
      )}
    </div>
  )
}
