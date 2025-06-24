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

    // Select the appropriate model based on provider
    let model
    switch (provider) {
      case "groq":
        model = groq("llama-3.1-8b-instant", {
          apiKey: apiKeys.groq || process.env.GROQ_API_KEY,
        })
        break
      case "gemini":
        model = google("gemini-1.5-flash", {
          apiKey: apiKeys.gemini || process.env.GEMINI_API_KEY,
        })
        break
      case "xai":
        model = xai("grok-3", {
          apiKey: apiKeys.xai || process.env.XAI_API_KEY,
        })
        break
      default:
        model = groq("llama-3.1-8b-instant", {
          apiKey: apiKeys.groq || process.env.GROQ_API_KEY,
        })
    }

    // Call the language model
    const result = streamText({
      model,
      messages,
      system: `You are a helpful AI assistant powered by ${provider.toUpperCase()}. Be concise and friendly in your responses.`,
    })

    // Respond with the stream
    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)

    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    if (errorMessage.includes("API key") || errorMessage.includes("authentication")) {
      return new Response(
        JSON.stringify({
          error: "Invalid or missing API key. Please check your API key settings.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
