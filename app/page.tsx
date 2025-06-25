"use client"

import type React from "react"
import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Settings, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { CinematicBackground } from "@/components/cinematic-background"
import { GlassMorphism } from "@/components/glass-morphism"
import { CinematicText } from "@/components/cinematic-text"
import { MinimalInput } from "@/components/minimal-input"
import { MinimalButton } from "@/components/minimal-button"
import { ProviderSelector, type Provider } from "@/components/provider-selector"
import { ApiKeySettings } from "@/components/api-key-settings"

export default function CinematicInterface() {
  const [selectedProvider, setSelectedProvider] = useState<Provider>("groq")
  const [showSettings, setShowSettings] = useState(false)
  const [apiKeys, setApiKeys] = useState<{ groq?: string; gemini?: string; xai?: string }>({})
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, error } = useChat({
    api: "/api/chat",
    body: {
      provider: selectedProvider,
      apiKeys,
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

  const testConnection = async () => {
    setConnectionStatus("testing")
    setErrorMessage("")

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hello, are you working?" }],
          provider: selectedProvider,
          apiKeys,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Connection failed")
      }

      setConnectionStatus("success")
    } catch (error) {
      setConnectionStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Connection test failed")
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setConnectionStatus("testing")
    handleSubmit(e, {
      body: {
        provider: selectedProvider,
        apiKeys,
      },
    })
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "testing":
        return <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <div className="w-2 h-2 bg-white/40 rounded-full" />
    }
  }

  return (
    <div className="min-h-screen relative">
      <CinematicBackground />

      {/* Header */}
      <div className="sticky top-0 z-20 p-8 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white/80" />
            </div>
            <div>
              <CinematicText variant="title" weight="light">
                MY.AI
              </CinematicText>
              <CinematicText className="text-white/50 text-sm tracking-widest uppercase mt-1">
                Intelligent Conversations
              </CinematicText>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <CinematicText className="text-white/60 text-sm tracking-wider uppercase">
                {selectedProvider}
              </CinematicText>
            </div>
            <MinimalButton variant="ghost" size="sm" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="h-4 w-4" />
            </MinimalButton>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="relative z-30 px-8 pb-4">
          <div className="max-w-6xl mx-auto">
            <GlassMorphism intensity="medium" className="p-4 border-red-500/20">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div>
                  <CinematicText className="text-red-300 text-sm font-medium">Connection Error</CinematicText>
                  <CinematicText className="text-red-200/80 text-xs mt-1">{errorMessage}</CinematicText>
                </div>
                <MinimalButton variant="ghost" size="sm" onClick={() => setErrorMessage("")} className="ml-auto">
                  ✕
                </MinimalButton>
              </div>
            </GlassMorphism>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="relative z-30 px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            <GlassMorphism intensity="medium" className="p-8">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <CinematicText variant="subtitle" weight="medium">
                    Configuration
                  </CinematicText>
                  <MinimalButton
                    variant="primary"
                    size="sm"
                    onClick={testConnection}
                    disabled={connectionStatus === "testing"}
                  >
                    {connectionStatus === "testing" ? "Testing..." : "Test Connection"}
                  </MinimalButton>
                </div>

                <ApiKeySettings onApiKeysChange={setApiKeys} />

                <div>
                  <CinematicText variant="subtitle" weight="medium" className="mb-6">
                    AI Provider
                  </CinematicText>
                  <ProviderSelector
                    selectedProvider={selectedProvider}
                    onProviderChange={handleProviderChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
            </GlassMorphism>
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="relative z-10 px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <GlassMorphism intensity="strong" className="flex flex-col" style={{ minHeight: "calc(100vh - 200px)" }}>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
              <div className="p-8">
                {messages.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center text-center space-y-8"
                    style={{ minHeight: "400px" }}
                  >
                    <div className="space-y-4">
                      <CinematicText variant="hero" weight="light">
                        Think
                      </CinematicText>
                      <CinematicText variant="subtitle" className="text-white/60 max-w-2xl">
                        Start a conversation with artificial intelligence. Ask questions, explore ideas, learn something
                        new.
                      </CinematicText>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mt-12">
                      <MinimalButton
                        variant="ghost"
                        className="p-6 text-left h-auto justify-start"
                        onClick={() =>
                          setMessages([
                            { id: "q1", role: "user", content: "How can I improve my learning efficiency?" },
                          ])
                        }
                      >
                        <div className="space-y-2">
                          <div className="text-white/90 font-medium">Learning Optimization</div>
                          <div className="text-white/50 text-sm font-light">
                            Discover strategies to enhance your learning process
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-auto text-white/40" />
                      </MinimalButton>

                      <MinimalButton
                        variant="ghost"
                        className="p-6 text-left h-auto justify-start"
                        onClick={() =>
                          setMessages([{ id: "q2", role: "user", content: "Explain neural networks in simple terms" }])
                        }
                      >
                        <div className="space-y-2">
                          <div className="text-white/90 font-medium">AI Fundamentals</div>
                          <div className="text-white/50 text-sm font-light">
                            Understand the building blocks of artificial intelligence
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 ml-auto text-white/40" />
                      </MinimalButton>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-8">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-6 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-6 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            message.role === "user"
                              ? "bg-white/10 backdrop-blur-md border border-white/20"
                              : "bg-white/5 backdrop-blur-md border border-white/10"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-white/80" />
                          ) : (
                            <Bot className="h-5 w-5 text-white/60" />
                          )}
                        </div>
                        <div
                          className={`rounded-3xl px-6 py-4 ${
                            message.role === "user"
                              ? "bg-white/10 backdrop-blur-md border border-white/20"
                              : "bg-white/5 backdrop-blur-md border border-white/10"
                          }`}
                        >
                          <CinematicText className="leading-relaxed font-light whitespace-pre-wrap">
                            {message.content}
                          </CinematicText>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-6 justify-start">
                      <div className="flex gap-6 max-w-[80%]">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white/60" />
                        </div>
                        <div className="rounded-3xl px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10">
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                              <div
                                className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              />
                              <div
                                className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              />
                            </div>
                            <CinematicText className="text-white/50 text-sm">
                              {selectedProvider} is thinking...
                            </CinematicText>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="sticky bottom-0 p-8 border-t border-white/10 bg-black/20 backdrop-blur-md">
              <form onSubmit={onSubmit} className="flex gap-6 items-end">
                <div className="flex-1">
                  <MinimalInput
                    value={input}
                    onChange={handleInputChange}
                    placeholder={`Message ${selectedProvider.toUpperCase()}...`}
                    disabled={isLoading}
                    label="Message"
                  />
                </div>
                <MinimalButton
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  variant="primary"
                  size="md"
                  className="flex-shrink-0"
                >
                  <Send className="h-5 w-5" />
                </MinimalButton>
              </form>
              <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                <span>Press Enter to send • Shift+Enter for new line</span>
                <span>Status: {connectionStatus}</span>
              </div>
            </div>
          </GlassMorphism>
        </div>
      </div>
    </div>
  )
}
