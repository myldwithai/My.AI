"use client"

import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Brain,
  Target,
  Linkedin,
  Twitter,
  Facebook,
  TrendingUp,
  Compass,
  MessageCircle,
  Sparkles,
  BookOpen,
} from "lucide-react"
import Image from "next/image"

interface TheWorkappLandingProps {
  onGetStarted: () => void
}

export function TheWorkappLanding({ onGetStarted }: TheWorkappLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const [pricingToggle, setPricingToggle] = useState("monthly")
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Update active section based on scroll position
      const sections = [
        { id: "hero", ref: heroRef },
        { id: "features", ref: featuresRef },
        { id: "pricing", ref: pricingRef },
      ]

      const current = sections.find((section) => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const valueProps = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Uncover your true potential with personalized analysis",
    },
    {
      icon: MessageCircle,
      title: "Masterful Communication",
      description: "Turn conflict into collaboration with proven techniques",
    },
    {
      icon: Target,
      title: "Intelligent Job Matching",
      description: "Find where you truly belong in the MENA market",
    },
  ]

  const transformationSteps = [
    {
      number: "01",
      title: "Discover Your Core",
      description:
        "Take our rapid, AI-enhanced assessments based on MBTI & TKI frameworks to understand your personality and conflict style.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Activate Your AI Co-Pilot",
      description:
        "Receive your personalized growth plan with targeted learning modules, communication strategies, and career moves.",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Achieve & Excel",
      description:
        "Apply real-world insights to enhance communication, optimize job search, and accelerate professional development.",
      icon: TrendingUp,
    },
  ]

  const beforeAfter = [
    {
      before: {
        icon: "😵‍💫",
        title: "Career Confusion",
        description: "Unsure of your next move or true strengths",
      },
      after: {
        icon: "🧭",
        title: "Clarity & Direction",
        description: "A personalized, AI-driven roadmap for your career",
      },
    },
    {
      before: {
        icon: "📄",
        title: "CV in a Black Hole",
        description: "Sending applications with no response",
      },
      after: {
        icon: "✨",
        title: "A Standout Profile",
        description: "Craft a CV that beats the bots and gets you noticed",
      },
    },
    {
      before: {
        icon: "😬",
        title: "Difficult Conversations",
        description: "Avoiding conflict, hindering teamwork",
      },
      after: {
        icon: "🤝",
        title: "Confident Communication",
        description: "Master any interaction with proven techniques",
      },
    },
    {
      before: {
        icon: "📚",
        title: "Generic Advice",
        description: "One-size-fits-all tips that don't fit you",
      },
      after: {
        icon: "💡",
        title: "Personalized Growth",
        description: "AI-curated learning that adapts to your unique needs",
      },
    },
  ]

  const pricingPlans = [
    {
      name: "Explorer",
      price: "EGP 0",
      period: "",
      description: "Getting started with AI-powered self-discovery",
      features: [
        "Mini Personality Assessment",
        "Introduction to Conflict Resolution",
        "10 AI Chat Queries/month",
        "Sample Learning Content",
        "Basic CV Template",
      ],
      popular: false,
      cta: "Start My Free Trial",
    },
    {
      name: "Navigator",
      price: pricingToggle === "monthly" ? "EGP 200" : "EGP 2000",
      period: pricingToggle === "monthly" ? "/month" : "/year",
      originalPrice: pricingToggle === "annual" ? "EGP 2400" : null,
      description: "Individuals committed to accelerating their career growth",
      features: [
        "Everything in Explorer, plus:",
        "Full, In-Depth MBTI & TKI Assessments",
        "Core AI Co-Pilot: Personalized Learning Paths",
        "150 AI Chat Queries/month",
        "Advanced AI CV Analysis (5 versions/month)",
        "Intelligent Job Matching (20 matches/month)",
        "Ad-Free Experience & Standard Support",
      ],
      popular: true,
      cta: "Upgrade to Navigator",
    },
    {
      name: "Catalyst",
      price: "Custom",
      period: "pricing",
      description: "Organizations investing in their team's collective potential",
      features: [
        "Everything in Navigator, plus:",
        "Centralized Team Management Dashboard",
        "Bulk Licensing for All Assessments",
        "Unlimited AI Interactions",
        "Customizable Team-Based Learning Paths",
        "Advanced Performance Analytics",
        "Dedicated Account Management",
      ],
      popular: false,
      cta: "Request a Demo",
    },
  ]

  const testimonials = [
    {
      quote:
        "TheWorkapp gave me the clarity I was missing. The AI job match found me a role I wouldn't have discovered on my own. It's a game-changer for the Egyptian job market.",
      author: "A. Hassan",
      role: "Marketing Manager",
      initial: "AH",
    },
    {
      quote:
        "The communication insights transformed how I handle difficult conversations. My team performance improved dramatically within weeks.",
      author: "S. Mohamed",
      role: "Team Lead",
      initial: "SM",
    },
    {
      quote:
        "Finally, career advice that actually understands the MENA market. The AI recommendations are spot-on and actionable.",
      author: "L. Al-Rashid",
      role: "Software Engineer",
      initial: "LR",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full flex items-center justify-center py-8">
        <Image src="/theworkapp-logo.png" alt="TheWorkapp Logo" width={200} height={56} priority />
      </header>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
        {/* Parallax Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              background: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(147, 197, 253, 0.2) 0%, transparent 50%)`,
            }}
          />

          {/* Neural Network Animation */}
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10"
            style={{
              transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
              background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 2px, transparent 2px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div
            className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{
              transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * -0.1}deg)`,
              background: "linear-gradient(45deg, rgba(147, 197, 253, 0.3), transparent)",
            }}
          />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
          <div
            className="backdrop-blur-xl border-b border-white/10"
            style={{
              backgroundColor: `rgba(15, 23, 42, ${Math.min(scrollY / 100, 0.95)})`,
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <span className="ml-3 text-xl font-bold text-white">TheWorkapp</span>
                  </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                  {["features", "how-it-works", "pricing", "testimonials", "contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`px-3 py-2 text-sm font-medium transition-colors capitalize ${
                        activeSection === item
                          ? "text-white border-b-2 border-blue-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {item.replace("-", " ")}
                    </button>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden md:flex items-center">
                  <button
                    onClick={onGetStarted}
                    className="group relative px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-blue-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Start My Free Trial</span>
                  </button>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-gray-300 hover:text-white p-2"
                  >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              {mobileMenuOpen && (
                <div className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-xl">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {["features", "how-it-works", "pricing", "testimonials", "contact"].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          scrollToSection(item)
                          setMobileMenuOpen(false)
                        }}
                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white capitalize"
                      >
                        {item.replace("-", " ")}
                      </button>
                    ))}
                    <button
                      onClick={onGetStarted}
                      className="w-full text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-2 rounded-xl font-medium transition-colors mt-4"
                    >
                      Start My Free Trial
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.1) 50%, transparent 70%)`,
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className="space-y-8"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                }}
              >
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Stop Guessing.{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Start Growing.
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                  Your AI Co-Pilot for Career Growth. Get personalized, science-backed guidance to master communication,
                  land your dream job, and build the future you deserve.
                </p>

                {/* Value Props */}
                <div className="grid grid-cols-1 gap-4">
                  {valueProps.map((prop, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl backdrop-blur-sm border border-blue-400/20 flex items-center justify-center">
                        <prop.icon className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{prop.title}</h3>
                        <p className="text-gray-400 text-sm">{prop.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={onGetStarted}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-blue-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center justify-center">
                      Start My Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <button className="group px-8 py-4 border border-blue-400/30 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm">
                    Compare Plans
                  </button>
                </div>
              </div>

              <div
                className="relative"
                style={{
                  transform: `translateY(${scrollY * -0.1}px)`,
                }}
              >
                {/* AI Interface Mockup */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-3xl backdrop-blur-xl border border-blue-400/20 transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                  <div className="relative bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-3xl backdrop-blur-xl border border-blue-400/20 p-8 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500">
                    <div className="bg-slate-900/40 rounded-2xl p-6 backdrop-blur-sm border border-blue-400/10">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                          <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-semibold text-white text-lg">AI Career Co-Pilot</h3>
                          <p className="text-sm text-blue-300">Personalized for Ahmed K.</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-blue-500/10 rounded-xl p-4 backdrop-blur-sm border border-blue-400/20">
                          <p className="text-sm text-white">🎯 Your communication style: Collaborative Leader</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-xl p-4 backdrop-blur-sm border border-blue-400/20">
                          <p className="text-sm text-white">💼 3 perfect job matches found in Cairo</p>
                        </div>
                        <div className="bg-blue-500/10 rounded-xl p-4 backdrop-blur-sm border border-blue-400/20">
                          <p className="text-sm text-white">📈 Career growth plan: 85% complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">
                The Old Way is Broken.{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  There's a Smarter Path.
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* The Old Way */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-red-400 mb-8">The Old Way (The Struggle)</h3>
                {beforeAfter.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-2xl backdrop-blur-xl border border-red-400/20 p-6 hover:scale-105 transition-all duration-300"
                    style={{
                      transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{item.before.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white text-lg mb-2">{item.before.title}</h4>
                        <p className="text-gray-300">{item.before.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* The New Way */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-blue-400 mb-8">The New Way (TheWorkapp)</h3>
                {beforeAfter.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl backdrop-blur-xl border border-blue-400/20 p-6 hover:scale-105 transition-all duration-300"
                    style={{
                      transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                    }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{item.after.icon}</div>
                      <div>
                        <h4 className="font-semibold text-white text-lg mb-2">{item.after.title}</h4>
                        <p className="text-gray-300">{item.after.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Your Transformation in 3 Simple Steps</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                From self-discovery to career mastery, your AI co-pilot guides you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {transformationSteps.map((step, index) => (
                <div
                  key={index}
                  className="text-center group"
                  style={{
                    transform: `translateY(${scrollY * 0.03 * (index + 1)}px)`,
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-3xl backdrop-blur-xl border border-blue-400/20 p-8 hover:scale-105 transition-all duration-500">
                    <div className="text-8xl font-bold text-blue-400/30 mb-6 group-hover:text-blue-400/50 transition-colors">
                      {step.number}
                    </div>
                    <step.icon className="h-16 w-16 text-blue-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} id="pricing" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Choose Your Path</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
                Start your journey with our free tier, or accelerate your growth with personalized AI guidance.
              </p>

              {/* Pricing Toggle */}
              <div className="flex items-center justify-center space-x-4 mb-12">
                <span className={`text-lg ${pricingToggle === "monthly" ? "text-white" : "text-gray-400"}`}>Monthly</span>
                <button
                  onClick={() => setPricingToggle(pricingToggle === "monthly" ? "annual" : "monthly")}
                  className="relative w-16 h-8 bg-gray-600 rounded-full transition-colors duration-300 focus:outline-none"
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-blue-500 rounded-full transition-transform duration-300 ${
                      pricingToggle === "annual" ? "translate-x-9" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className={`text-lg ${pricingToggle === "annual" ? "text-white" : "text-gray-400"}`}>
                  Annually
                  {pricingToggle === "annual" && (
                    <span className="ml-2 text-sm text-blue-400 font-semibold">(Save 17% - 2 Months Free)</span>
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                  }}
                >
                  <div
                    className={`h-full bg-gradient-to-br backdrop-blur-xl border transition-all duration-500 p-8 hover:scale-105 rounded-3xl ${
                      plan.popular
                        ? "from-blue-500/20 to-blue-600/10 border-blue-400/30 from-blue-500/15 to-blue-600/10"
                        : "from-blue-500/5 to-blue-600/5 border-blue-400/20 hover:border-blue-400/30"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-300 text-lg">{plan.period}</span>
                        {plan.originalPrice && (
                          <div className="text-sm text-gray-400 line-through mt-1">{plan.originalPrice}</div>
                        )}
                      </div>
                      <p className="text-gray-300 leading-relaxed">{plan.description}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={onGetStarted}
                      className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-400 hover:to-blue-500 shadow-lg shadow-blue-500/25"
                          : "bg-blue-500/10 text-white hover:bg-blue-500/20 border border-blue-400/30"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science & Trust Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                  Grounded in Science,{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    Powered by AI
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-8">
                  We've merged decades of proven psychological research—including the frameworks of the Myers-Briggs Type
                  Indicator (MBTI) and the Thomas-Kilmann Instrument (TKI)—with the power of cutting-edge AI.
                </p>
                <p className="text-lg text-gray-400">
                  This isn't just tech; it's a smarter, more insightful way to grow your career in the MENA region.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl backdrop-blur-xl border border-blue-400/20 p-6 text-center">
                  <BookOpen className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">Psychology</h3>
                  <p className="text-gray-300 text-sm">MBTI & TKI Frameworks</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl backdrop-blur-xl border border-blue-400/20 p-6 text-center">
                  <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="font-semibold text-white mb-2">AI Technology</h3>
                  <p className="text-gray-300 text-sm">Personalized Insights</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">What Our Users Say</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Real stories from professionals who transformed their careers with TheWorkapp.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="group"
                  style={{
                    transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                  }}
                >
                  <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl backdrop-blur-xl border border-blue-400/20 p-8 hover:scale-105 hover:from-blue-500/15 hover:to-blue-600/10 transition-all duration-500 h-full">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.initial}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold text-white">{testimonial.author}</h4>
                        <p className="text-blue-300 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to Build Your Future?</h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed">
              Your career co-pilot is waiting. Start your journey with TheWorkapp today and gain an unfair advantage in
              your professional life.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={onGetStarted}
                className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold text-xl transition-all duration-300 hover:scale-105 overflow-hidden shadow-lg shadow-blue-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center justify-center">
                  Start My Free Trial and Get My AI Insights
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button className="px-12 py-6 border border-blue-400/30 text-white rounded-xl font-semibold text-xl transition-all duration-300 hover:bg-blue-500/10 backdrop-blur-sm">
                See All Features
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="bg-gradient-to-t from-blue-900/20 to-transparent py-16 border-t border-blue-400/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <span className="ml-3 text-xl font-bold text-white">TheWorkapp</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Your AI co-pilot for career growth in the MENA region. Science-backed, AI-powered professional
                  development.
                </p>
                <div className="flex space-x-4">
                  {[Linkedin, Twitter, Facebook].map((Icon, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-colors cursor-pointer border border-blue-400/20"
                    >
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>

              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "AI Assessments", "Job Matching", "Communication Tools"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Press", "Contact", "Blog"],
                },
                {
                  title: "Support",
                  links: ["Help Center", "Documentation", "Community", "Privacy Policy", "Terms of Service"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-white mb-6">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-blue-400/20 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                &copy; 2024 TheWorkapp. All rights reserved. Empowering careers across the MENA region.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
