"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, Download, CheckCircle, AlertTriangle, TrendingUp, Eye, Zap } from "lucide-react"
import { AdvancedGlass } from "./advanced-glass"
import { PremiumButton } from "./premium-button"
import { CinematicText } from "./cinematic-text"

interface CVAnalysisResult {
  overallScore: number
  sections: {
    name: string
    score: number
    feedback: string
    suggestions: string[]
    status: "excellent" | "good" | "needs-improvement" | "missing"
  }[]
  keywords: {
    found: string[]
    missing: string[]
    suggestions: string[]
  }
  atsCompatibility: number
  recommendations: string[]
}

interface CVAnalyzerProps {
  onAnalysisComplete?: (result: CVAnalysisResult) => void
}

export function CVAnalyzer({ onAnalysisComplete }: CVAnalyzerProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".pdf")) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const analyzeCV = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/cv-analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze CV. Please try again.")
      }

      const result: CVAnalysisResult = await response.json()
      setAnalysisResult(result)
      onAnalysisComplete?.(result)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "good":
        return <CheckCircle className="h-5 w-5 text-blue-400" />
      case "needs-improvement":
        return <AlertTriangle className="h-5 w-5 text-yellow-400" />
      case "missing":
        return <AlertTriangle className="h-5 w-5 text-red-400" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      {!analysisResult && (
        <AdvancedGlass variant="card" blur="xl" opacity="medium" className="p-8">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full blur-3xl" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl border border-blue-400/30 flex items-center justify-center mx-auto">
                <FileText className="h-10 w-10 text-blue-400" />
              </div>
            </div>

            <div className="space-y-4">
              <CinematicText variant="title" weight="semibold" className="text-white">
                AI-Powered CV Analysis
              </CinematicText>
              <CinematicText className="text-blue-200 max-w-2xl mx-auto leading-relaxed">
                Upload your CV and get instant, comprehensive feedback powered by AI. Optimize for ATS systems and stand
                out in the MENA job market.
              </CinematicText>
            </div>

            {/* File Upload Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 ${
                dragActive
                  ? "border-blue-400 bg-blue-500/10"
                  : file
                    ? "border-green-400 bg-green-500/10"
                    : "border-blue-400/30 hover:border-blue-400/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                <Upload className={`h-12 w-12 mx-auto ${file ? "text-green-400" : "text-blue-400"}`} />
                <div>
                  <CinematicText weight="medium" className={file ? "text-green-300" : "text-white"}>
                    {file ? `Selected: ${file.name}` : "Drop your CV here or click to browse"}
                  </CinematicText>
                  <CinematicText className="text-blue-300 text-sm mt-2">
                    Supports PDF format • Max 10MB • Your data is secure
                  </CinematicText>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PremiumButton
                onClick={analyzeCV}
                disabled={!file || isAnalyzing}
                variant="primary"
                size="lg"
                glow
                loading={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing CV..." : "Analyze My CV"}
                <Zap className="ml-2 h-5 w-5" />
              </PremiumButton>

              <PremiumButton
                onClick={() => fileInputRef.current?.click()}
                variant="ghost"
                size="lg"
                className="border-blue-400/30"
              >
                Choose File
                <Upload className="ml-2 h-5 w-5" />
              </PremiumButton>
            </div>

            {error && (
              <div className="text-red-400 text-sm font-medium mb-4">{error}</div>
            )}
          </div>
        </AdvancedGlass>
      )}

      {/* Analysis Results */}
      {analysisResult && (
        <div className="space-y-8">
          {/* Overall Score */}
          <AdvancedGlass variant="card" blur="xl" opacity="medium" className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-blue-900/30"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisResult.overallScore / 100)}`}
                      className="text-blue-400 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                      {analysisResult.overallScore}%
                    </span>
                  </div>
                </div>
                <CinematicText variant="subtitle" weight="semibold" className="text-white">
                  Overall CV Score
                </CinematicText>
              </div>

              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-blue-900/30"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - analysisResult.atsCompatibility / 100)}`}
                      className="text-green-400 transition-all duration-1000 ease-out"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${getScoreColor(analysisResult.atsCompatibility)}`}>
                      {analysisResult.atsCompatibility}%
                    </span>
                  </div>
                </div>
                <CinematicText variant="subtitle" weight="semibold" className="text-white">
                  ATS Compatibility
                </CinematicText>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                    <span className="text-3xl font-bold text-blue-400">{analysisResult.keywords?.found?.length ?? 0}</span>
                    <div className="text-sm text-blue-300">Keywords Found</div>
                  </div>
                </div>
                <CinematicText variant="subtitle" weight="semibold" className="text-white">
                  Keyword Match
                </CinematicText>
              </div>
            </div>
          </AdvancedGlass>

          {/* Section Analysis */}
          <AdvancedGlass variant="card" blur="xl" opacity="medium" className="p-8">
            <CinematicText variant="title" weight="semibold" className="text-white mb-8">
              Section Analysis
            </CinematicText>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analysisResult.sections.map((section, index) => (
                <AdvancedGlass key={index} variant="panel" blur="lg" opacity="low" className="p-6 border-blue-400/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(section.status)}
                      <CinematicText weight="medium" className="text-white">
                        {section.name}
                      </CinematicText>
                    </div>
                    <span className={`text-lg font-bold ${getScoreColor(section.score)}`}>{section.score}%</span>
                  </div>

                  <CinematicText className="text-blue-200 text-sm mb-4">{section.feedback}</CinematicText>

                  <div className="space-y-2">
                    <CinematicText className="text-white text-sm font-medium">Suggestions:</CinematicText>
                    <ul className="space-y-1">
                      {section.suggestions.map((suggestion, idx) => (
                        <li key={idx} className="text-blue-300 text-sm flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AdvancedGlass>
              ))}
            </div>
          </AdvancedGlass>

          {/* Keywords Analysis */}
          <AdvancedGlass variant="card" blur="xl" opacity="medium" className="p-8">
            <CinematicText variant="title" weight="semibold" className="text-white mb-8">
              Keywords Analysis
            </CinematicText>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <CinematicText weight="medium" className="text-green-400 mb-4 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Found Keywords ({analysisResult.keywords?.found?.length ?? 0})
                </CinematicText>
                <div className="flex flex-wrap gap-2">
                  {(analysisResult.keywords?.found ?? []).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-400/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <CinematicText weight="medium" className="text-red-400 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Missing Keywords ({analysisResult.keywords?.missing?.length ?? 0})
                </CinematicText>
                <div className="flex flex-wrap gap-2">
                  {(analysisResult.keywords?.missing ?? []).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm border border-red-400/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <CinematicText weight="medium" className="text-blue-400 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Suggested Keywords ({analysisResult.keywords?.suggestions?.length ?? 0})
                </CinematicText>
                <div className="flex flex-wrap gap-2">
                  {(analysisResult.keywords?.suggestions ?? []).map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-400/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AdvancedGlass>

          {/* Recommendations */}
          <AdvancedGlass variant="card" blur="xl" opacity="medium" className="p-8">
            <CinematicText variant="title" weight="semibold" className="text-white mb-8">
              AI Recommendations
            </CinematicText>

            <div className="space-y-4">
              {analysisResult.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-400 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <CinematicText className="text-blue-200 leading-relaxed">{recommendation}</CinematicText>
                </div>
              ))}
            </div>
          </AdvancedGlass>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PremiumButton variant="primary" size="lg" glow>
              <Download className="mr-2 h-5 w-5" />
              Download Detailed Report
            </PremiumButton>

            <PremiumButton variant="ghost" size="lg" className="border-blue-400/30">
              <Eye className="mr-2 h-5 w-5" />
              View Optimized Version
            </PremiumButton>

            <PremiumButton
              variant="ghost"
              size="lg"
              className="border-blue-400/30"
              onClick={() => {
                setAnalysisResult(null)
                setFile(null)
              }}
            >
              Analyze Another CV
            </PremiumButton>
          </div>
        </div>
      )}
    </div>
  )
}
