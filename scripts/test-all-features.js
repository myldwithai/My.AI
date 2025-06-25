// Comprehensive test script for all chatbot features
console.log("🧪 Testing MY.AI Chatbot Features...")

// Test 1: Environment Variables
console.log("\n1️⃣ Testing Environment Variables:")
const envVars = {
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  XAI_API_KEY: process.env.XAI_API_KEY,
}

Object.entries(envVars).forEach(([key, value]) => {
  if (value) {
    console.log(`✅ ${key}: ${value.substring(0, 10)}...`)
  } else {
    console.log(`❌ ${key}: Not set`)
  }
})

// Test 2: AI SDK Imports
console.log("\n2️⃣ Testing AI SDK Imports:")
try {
  const { groq } = require("@ai-sdk/groq")
  const { google } = require("@ai-sdk/google")
  const { xai } = require("@ai-sdk/xai")
  const { streamText, generateText } = require("ai")
  console.log("✅ All AI SDK packages imported successfully")
} catch (error) {
  console.log("❌ AI SDK import error:", error.message)
}

// Test 3: Provider Models
console.log("\n3️⃣ Testing Provider Models:")
const providers = [
  { name: "Groq", model: "llama-3.1-8b-instant" },
  { name: "Gemini", model: "gemini-1.5-flash" },
  { name: "xAI", model: "grok-3" },
]

providers.forEach((provider) => {
  console.log(`📡 ${provider.name}: ${provider.model}`)
})

console.log("\n🎉 Feature test completed!")
