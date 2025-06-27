"use client"

import type React from "react"
import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import {
  Send,
  Bot,
  User,
  Settings,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Compass,
  FileText,
  TrendingUp,
} from "lucide-react"
import { AdvancedGlass } from "./advanced-glass"
import { PremiumButton } from "./premium-button"
import { GlassInput } from "./glass-input"
import { CinematicText } from "./cinematic-text"
import { ProviderSelector, type Provider } from "./provider-selector"
import { ApiKeySettings } from "./api-key-settings"

interface TheWorkappChatProps {
  onBackToLanding: () => void
}

export function TheWorkappChat({ onBackToLanding }: TheWorkappChatProps) {
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
        return <div className="w-2 h-2 bg-blue-400/60 rounded-full" />
    }
  }

  const quickStartPrompts = [
    {
      icon: Compass,
      title: "Discover My Personality Type",
      description: "Take an AI-powered MBTI assessment",
      prompt:
        "I want to discover my personality type using MBTI framework. Can you guide me through a comprehensive assessment?",
    },
    {
      icon: MessageSquare,
      title: "Improve Communication Skills",
      description: "Learn conflict resolution techniques",
      prompt:
        "Help me improve my communication skills, especially in handling difficult conversations and conflicts at work.",
    },
    {
      icon: FileText,
      title: "Optimize My CV",
      description: "Get AI-powered CV analysis and tips",
      prompt:
        "I need help optimizing my CV for the MENA job market. Can you analyze my profile and suggest improvements?",
    },
    {
      icon: TrendingUp,
      title: "Career Growth Plan",
      description: "Create a personalized development roadmap",
      prompt:
        "Create a personalized career growth plan for me. I want to advance in my field and need strategic guidance.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.2) 0%, transparent 50%)`,
            }}
          />
        </div>

        {/* Floating Neural Network Pattern */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 animate-pulse">
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="sticky top-0 z-20 p-6">
        <div className="max-w-7xl mx-auto">
          <AdvancedGlass variant="panel" blur="xl" opacity="medium" shadow="soft" className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-2xl blur-lg" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-400/30 flex items-center justify-center">
                    <Bot className="h-7 w-7 text-blue-400" />
                  </div>
                </div>
                <div>
                  <CinematicText
                    variant="title"
                    weight="semibold"
                    className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                  >
                    TheWorkapp
                  </CinematicText>
                  <CinematicText className="text-blue-300 text-sm tracking-wider uppercase mt-1">
                    AI Career Co-Pilot
                  </CinematicText>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <AdvancedGlass variant="overlay" blur="md" opacity="low" className="px-4 py-2 flex items-center gap-3">
                  {getStatusIcon()}
                  <CinematicText className="text-white/80 text-sm font-medium capitalize">
                    {selectedProvider}
                  </CinematicText>
                </AdvancedGlass>

                <PremiumButton variant="glass" size="sm" onClick={() => setShowSettings(!showSettings)}>
                  <Settings className="h-4 w-4" />
                </PremiumButton>

                <PremiumButton variant="ghost" size="sm" onClick={onBackToLanding} className="font-medium text-xs">
                  ← Back to Landing
                </PremiumButton>
              </div>
            </div>
          </AdvancedGlass>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="relative z-30 px-6 pb-4">
          <div className="max-w-7xl mx-auto">
            <AdvancedGlass variant="panel" blur="lg" opacity="medium" shadow="medium" className="p-4 border-red-400/20">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <CinematicText className="text-red-300 text-sm font-medium">Connection Error</CinematicText>
                  <CinematicText className="text-red-200/80 text-xs mt-1">{errorMessage}</CinematicText>
                </div>
                <PremiumButton variant="ghost" size="sm" onClick={() => setErrorMessage("")}>
                  ✕
                </PremiumButton>
              </div>
            </AdvancedGlass>
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="relative z-30 px-6 pb-6">
          <div className="max-w-7xl mx-auto">
            <AdvancedGlass variant="card" blur="xl" opacity="high" shadow="strong" className="p-8">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <CinematicText variant="subtitle" weight="semibold">
                    AI Configuration
                  </CinematicText>
                  <PremiumButton variant="primary" size="sm" glow>
                    Test Connection
                  </PremiumButton>
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
            </AdvancedGlass>
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="relative z-10 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <AdvancedGlass
            variant="card"
            blur="xl"
            opacity="medium"
            shadow="strong"
            className="flex flex-col"
            style={{ minHeight: "calc(100vh - 250px)" }}
          >
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 350px)" }}>
              <div className="p-8">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center space-y-12 py-16">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full blur-3xl" />
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/30 flex items-center justify-center">
                        <MessageSquare className="h-12 w-12 text-blue-400" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      <CinematicText
                        variant="hero"
                        weight="light"
                        className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
                      >
                        Welcome to TheWorkapp
                      </CinematicText>
                      <CinematicText variant="subtitle" className="text-blue-200 max-w-2xl leading-relaxed">
                        Your AI career co-pilot is ready to help you discover your potential, master communication, and
                        accelerate your professional growth in the MENA region.
                      </CinematicText>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                      {quickStartPrompts.map((prompt, index) => (
                        <AdvancedGlass
                          key={index}
                          variant="card"
                          blur="lg"
                          opacity="low"
                          className="p-6 cursor-pointer hover:opacity-80 transition-all duration-300 group border-blue-400/20"
                          onClick={() => setMessages([{ id: `q${index}`, role: "user", content: prompt.prompt }])}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                                <prompt.icon className="h-6 w-6 text-blue-400" />
                              </div>
                              <div className="space-y-2">
                                <CinematicText weight="medium" className="text-white">
                                  {prompt.title}
                                </CinematicText>
                                <CinematicText className="text-blue-200 text-sm leading-relaxed">
                                  {prompt.description}
                                </CinematicText>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-blue-400/60 group-hover:text-blue-400 transition-colors" />
                          </div>
                        </AdvancedGlass>
                      ))}
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
                        className={`flex gap-6 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <AdvancedGlass
                          variant="floating"
                          blur="md"
                          opacity={message.role === "user" ? "medium" : "low"}
                          className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-blue-400/20"
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5 text-blue-300" />
                          ) : (
                            <Bot className="h-5 w-5 text-blue-400" />
                          )}
                        </AdvancedGlass>

                        <AdvancedGlass
                          variant="card"
                          blur="lg"
                          opacity={message.role === "user" ? "medium" : "low"}
                          shadow="soft"
                          className="px-6 py-4 flex-1 border-blue-400/20"
                        >
                          <CinematicText className="leading-relaxed font-light whitespace-pre-wrap">
                            {message.content}
                          </CinematicText>
                        </AdvancedGlass>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-6 justify-start">
                      <div className="flex gap-6 max-w-[85%]">
                        <AdvancedGlass
                          variant="floating"
                          blur="md"
                          opacity="low"
                          className="flex-shrink-0 w-12 h-12 flex items-center justify-center border-blue-400/20"
                        >
                          <Bot className="h-5 w-5 text-blue-400" />
                        </AdvancedGlass>

                        <AdvancedGlass
                          variant="card"
                          blur="lg"
                          opacity="low"
                          shadow="soft"
                          className="px-6 py-4 border-blue-400/20"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" />
                              <div
                                className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"
                                style={{ animationDelay: "0.2s" }}
                              />
                              <div
                                className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"
                                style={{ animationDelay: "0.4s" }}
                              />
                            </div>
                            <CinematicText className="text-blue-300 text-sm">
                              Your AI co-pilot is thinking...
                            </CinematicText>
                          </div>
                        </AdvancedGlass>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="p-8 border-t border-blue-400/20">
              <AdvancedGlass variant="panel" blur="xl" opacity="low" className="p-6 border-blue-400/20">
                <form onSubmit={onSubmit} className="flex gap-4 items-end">
                  <div className="flex-1">
                    <GlassInput
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask your AI career co-pilot anything..."
                      disabled={isLoading}
                      icon={<MessageSquare className="h-5 w-5" />}
                    />
                  </div>
                  <PremiumButton
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    variant="primary"
                    size="lg"
                    glow
                    loading={isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </PremiumButton>
                </form>

                <div className="mt-4 flex items-center justify-between text-xs text-blue-300/70">
                  <span>Press Enter to send • Shift+Enter for new line</span>
                  <span className="flex items-center gap-2">
                    Status: <span className="capitalize text-blue-200">{connectionStatus}</span>
                  </span>
                </div>
              </AdvancedGlass>
            </div>
          </AdvancedGlass>
        </div>
      </div>
    </div>
  )
}
