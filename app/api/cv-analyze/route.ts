import { NextRequest, NextResponse } from "next/server"

// Replace with your actual xAI API endpoint and key
const XAI_API_URL = "https://api.xai.com/v1/cv/analyze"
const XAI_API_KEY = process.env.XAI_API_KEY

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Prepare request to xAI
    const xaiRes = await fetch(XAI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${XAI_API_KEY}`,
      },
      body: buffer,
    })

    if (!xaiRes.ok) {
      const err = await xaiRes.text()
      return NextResponse.json({ error: `xAI error: ${err}` }, { status: 502 })
    }

    const result = await xaiRes.json()
    // Defensive: always return a complete shape
    return NextResponse.json({
      overallScore: result.overallScore ?? 0,
      sections: result.sections ?? [],
      keywords: {
        found: result.keywords?.found ?? [],
        missing: result.keywords?.missing ?? [],
        suggestions: result.keywords?.suggestions ?? [],
      },
      atsCompatibility: result.atsCompatibility ?? 0,
      recommendations: result.recommendations ?? [],
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
