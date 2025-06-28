"use client"

import React, { useState } from "react"
import { AdvancedGlass } from "./advanced-glass"
import { PremiumButton } from "./premium-button"
import { CinematicText } from "./cinematic-text"
import { CheckCircle, AlertTriangle } from "lucide-react"
import Image from "next/image"

const QUESTIONS = [
	{
		question: "I enjoy working in teams and collaborating with others.",
		trait: "Extroversion",
	},
	{
		question: "I prefer to plan things in advance rather than be spontaneous.",
		trait: "Conscientiousness",
	},
	{
		question: "I am comfortable adapting to new situations.",
		trait: "Openness",
	},
	{
		question: "I often empathize with others' feelings.",
		trait: "Agreeableness",
	},
	{
		question: "I remain calm under pressure.",
		trait: "Emotional Stability",
	},
]

const TRAITS = [
	"Extroversion",
	"Conscientiousness",
	"Openness",
	"Agreeableness",
	"Emotional Stability",
]

export function PersonalityAssessment() {
	const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null))
	const [showResults, setShowResults] = useState(false)

	const handleAnswer = (idx: number, value: number) => {
		const updated = [...answers]
		updated[idx] = value
		setAnswers(updated)
	}

	const handleSubmit = () => {
		setShowResults(true)
	}

	const traitScores = TRAITS.map(trait => {
		const traitQuestions = QUESTIONS.map((q, i) => ({ ...q, idx: i })).filter(q => q.trait === trait)
		const score = traitQuestions.reduce((sum, q) => sum + (answers[q.idx] ?? 0), 0)
		return { trait, score, max: traitQuestions.length * 4 }
	})

	return (
		<div className="space-y-8">
			<div className="w-full flex items-center justify-center py-4">
				<Image src="/theworkapp-logo.png" alt="TheWorkapp Logo" width={160} height={44} priority />
			</div>
			<AdvancedGlass variant="card" blur="xl" opacity="medium" className="p-8">
				<CinematicText variant="title" weight="semibold" className="text-white mb-6">
					Interactive Personality Assessment
				</CinematicText>
				{!showResults ? (
					<form
						onSubmit={e => {
							e.preventDefault()
							handleSubmit()
						}}
						className="space-y-8"
					>
						{QUESTIONS.map((q, idx) => (
							<div key={idx} className="space-y-2">
								<CinematicText className="text-blue-200 text-lg">{q.question}</CinematicText>
								<div className="flex gap-4">
									{[0, 1, 2, 3, 4].map(val => (
										<label key={val} className="flex flex-col items-center cursor-pointer">
											<input
												type="radio"
												name={`q${idx}`}
												value={val}
												checked={answers[idx] === val}
												onChange={() => handleAnswer(idx, val)}
												className="sr-only"
											/>
											<span
												className={`w-8 h-8 flex items-center justify-center rounded-full border-2 transition-colors ${
													answers[idx] === val
														? "bg-blue-500 border-blue-400 text-white"
														: "bg-transparent border-blue-400 text-blue-400"
												}`}
											>
												{val}
											</span>
											<span className="text-xs text-blue-300 mt-1">
												{val === 0 ? "Never" : val === 4 ? "Always" : ""}
											</span>
										</label>
									))}
								</div>
							</div>
						))}
						<PremiumButton
							type="submit"
							variant="primary"
							size="lg"
							glow
							disabled={answers.some(a => a === null)}
						>
							See My Results
						</PremiumButton>
					</form>
				) : (
					<div className="space-y-8">
						<CinematicText variant="subtitle" weight="semibold" className="text-white mb-4">
							Your Personality Profile
						</CinematicText>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{traitScores.map(({ trait, score, max }) => (
								<AdvancedGlass key={trait} variant="panel" blur="lg" opacity="low" className="p-6 border-blue-400/20">
									<div className="flex items-center gap-3 mb-2">
										{score / max > 0.6 ? (
											<CheckCircle className="h-5 w-5 text-green-400" />
										) : (
											<AlertTriangle className="h-5 w-5 text-yellow-400" />
										)}
										<CinematicText weight="medium" className="text-white">
											{trait}
										</CinematicText>
										<span className="ml-auto text-lg font-bold text-blue-400">
											{Math.round((score / max) * 100)}%
										</span>
									</div>
									<div className="w-full bg-blue-900/30 rounded-full h-3 mb-2">
										<div
											className="bg-blue-400 h-3 rounded-full transition-all duration-700"
											style={{ width: `${(score / max) * 100}%` }}
										/>
									</div>
									<CinematicText className="text-blue-200 text-sm">
										{score / max > 0.6
											? `You show strong ${trait.toLowerCase()} tendencies.`
											: `You may want to develop your ${trait.toLowerCase()} further.`}
									</CinematicText>
								</AdvancedGlass>
							))}
						</div>
						<PremiumButton
							variant="ghost"
							size="lg"
							className="border-blue-400/30"
							onClick={() => {
								setAnswers(Array(QUESTIONS.length).fill(null))
								setShowResults(false)
							}}
						>
							Take Again
						</PremiumButton>
					</div>
				)}
			</AdvancedGlass>
		</div>
	)
}
