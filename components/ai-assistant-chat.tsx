"use client"

import type React from "react"
import { useChat } from "ai/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Settings } from "lucide-react"
import { ProviderSelector, type Provider } from "@/components/provider-selector"
import { ApiKeySettings } from "@/components/api-key-settings"
import { GlassCard } from "./glass-card"

interface AIAssistantChatProps {
  initialProvider?: Provider
}

// Instructs the AI model to act as an expert, multimodal AI-powered career assistant platform.
const LD_SYSTEM_MESSAGE = `
You are an expert, multimodal AI-powered career assistant platform called 'TheWorkapp' (also known as MY.AI or LearnAI).

Your primary roles are:
- Supporting users in career growth, communication skills, CV analysis, and personality assessment.
- Providing tailored learning recommendations, prioritizing free resources, LinkedIn Learning, and GSI.
- Suggesting MBTI and Taki personality tests for self-assessment when appropriate.

Always maintain a supportive, professional, and knowledgeable tone. Focus on practical, actionable steps that empower users to improve their skills and career prospects.
`

export function AIAssistantChat({ initialProvider = "groq" }: AIAssistantChatProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>(initialProvider)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKeys, setApiKeys] = useState<{ groq?: string; gemini?: string; xai?: string }>({})

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    body: {
      provider: selectedProvider,
      apiKeys,
    },
  })

  const handleProviderChange = (provider: Provider) => {
    setSelectedProvider(provider)
    setMessages([])
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e, {
      body: {
        provider: selectedProvider,
        apiKeys,
        systemMessage: LD_SYSTEM_MESSAGE,
      },
    })
  }

  return (
    <GlassCard variant="elevated" className="flex flex-col h-full">
      <div className="p-6 border-b border-gray-200/[0.3]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">AI Assistant</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-600 hover:text-gray-900 hover:bg-white/[0.5]"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Toggle settings</span>
          </Button>
        </div>

        {showSettings && (
          <div className="mt-6 space-y-4">
            <ApiKeySettings onApiKeysChange={setApiKeys} />
            <div>
              <h4 className="text-sm font-medium mb-3 text-gray-700">Choose AI Provider:</h4>
              <ProviderSelector
                selectedProvider={selectedProvider}
                onProviderChange={handleProviderChange}
                disabled={isLoading}
              />
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-neon_blue-500/[0.2] to-vivid_sky_blue-500/[0.2] rounded-full blur-xl" />
                <div className="relative p-4 rounded-full bg-gradient-to-br from-neon_blue-500/[0.1] to-vivid_sky_blue-500/[0.1] w-16 h-16 mx-auto flex items-center justify-center">
                  <Bot className="h-8 w-8 text-neon_blue-600" />
                </div>
              </div>
              <p className="mb-2 text-gray-700">Start a conversation with AI!</p>
              <p className="text-sm text-gray-500">
                Currently using: <span className="font-semibold capitalize text-gray-700">{selectedProvider}</span>
              </p>
              <div className="mt-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-white/[0.8] bg-white/[0.5]"
                  onClick={() => setMessages([{ id: "q1", role: "user", content: "How can I improve my learning?" }])}
                >
                  How can I improve my learning?
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-700 border-gray-200 hover:bg-white/[0.8] bg-white/[0.5]"
                  onClick={() => setMessages([{ id: "q2", role: "user", content: "What is a neural network?" }])}
                >
                  What is a neural network?
                </Button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-neon_blue-500 to-vivid_sky_blue-500 text-white shadow-lg"
                      : "bg-white/[0.8] text-gray-600 border border-gray-200/[0.5]"
                  }`}
                >
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-neon_blue-500 to-vivid_sky_blue-500 text-white shadow-lg"
                      : "bg-white/[0.8] text-gray-900 border border-gray-200/[0.3]"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/[0.8] text-gray-600 border border-gray-200/[0.5] flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-white/[0.8] border border-gray-200/[0.3]">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 capitalize">{selectedProvider} thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-gray-200/[0.3]">
        <form onSubmit={onSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder={`Ask ${selectedProvider.toUpperCase()} anything...`}
            disabled={isLoading}
            className="flex-1 bg-white/[0.8] border-gray-200/[0.5] text-gray-900 placeholder:text-gray-500 focus:ring-neon_blue-500 focus:border-neon_blue-500 rounded-xl"
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-br from-neon_blue-500 to-vivid_sky_blue-500 hover:from-neon_blue-600 hover:to-vivid_sky_blue-600 text-white shadow-lg rounded-xl px-6"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Powered by {selectedProvider.toUpperCase()} • Switch providers anytime
        </p>
      </div>
    </GlassCard>
  )
}
