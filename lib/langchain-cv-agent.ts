import { initializeAgentExecutorWithOptions } from "langchain/agents"
import { PromptTemplate } from "@langchain/core/prompts"

// System instruction for the agent
const SYSTEM_INSTRUCTION = `You are a professional CV analyzer. Analyze the provided CV text and provide actionable feedback, section analysis, keyword suggestions, and recommendations for improvement. Be concise, clear, and helpful.`

// Prompt template for CV analysis
export const cvPromptTemplate = new PromptTemplate({
  inputVariables: ["cvText"],
  template: `${SYSTEM_INSTRUCTION}\n\nCV Content:\n{cvText}`,
})

// Example function to build an agent (expand as needed)
export async function buildCvAgent(llm: any) {
  // You can add tools or chains here if needed
  return await initializeAgentExecutorWithOptions([], llm, {
    agentType: "zero-shot-react-description",
    verbose: false,
  })
}
