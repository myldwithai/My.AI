"use client"

import React from "react"
import Link from "next/link"
import { AdvancedGlass } from "@/components/advanced-glass"
import { PremiumButton } from "@/components/premium-button"
import { CinematicText } from "@/components/cinematic-text"
import { Bot, FileText, Sparkles, ArrowRight } from "lucide-react"
import Image from "next/image"

const experiences = [
	{
		title: "AI Chat Assistant",
		description:
			"Get instant answers, career advice, and personalized coaching from our advanced AI.",
		icon: <Bot className="h-10 w-10 text-blue-400 animate-bounce" />,
		href: "/ai-chat",
		color: "from-blue-500 to-blue-600",
	},
	{
		title: "MBTI Personality Assessment",
		description:
			"Discover your personality type and get tailored growth recommendations.",
		icon: <Sparkles className="h-10 w-10 text-purple-400 animate-pulse" />,
		href: "/personality-assessment",
		color: "from-purple-500 to-pink-500",
	},
	{
		title: "CV Analyzer",
		description:
			"Upload your CV and receive instant, AI-powered feedback to optimize your job search.",
		icon: <FileText className="h-10 w-10 text-green-400 animate-spin-slow" />,
		href: "/cv-analyzer",
		color: "from-green-500 to-teal-500",
	},
]

export default function ChooseAIExperiencePage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 animate-gradient-x">
			<div className="mb-8 animate-fade-in-down">
				<Image
					src="/theworkapp-logo.png"
					alt="TheWorkapp Logo"
					width={220}
					height={60}
					priority
				/>
			</div>
			<AdvancedGlass
				variant="card"
				blur="xl"
				opacity="high"
				className="p-12 max-w-2xl w-full shadow-2xl animate-fade-in"
			>
				<CinematicText
					variant="title"
					weight="semibold"
					className="text-white mb-4 text-center animate-fade-in-down"
				>
					What would you like to do today?
				</CinematicText>
				<CinematicText className="text-blue-200 text-lg mb-10 text-center animate-fade-in-up">
					Choose your AI-powered experience and start your journey to career
					mastery.
				</CinematicText>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{experiences.map((exp, idx) => (
						<Link href={exp.href} key={exp.title} className="group">
							<div
								className={`relative bg-gradient-to-br ${exp.color} rounded-2xl p-8 flex flex-col items-center justify-between shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-float-${idx + 1}`}
							>
								<div className="absolute -top-6 left-1/2 -translate-x-1/2">
									<div className="rounded-full bg-white/10 p-4 shadow-lg border border-white/20">
										{exp.icon}
									</div>
								</div>
								<div className="mt-10 mb-4 text-center">
									<CinematicText
										variant="subtitle"
										weight="semibold"
										className="text-white mb-2"
									>
										{exp.title}
									</CinematicText>
									<CinematicText className="text-blue-100 text-sm">
										{exp.description}
									</CinematicText>
								</div>
								<PremiumButton
									variant="primary"
									size="md"
									className="mt-4 group-hover:scale-110 transition-transform"
								>
									Start{" "}
									<ArrowRight className="ml-2 h-4 w-4" />
								</PremiumButton>
								<div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-glow" />
							</div>
						</Link>
					))}
				</div>
			</AdvancedGlass>
			<style jsx global>{`
				@keyframes gradient-x {
					0%,
					100% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
				}
				.animate-gradient-x {
					background-size: 200% 200%;
					animation: gradient-x 10s ease-in-out infinite;
				}
				.animate-fade-in {
					animation: fadeIn 1s both;
				}
				.animate-fade-in-down {
					animation: fadeInDown 1s both;
				}
				.animate-fade-in-up {
					animation: fadeInUp 1s both;
				}
				.animate-float-1 {
					animation: float 3s ease-in-out infinite;
				}
				.animate-float-2 {
					animation: float 4s ease-in-out infinite;
				}
				.animate-float-3 {
					animation: float 5s ease-in-out infinite;
				}
				.animate-spin-slow {
					animation: spin 4s linear infinite;
				}
				.animate-glow {
					animation: glow 2s alternate infinite;
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				@keyframes fadeInDown {
					from {
						opacity: 0;
						transform: translateY(-20px);
					}
					to {
						opacity: 1;
						transform: none;
					}
				}
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: none;
					}
				}
				@keyframes float {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-10px);
					}
				}
				@keyframes spin {
					100% {
						transform: rotate(360deg);
					}
				}
				@keyframes glow {
					0% {
						box-shadow: 0 0 10px 2px #fff3;
					}
					100% {
						box-shadow: 0 0 30px 8px #fff6;
					}
				}
			`}</style>
		</div>
	)
}
