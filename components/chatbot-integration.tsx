"use client"

import type React from "react"
import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Settings, MessageSquare, Upload, ImageIcon, Mic } from "lucide-react"
import { AdvancedGlass } from "./advanced-glass"
import { PremiumButton } from "./premium-button"
import { GlassInput } from "./glass-input"
import { CinematicText } from "./cinematic-text"
import { ProviderSelector, type Provider } from "./provider-selector"
import { ApiKeySettings } from "./api-key-settings"

interface ChatbotIntegrationProps {
  className?: string
  initialProvider?: Provider
  showHeader?: boolean
  enableFileUpload?: boolean
  enableVoiceInput?: boolean
}

export function ChatbotIntegration({
  className = "",
  initialProvider = "groq",
  showHeader = true,
  enableFileUpload = true,
  enableVoiceInput = true,
}: ChatbotIntegrationProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider>(initialProvider)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKeys, setApiKeys] = useState<{ groq?: string; gemini?: string; xai?: string }>({})
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
    body: {
      provider: selectedProvider,
      apiKeys,
      files: uploadedFiles,
    },
    onError: (error) => {
      console.error("Chat error:", error)
      setErrorMessage(error.message)
      setConnectionStatus("error")
    },
    onFinish: () => {
      setConnectionStatus("success")
      setErrorMessage("")
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleProviderChange = (provider: Provider) => {
    setSelectedProvider(provider)
    setMessages([])
    setConnectionStatus("idle")
    setErrorMessage("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(files)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setConnectionStatus("testing")
    handleSubmit(e, {
      body: {
        provider: selectedProvider,
        apiKeys,
        files: uploadedFiles,
      },
    })
    setUploadedFiles([]) // Clear files after sending
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Optional Header */}
      {showHeader && (
        <div className="p-4 border-b border-white/10">
          <AdvancedGlass variant="panel" blur="md" opacity="low" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CinematicText weight="medium" className="text-sm">
                    MY.AI Chatbot
                  </CinematicText>
                  <CinematicText className="text-white/60 text-xs">
                    {selectedProvider.toUpperCase()} • {connectionStatus}
                  </CinematicText>
                </div>
              </div>

              <PremiumButton variant="glass" size="sm" onClick={() => setShowSettings(!showSettings)}>
                <Settings className="h-4 w-4" />
              </PremiumButton>
            </div>
          </AdvancedGlass>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b border-white/10">
          <AdvancedGlass variant="card" blur="lg" opacity="medium" className="p-6">
            <div className="space-y-6">
              <ApiKeySettings onApiKeysChange={setApiKeys} />
              <div>
                <CinematicText weight="medium" className="mb-4 text-sm">
                  AI Provider
                </CinematicText>
                <ProviderSelector
                  selectedProvider={selectedProvider}
                  onProviderChange={handleProviderChange}
                  disabled={isLoading}
                />
              </div>
            </div>
          </AdvancedGlass>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4">
          <AdvancedGlass variant="panel" blur="md" opacity="medium" className="p-3 border-red-400/20">
            <div className="flex items-center gap-3">
              <div className="text-red-400 text-sm">{errorMessage}</div>
              <PremiumButton variant="ghost" size="sm" onClick={() => setErrorMessage("")}>
                ✕
              </PremiumButton>
            </div>
          </AdvancedGlass>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <CinematicText className="text-white/60 text-sm">
                Start a conversation with AI. Upload files, ask questions, explore ideas.
              </CinematicText>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <AdvancedGlass
                  variant="floating"
                  blur="md"
                  opacity="low"
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-white/80" />
                  ) : (
                    <Bot className="h-4 w-4 text-white/60" />
                  )}
                </AdvancedGlass>

                <AdvancedGlass
                  variant="card"
                  blur="lg"
                  opacity={message.role === "user" ? "medium" : "low"}
                  className="px-4 py-3"
                >
                  <CinematicText className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </CinematicText>
                </AdvancedGlass>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <AdvancedGlass
                variant="floating"
                blur="md"
                opacity="low"
                className="w-8 h-8 flex items-center justify-center"
              >
                <Bot className="h-4 w-4 text-white/60" />
              </AdvancedGlass>
              <AdvancedGlass variant="card" blur="lg" opacity="low" className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
                    <div
                      className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                  <CinematicText className="text-white/60 text-xs">Thinking...</CinematicText>
                </div>
              </AdvancedGlass>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* File Upload Preview */}
      {uploadedFiles.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <AdvancedGlass variant="panel" blur="md" opacity="low" className="p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <CinematicText className="text-xs text-white/60">Files:</CinematicText>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 rounded-lg px-2 py-1">
                  <ImageIcon className="h-3 w-3 text-white/60" />
                  <CinematicText className="text-xs">{file.name}</CinematicText>
                  <button
                    onClick={() => setUploadedFiles((files) => files.filter((_, i) => i !== index))}
                    className="text-white/40 hover:text-white/60"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </AdvancedGlass>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-white/10">
        <AdvancedGlass variant="panel" blur="lg" opacity="low" className="p-4">
          <form onSubmit={onSubmit} className="flex gap-3 items-end">
            <div className="flex-1">
              <GlassInput
                value={input}
                onChange={handleInputChange}
                placeholder={`Message ${selectedProvider.toUpperCase()}...`}
                disabled={isLoading}
                icon={<MessageSquare className="h-4 w-4" />}
              />
            </div>

            {/* File Upload */}
            {enableFileUpload && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,text/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <PremiumButton type="button" variant="ghost" size="md" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-4 w-4" />
                </PremiumButton>
              </div>
            )}

            {/* Voice Input */}
            {enableVoiceInput && (
              <PremiumButton type="button" variant="ghost" size="md">
                <Mic className="h-4 w-4" />
              </PremiumButton>
            )}

            {/* Send Button */}
            <PremiumButton
              type="submit"
              disabled={isLoading || !input.trim()}
              variant="primary"
              size="md"
              loading={isLoading}
            >
              <Send className="h-4 w-4" />
            </PremiumButton>
          </form>
        </AdvancedGlass>
      </div>
    </div>
  )
}
