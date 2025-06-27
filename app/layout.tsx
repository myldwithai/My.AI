import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TheWorkapp - Your AI Co-Pilot for Career Growth",
  description:
    "Stop guessing, start growing. Get personalized, science-backed guidance to master communication, land your dream job, and build the future you deserve in the MENA region.",
  keywords: [
    "AI career coach",
    "MENA jobs",
    "CV analyzer",
    "personality assessment",
    "MBTI",
    "career development",
    "communication skills",
    "job matching",
    "professional growth",
    "Middle East careers",
  ],
  authors: [{ name: "TheWorkapp Team" }],
  creator: "TheWorkapp",
  publisher: "TheWorkapp",
  openGraph: {
    title: "TheWorkapp - Your AI Co-Pilot for Career Growth",
    description:
      "Stop guessing, start growing. Get personalized, science-backed guidance to master communication, land your dream job, and build the future you deserve in the MENA region.",
    type: "website",
    locale: "en_US",
    siteName: "TheWorkapp",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheWorkapp - Your AI Co-Pilot for Career Growth",
    description:
      "Stop guessing, start growing. Get personalized, science-backed guidance to master communication, land your dream job, and build the future you deserve in the MENA region.",
    creator: "@theworkapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
