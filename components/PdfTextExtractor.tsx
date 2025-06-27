"use client"

import { useEffect } from "react"
import { PDFDocument } from "pdf-lib"

export default function PdfTextExtractor({ onExtract, file }: { onExtract: (cvText: string) => void, file: File }) {
  useEffect(() => {
    const extractText = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)
        let cvText = ""
        // pdf-lib does not support text extraction natively, so we fallback to page count only
        // You may use a web API or another library for full text extraction
        cvText = `[pdf-lib] Extracted ${pdfDoc.getPageCount()} pages. (pdf-lib does not support text extraction natively)`
        onExtract(cvText)
      } catch (err) {
        onExtract("")
      }
    }
    extractText()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file])
  return null
}
