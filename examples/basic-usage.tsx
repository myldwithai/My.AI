// Basic usage example
import { ChatbotEmbed } from "@/components/chatbot-embed"

export default function BasicExample() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">My App with AI Chatbot</h1>

      {/* Embed the chatbot */}
      <ChatbotEmbed width="100%" height="500px" className="border border-gray-200 rounded-lg" />
    </div>
  )
}
