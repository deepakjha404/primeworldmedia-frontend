"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, X, Loader2 } from "lucide-react"

interface PDFUploadProps {
  onUploadComplete: (pdfUrl: string) => void
  currentPdfUrl?: string
}

export function PDFUpload({ onUploadComplete, currentPdfUrl }: PDFUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState("")
  const [pdfUrl, setPdfUrl] = useState(currentPdfUrl || "")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const pdfFile = files.find((file) => file.type === "application/pdf")

    if (pdfFile) {
      handleFileUpload(pdfFile)
    } else {
      setError("Please upload a PDF file")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      handleFileUpload(file)
    } else {
      setError("Please select a PDF file")
    }
  }

  const handleFileUpload = async (file: File) => {
    setError("")
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Convert file to data URL for local storage
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        clearInterval(progressInterval)
        setUploadProgress(100)

        setTimeout(() => {
          setPdfUrl(dataUrl)
          onUploadComplete(dataUrl)
          setIsUploading(false)
          setUploadProgress(0)
        }, 500)
      }

      reader.onerror = () => {
        clearInterval(progressInterval)
        setError("Failed to read file")
        setIsUploading(false)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      setError("Upload failed. Please try again.")
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPdfUrl("")
    onUploadComplete("")
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!pdfUrl ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
            isDragging ? "border-accent bg-accent/10" : "border-border hover:border-accent/50 hover:bg-accent/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="pdf-upload"
          />

          {isUploading ? (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploading PDF...</p>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-12 h-12 text-accent mx-auto" />
              <div className="space-y-2">
                <p className="text-sm font-medium">Drop your PDF file here</p>
                <p className="text-xs text-muted-foreground">or</p>
                <label
                  htmlFor="pdf-upload"
                  className="inline-block bg-accent text-primary-foreground px-6 py-2 rounded font-semibold hover:opacity-90 cursor-pointer transition"
                >
                  Browse Files
                </label>
              </div>
              <p className="text-xs text-muted-foreground">Supports PDF files up to 50MB</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">PDF Uploaded</p>
              <p className="text-xs text-muted-foreground">Ready to view</p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 hover:bg-muted rounded transition text-muted-foreground hover:text-foreground"
            aria-label="Remove PDF"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded text-sm">{error}</div>
      )}
    </div>
  )
}
