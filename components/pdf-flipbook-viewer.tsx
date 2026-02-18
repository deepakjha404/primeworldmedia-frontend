"use client"

import { useState } from "react"
import { ZoomIn, ZoomOut, Maximize2, X, Loader2 } from "lucide-react"

interface PDFFlipbookViewerProps {
  pdfUrl: string
  title: string
}

export function PDFFlipbookViewer({ pdfUrl, title }: PDFFlipbookViewerProps) {
  const [scale, setScale] = useState(100)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 10, 50))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const ViewerContent = () => (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur border border-border rounded-lg">
        <div className="flex items-center gap-2">
          <button onClick={handleZoomOut} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Zoom out">
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium min-w-[60px] text-center">{scale}%</span>
          <button onClick={handleZoomIn} className="p-2 rounded-lg hover:bg-muted transition" aria-label="Zoom in">
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        <div className="text-sm font-medium">{title}</div>

        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-muted transition"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl border border-border">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/90 z-10">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto" />
              <p className="text-muted-foreground">Loading PDF...</p>
            </div>
          </div>
        )}

        <div className="relative bg-gradient-to-b from-muted/20 to-background">
          <iframe
            src={`${pdfUrl}#view=FitH&zoom=${scale}`}
            className="w-full h-[600px] lg:h-[800px]"
            title={title}
            onLoad={() => setIsLoading(false)}
            style={{
              border: "none",
              transform: `scale(${scale / 100})`,
              transformOrigin: "top center",
              height: `${(600 * 100) / scale}px`,
            }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-muted-foreground space-y-1">
        <p>Use the browser's PDF controls to navigate pages</p>
        <p className="text-xs">Tip: Use Ctrl/Cmd + F to search within the PDF</p>
      </div>
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background p-4 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <ViewerContent />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <ViewerContent />
    </div>
  )
}
