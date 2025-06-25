import { groq } from "@ai-sdk/groq"
import { google } from "@ai-sdk/google"
import { xai } from "@ai-sdk/xai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Extract the messages, provider, and custom API keys from the body
    const { messages, provider = "groq", apiKeys = {} } = await req.json()

    console.log(`🤖 Using provider: ${provider}`)
    console.log(`📝 Messages count: ${messages?.length || 0}`)

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No messages provided",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Select the appropriate model based on provider
    let model
    let apiKey

    switch (provider) {
      case "groq":
        apiKey = apiKeys.groq || process.env.GROQ_API_KEY
        if (!apiKey) {
          throw new Error("Groq API key is required")
        }
        model = groq("llama-3.1-8b-instant", { apiKey })
        break

      case "gemini":
        apiKey = apiKeys.gemini || process.env.GEMINI_API_KEY
        if (!apiKey) {
          throw new Error("Gemini API key is required")
        }
        model = google("gemini-1.5-flash", { apiKey })
        break

      case "xai":
        apiKey = apiKeys.xai || process.env.XAI_API_KEY
        if (!apiKey) {
          throw new Error("xAI API key is required")
        }
        model = xai("grok-3", { apiKey })
        break

      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }

    console.log(`🔑 API key found: ${apiKey ? "Yes" : "No"}`)

    // Call the language model
    const result = streamText({
      model,
      messages,
      system: `You are a helpful AI assistant powered by ${provider.toUpperCase()}. Be concise, friendly, and informative in your responses. Provide clear and accurate information while maintaining a conversational tone.`,
    })

    console.log(`✅ Stream created successfully`)

    // Respond with the stream
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("❌ Chat API error:", error)

    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    if (errorMessage.includes("API key") || errorMessage.includes("authentication")) {
      return new Response(
        JSON.stringify({
          error: "Invalid or missing API key. Please check your API key settings.",
          details: errorMessage,
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    if (errorMessage.includes("quota") || errorMessage.includes("billing")) {
      return new Response(
        JSON.stringify({
          error: "API quota exceeded or billing issue. Please check your account.",
          details: errorMessage,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
