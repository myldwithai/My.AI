"use client"

import { useState } from "react"
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
} from "lucide-react"
import Image from "next/image"

interface ModernLandingProps {
  onGetStarted: () => void
}

export function ModernLanding({ onGetStarted }: ModernLandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("professional")

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Adaptive learning paths that adjust to each employee's pace, learning style, and skill gaps.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track progress, measure ROI, and identify skill gaps with comprehensive learning analytics.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Foster peer-to-peer learning with discussion forums, group projects, and knowledge sharing.",
    },
    {
      icon: Target,
      title: "Skills Assessment",
      description: "Automated skill evaluations and competency mapping to identify development opportunities.",
    },
    {
      icon: Zap,
      title: "Microlearning Modules",
      description: "Bite-sized learning content that fits into busy schedules and maximizes retention.",
    },
    {
      icon: Award,
      title: "Certification Tracking",
      description: "Manage certifications, compliance training, and professional development requirements.",
    },
  ]

  const guarantees = [
    {
      number: "01",
      title: "30-Day Results Guarantee",
      description:
        "See measurable improvements in employee engagement and skill development within 30 days, or get your money back.",
    },
    {
      number: "02",
      title: "50% Cost Reduction",
      description:
        "Reduce your training costs by at least 50% compared to traditional learning methods while improving outcomes.",
    },
    {
      number: "03",
      title: "24/7 Expert Support",
      description:
        "Get dedicated support from our learning specialists to ensure successful implementation and adoption.",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$49",
      period: "/month",
      description: "Perfect for small teams getting started with AI-powered learning",
      features: [
        "Up to 25 users",
        "Basic AI personalization",
        "Core learning modules",
        "Email support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "$99",
      period: "/month",
      description: "Ideal for growing companies serious about employee development",
      features: [
        "Up to 100 users",
        "Advanced AI personalization",
        "Full learning library",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for large organizations with complex needs",
      features: [
        "Unlimited users",
        "Custom AI models",
        "White-label solution",
        "Dedicated success manager",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
      ],
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full flex items-center justify-center py-8">
        <Image src="/theworkapp-logo-blue----.jpg" alt="TheWorkapp Logo" width={180} height={48} priority />
      </header>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold text-gray-900">LearnAI</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Pricing
              </a>
              <a
                href="#case-studies"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Case Studies
              </a>
              <a
                href="#about"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <button
                onClick={onGetStarted}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                  Features
                </a>
                <a href="#pricing" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
                <a
                  href="#case-studies"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900"
                >
                  Case Studies
                </a>
                <a href="#about" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a href="#contact" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900">
                  Contact
                </a>
                <button
                  onClick={onGetStarted}
                  className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium transition-colors mt-4"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Team's Learning with <span className="text-blue-600">AI-Powered Development</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The first AI-driven learning platform designed specifically for modern workforce development starting at
                just <span className="font-semibold text-blue-600">$99/month</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={onGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
                  Watch Demo
                </button>
              </div>
              <p className="text-sm text-gray-500">No setup fees. Cancel anytime. See results in 30 days or less.</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">AI Learning Assistant</h3>
                      <p className="text-sm text-gray-500">Personalized for Sarah M.</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        📊 Your leadership skills have improved by 23% this month!
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-sm text-blue-700">🎯 Next recommended module: "Strategic Decision Making"</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-sm text-green-700">✅ Completed: Advanced Communication Techniques</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Half the Cost, <span className="text-blue-600">Double the Results</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Traditional corporate training is expensive, time-consuming, and often ineffective. Our AI-powered platform
            delivers personalized learning experiences that drive real business results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50%</div>
              <div className="text-gray-600">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2x</div>
              <div className="text-gray-600">Faster Learning</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
              <div className="text-gray-600">Employee Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Learning</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, deliver, and track effective learning experiences for your team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Commitment to Your Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're so confident in our platform that we back it with these guarantees.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-blue-100 mb-4">{guarantee.number}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{guarantee.title}</h3>
                <p className="text-gray-600 leading-relaxed">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your team size and needs. All plans include our core AI features.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow relative ${
                  plan.popular ? "ring-2 ring-blue-600" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onGetStarted}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Team's Learning?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get in touch with our team to learn how LearnAI can help your organization achieve better learning
                outcomes.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">hello@learnai.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-gray-700">San Francisco, CA</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Tell us about your learning needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">LearnAI</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming workforce development with AI-powered learning solutions.
              </p>
              <div className="flex space-x-4">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 LearnAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
