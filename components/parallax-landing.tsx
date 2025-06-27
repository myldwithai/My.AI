"use client"

import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ArrowRight,
  Check,
  Users,
  Zap,
  Brain,
  Target,
  Award,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Star,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react"

interface ParallaxLandingProps {
  onGetStarted: () => void
}

export function ParallaxLanding({ onGetStarted }: ParallaxLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
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

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description:
        "Adaptive learning paths that adjust to each employee's pace, learning style, and skill gaps in real-time.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Deep insights into learning progress, engagement metrics, and ROI measurement with predictive analytics.",
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Foster team knowledge sharing with AI-moderated discussions, peer reviews, and group challenges.",
    },
    {
      icon: Target,
      title: "Skills Assessment",
      description:
        "Comprehensive competency mapping and automated skill gap analysis with personalized recommendations.",
    },
    {
      icon: Zap,
      title: "Microlearning Engine",
      description: "Intelligent content delivery in digestible formats optimized for maximum retention and engagement.",
    },
    {
      icon: Award,
      title: "Certification Management",
      description: "Automated compliance tracking, certification renewals, and professional development pathways.",
    },
  ]

  const guarantees = [
    {
      number: "01",
      title: "30-Day Results Guarantee",
      description:
        "See measurable improvements in employee engagement and skill development within 30 days, or receive a full refund.",
      icon: Clock,
    },
    {
      number: "02",
      title: "50% Cost Reduction",
      description:
        "Reduce your training costs by at least 50% compared to traditional methods while achieving superior outcomes.",
      icon: TrendingUp,
    },
    {
      number: "03",
      title: "Enterprise Security",
      description: "Bank-level security with SOC 2 compliance, GDPR adherence, and 99.9% uptime SLA guarantee.",
      icon: Shield,
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small teams beginning their AI learning journey",
      features: [
        "Up to 25 users",
        "Basic AI personalization",
        "Core learning modules",
        "Email support",
        "Basic analytics dashboard",
        "Mobile app access",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "Comprehensive solution for growing organizations",
      features: [
        "Up to 100 users",
        "Advanced AI personalization",
        "Full learning library",
        "Priority support",
        "Advanced analytics & reporting",
        "Custom branding",
        "API access",
        "Integration support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for large-scale implementations",
      features: [
        "Unlimited users",
        "Custom AI models",
        "White-label solution",
        "Dedicated success manager",
        "Custom integrations",
        "Advanced security features",
        "SLA guarantee",
        "On-premise deployment",
      ],
      popular: false,
    },
  ]

  const useCases = [
    {
      title: "Sales Teams",
      description: "Accelerate onboarding and continuous skill development",
      metrics: "40% faster ramp-up time",
    },
    {
      title: "Engineering",
      description: "Keep technical skills current with emerging technologies",
      metrics: "60% improvement in code quality",
    },
    {
      title: "Customer Success",
      description: "Enhance customer interaction and problem-solving skills",
      metrics: "35% increase in satisfaction scores",
    },
    {
      title: "Leadership",
      description: "Develop management capabilities and strategic thinking",
      metrics: "50% better team performance",
    },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            background: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
            background: "linear-gradient(45deg, white, transparent)",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-5"
          style={{
            transform: `translateY(${scrollY * -0.2}px) rotate(${scrollY * -0.1}deg)`,
            background: "linear-gradient(-45deg, white, transparent)",
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div
          className="backdrop-blur-xl border-b border-white/10"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${Math.min(scrollY / 100, 0.9)})`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-black" />
                  </div>
                  <span className="ml-3 text-xl font-bold text-white">LearnAI</span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                {["features", "pricing", "case-studies", "about", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 text-sm font-medium transition-colors capitalize ${
                      activeSection === item ? "text-white border-b-2 border-white" : "text-gray-300 hover:text-white"
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
                  className="group relative px-6 py-2 bg-white text-black rounded-lg font-medium transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative">Get Started</span>
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
              <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {["features", "pricing", "case-studies", "about", "contact"].map((item) => (
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
                    className="w-full text-left bg-white text-black px-3 py-2 rounded-lg font-medium transition-colors mt-4"
                  >
                    Get Started
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
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)`,
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
                Transform Your Team's{" "}
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Learning</span>{" "}
                with AI-Powered Development
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
                The first AI-driven learning platform designed specifically for modern workforce development starting at
                just <span className="font-semibold text-white">$99/month</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="group relative px-8 py-4 bg-white text-black rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative flex items-center justify-center">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button className="group px-8 py-4 border border-white/20 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/5 backdrop-blur-sm">
                  Watch Demo
                </button>
              </div>

              <p className="text-sm text-gray-400">No setup fees. Cancel anytime. See results in 30 days or less.</p>
            </div>

            <div
              className="relative"
              style={{
                transform: `translateY(${scrollY * -0.1}px)`,
              }}
            >
              {/* Glassmorphism Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 p-8 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500">
                  <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                        <Brain className="h-6 w-6 text-black" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold text-white text-lg">AI Learning Assistant</h3>
                        <p className="text-sm text-gray-300">Personalized for Sarah M.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                        <p className="text-sm text-white">📊 Your leadership skills have improved by 23% this month!</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                        <p className="text-sm text-white">🎯 Next recommended: "Strategic Decision Making"</p>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10">
                        <p className="text-sm text-white">✅ Completed: Advanced Communication Techniques</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-32 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            background: "radial-gradient(circle at center, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold mb-8">
            Half the Cost,{" "}
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Double the Results
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-16 leading-relaxed">
            Traditional corporate training is expensive, time-consuming, and often ineffective. Our AI-powered platform
            delivers personalized learning experiences that drive measurable business results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { value: "50%", label: "Cost Reduction", icon: TrendingUp },
              { value: "2x", label: "Faster Learning", icon: Zap },
              { value: "85%", label: "Employee Satisfaction", icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className="group"
                style={{
                  transform: `translateY(${scrollY * 0.05 * (index + 1)}px)`,
                }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 p-8 hover:scale-105 transition-all duration-300">
                  <stat.icon className="h-12 w-12 text-white mx-auto mb-4" />
                  <div className="text-5xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Powerful Features for Modern Learning</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create, deliver, and track effective learning experiences that drive real business
              outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group"
                style={{
                  transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                }}
              >
                <div className="h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 p-8 hover:scale-105 hover:from-white/15 hover:to-white/10 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Our Commitment to Your Success</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're so confident in our platform that we back it with these ironclad guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {guarantees.map((guarantee, index) => (
              <div
                key={index}
                className="text-center group"
                style={{
                  transform: `translateY(${scrollY * 0.03 * (index + 1)}px)`,
                }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 p-8 hover:scale-105 transition-all duration-500">
                  <div className="text-8xl font-bold text-white/20 mb-6 group-hover:text-white/30 transition-colors">
                    {guarantee.number}
                  </div>
                  <guarantee.icon className="h-12 w-12 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">{guarantee.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{guarantee.description}</p>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose the plan that fits your team size and needs. All plans include our core AI features and dedicated
              support.
            </p>
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
                  className={`h-full bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border transition-all duration-500 p-8 hover:scale-105 ${
                    plan.popular ? "border-white/30 from-white/15 to-white/10" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-300 text-lg">{plan.period}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onGetStarted}
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="case-studies" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Proven Results Across Industries</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See how teams across different functions are achieving breakthrough results with our AI-powered learning
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group"
                style={{
                  transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                }}
              >
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/10 p-8 hover:scale-105 hover:from-white/15 hover:to-white/10 transition-all duration-500">
                  <h3 className="text-2xl font-semibold text-white mb-4">{useCase.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{useCase.description}</p>
                  <div className="text-lg font-semibold text-white">{useCase.metrics}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                Ready to Transform Your Team's Learning?
              </h2>
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Get in touch with our team to learn how LearnAI can help your organization achieve better learning
                outcomes and measurable business results.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Mail, text: "hello@learnai.com" },
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MapPin, text: "San Francisco, CA" },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mr-4">
                      <contact.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-300 text-lg">{contact.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-xl border border-white/10 p-8">
              <form className="space-y-6">
                {[
                  { label: "Name", type: "text", placeholder: "Your full name" },
                  { label: "Email", type: "email", placeholder: "your@email.com" },
                  { label: "Company", type: "text", placeholder: "Your company name" },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-white mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm resize-none"
                    placeholder="Tell us about your learning needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gradient-to-t from-white/5 to-transparent py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-black" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">LearnAI</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transforming workforce development with AI-powered learning solutions that deliver measurable results.
              </p>
              <div className="flex space-x-4">
                {[Linkedin, Twitter, Facebook].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Integrations", "Security"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Press", "Contact", "Blog"],
              },
              {
                title: "Support",
                links: ["Help Center", "Documentation", "Status", "Community", "Partners"],
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

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 LearnAI. All rights reserved. Built with ❤️ for the future of learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
