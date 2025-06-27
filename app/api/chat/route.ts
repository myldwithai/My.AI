import Groq from "groq-sdk"
import { buildCvAgent, cvPromptTemplate } from "@/lib/langchain-cv-agent"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Extract the messages, provider, custom API keys, and cvText from the body
    const { messages, provider = "groq", apiKeys = {}, cvText } = await req.json()

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
    let isGroq = false
    switch (provider) {
      case "groq":
        apiKey = apiKeys.groq || process.env.GROQ_API_KEY
        if (!apiKey) throw new Error("Groq API key is required")
        model = new Groq({ apiKey })
        isGroq = true
        break
      case "gemini":
        apiKey = apiKeys.gemini || process.env.GEMINI_API_KEY
        if (!apiKey) throw new Error("Gemini API key is required")
        // TODO: Add Gemini model integration here
        break
      case "xai":
        apiKey = apiKeys.xai || process.env.XAI_API_KEY
        if (!apiKey) throw new Error("xAI API key is required")
        // TODO: Add xAI model integration here
        break
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }

    console.log(`🔑 API key found: ${apiKey ? "Yes" : "No"}`)

    // If cvText is provided, use Langchain agent for CV analysis
    if (cvText) {
      const agent = await buildCvAgent(model)
      const prompt = await cvPromptTemplate.format({ cvText })
      const result = await agent.call({ input: prompt })
      // --- LLM Output Mapping ---
      // The LLM result should be a structured object like:
      // {
      //   overallScore: number,
      //   sections: [{ name, score, feedback, suggestions, status }],
      //   keywords: { found: string[], missing: string[], suggestions: string[] },
      //   atsCompatibility: number,
      //   recommendations: string[]
      // }
      // For now, we mock the mapping:
      const mapped: any = {
        overallScore: result.overallScore || 0, // LLM should return this
        sections: result.sections || [], // LLM should return this
        keywords: result.keywords || { found: [], missing: [], suggestions: [] },
        atsCompatibility: result.atsCompatibility || 0, // LLM should return this
        recommendations: result.recommendations || [result.output || JSON.stringify(result)],
      }
      // --- End LLM Output Mapping ---
      // --- Mocked UI Results Example ---
      // See components/cv-analyzer.tsx for the expected structure
      // ---
      return new Response(JSON.stringify({ result: mapped }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
    // --- Direct Groq SDK call for chat completions ---
    if (isGroq && model) {
      const groqRes = await model.chat.completions.create({
        model: "llama-3-8b-8192",
        messages,
        stream: false,
      })
      const content = groqRes.choices?.[0]?.message?.content || ""
      return new Response(
        JSON.stringify({ result: { output: content } }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }
    // --- Add other provider logic here as needed ---
    throw new Error("Provider not implemented for chat completions.")
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
