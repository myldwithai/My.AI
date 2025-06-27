// Setup script for integrating MY.AI chatbot
import fs from "fs"

console.log("🤖 Setting up MY.AI Chatbot Integration...")

// Check if required directories exist
const requiredDirs = ["components", "app/api", "lib"]

requiredDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  } else {
    console.log(`📁 Directory exists: ${dir}`)
  }
})

// Check package.json for required dependencies
const packageJsonPath = "package.json"
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))

  const requiredDeps = {
    ai: "^3.0.0",
    "@ai-sdk/groq": "latest",
    "@ai-sdk/google": "latest",
    "@ai-sdk/xai": "latest",
    "lucide-react": "latest",
  }

  const missingDeps = []
  Object.entries(requiredDeps).forEach(([dep, version]) => {
    if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
      missingDeps.push(`${dep}@${version}`)
    }
  })

  if (missingDeps.length > 0) {
    console.log("📦 Missing dependencies:")
    missingDeps.forEach((dep) => console.log(`   - ${dep}`))
    console.log("\n💡 Run: npm install " + missingDeps.join(" "))
  } else {
    console.log("✅ All dependencies are installed")
  }
} else {
  console.log("❌ package.json not found")
}

// Check environment variables
const envPath = ".env.local"
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8")
  const requiredEnvVars = ["GROQ_API_KEY", "GEMINI_API_KEY", "XAI_API_KEY"]

  const missingEnvVars = requiredEnvVars.filter((envVar) => !envContent.includes(envVar))

  if (missingEnvVars.length > 0) {
    console.log("🔑 Missing environment variables:")
    missingEnvVars.forEach((envVar) => console.log(`   - ${envVar}`))
  } else {
    console.log("✅ All environment variables are set")
  }
} else {
  console.log("📝 Create .env.local with your API keys:")
  console.log("   GROQ_API_KEY=your_key_here")
  console.log("   GEMINI_API_KEY=your_key_here")
  console.log("   XAI_API_KEY=your_key_here")
}

console.log("\n🎉 Integration setup complete!")
console.log("📖 See integration-guide.md for detailed instructions")
