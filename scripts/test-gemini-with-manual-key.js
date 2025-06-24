// Test script with manual API key input
import { google } from "@ai-sdk/google"
import { generateText } from "ai"

async function testGeminiAPIWithManualKey() {
  try {
    console.log("Testing Gemini API with manual key...")

    // REPLACE THIS WITH YOUR ACTUAL API KEY
    const manualApiKey = "AIzaSyApdkiy13bL9X2Gf4zOX6bgfTAjANBh4i0" // ← Put your key here

    if (manualApiKey === "AIzaSyApdkiy13bL9X2Gf4zOX6bgfTAjANBh4i0") {
      console.error("❌ Please replace 'AIzaSyApdkiy13bL9X2Gf4zOX6bgfTAjANBh4i0' with your actual Gemini API key")
      console.log("🔗 Get your key from: https://makersuite.google.com/app/apikey")
      return
    }

    console.log("✅ Manual API Key provided:", manualApiKey.substring(0, 10) + "...")

    // Test API call with manual key
    const { text } = await generateText({
      model: google("gemini-1.5-flash", {
        apiKey: manualApiKey,
      }),
      prompt: "Say hello and confirm you're working!",
    })

    console.log("✅ Gemini API Response:", text)
    console.log("🎉 Gemini API is working perfectly!")
    console.log("💡 Now add this key as GEMINI_API_KEY environment variable")
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message)

    if (error.message.includes("API_KEY_INVALID")) {
      console.log("💡 Your API key might be invalid. Get a new one from Google AI Studio")
    }
  }
}

// Run the test
testGeminiAPIWithManualKey()
