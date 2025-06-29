import { groq } from "@ai-sdk/groq"
import { google } from "@ai-sdk/google"
import { xai } from "@ai-sdk/xai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Extract the messages, provider, custom API keys, and systemMessage from the body
    const { messages, provider = "groq", apiKeys = {}, systemMessage } = await req.json()

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

    // Prepare messages array for AI
    let messagesForAI: any[] = []
    let useSystemInstruction = false
    let systemInstruction: string | undefined = undefined

    switch (provider) {
      case "groq":
      case "xai":
        if (systemMessage) {
          messagesForAI.push({ role: 'system', content: systemMessage })
        }
        messagesForAI = [...messagesForAI, ...messages]
        break
      case "gemini":
        // For Gemini, do NOT prepend system message; use systemInstruction param
        messagesForAI = [...messages]
        if (systemMessage) {
          useSystemInstruction = true
          systemInstruction = systemMessage
        }
        break
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }

    // Log the final messages array sent to the AI model
    console.log("Final messages array sent to AI model:", JSON.stringify(messagesForAI, null, 2))
    if (useSystemInstruction) {
      console.log("System instruction for Gemini:", systemInstruction)
    }

    // Select the appropriate model based on provider
    let model
    switch (provider) {
      case "groq":
        model = groq("llama-3.1-8b-instant")
        break
      case "gemini":
        model = google("gemini-1.5-flash")
        break
      case "xai":
        model = xai("grok-3")
        break
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }

    // Call the language model
    const result = streamText({
      model,
      messages: messagesForAI,
      ...(useSystemInstruction && systemInstruction ? { systemInstruction } : {}),
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
