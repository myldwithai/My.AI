// Test script to verify Gemini API key is working
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

async function testGeminiAPI() {
  try {
    console.log("Testing Gemini API...")

    // Check if API key exists
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY environment variable is not set")
      return
    }

    console.log("✅ API Key found:", apiKey.substring(0, 10) + "...")

    // Test API call
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: "Say hello and confirm you're working!",
    })

    console.log("✅ Gemini API Response:", text)
    console.log("🎉 Gemini API is working perfectly!")
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message)

    if (error.message.includes("API key")) {
      console.log("💡 Solution: Check your GEMINI_API_KEY in environment variables")
    }
  }
}

// Run the test
testGeminiAPI()
