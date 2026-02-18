"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FlipbookViewerProps {
  pages: string[]
  title: string
}

export function FlipbookViewer({ pages, title }: FlipbookViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pages.length - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : 0))
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-card rounded-xl overflow-hidden shadow-2xl border border-border">
        {/* Main Display */}
        <div className="aspect-[8.5/11] bg-background relative overflow-hidden">
          <div className="absolute inset-0">
            {/* Left Page */}
            <div className="absolute inset-0 w-1/2 left-0 bg-gradient-to-r from-card to-background flex items-center justify-center">
              {currentPage > 0 && (
                <img
                  src={pages[currentPage - 1] || "/placeholder.svg"}
                  alt={`Page ${currentPage}`}
                  className="w-full h-full object-cover opacity-70"
                />
              )}
            </div>

            {/* Right Page - Current */}
            <div className="absolute inset-0 w-1/2 right-0 flex items-center justify-center transition-all duration-500">
              <img
                src={pages[currentPage] || "/placeholder.svg"}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Page Edge Shadow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-black/10" />
            </div>
          </div>

          {/* Page Numbers */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
            {currentPage + 1} / {pages.length}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between p-4 bg-card/50 backdrop-blur border-t border-border">
          <button
            onClick={handlePrevPage}
            className="p-2 rounded-lg hover:bg-muted transition text-foreground/80 hover:text-accent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 mx-4">
            <input
              type="range"
              min="0"
              max={pages.length - 1}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number.parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <button
            onClick={handleNextPage}
            className="p-2 rounded-lg hover:bg-muted transition text-foreground/80 hover:text-accent"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-center mt-6 text-2xl font-bold">{title}</h2>
    </div>
  )
}
