"use client"

import { Share2, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOn = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-foreground/80 flex items-center gap-2">
        <Share2 className="w-4 h-4" />
        Share:
      </span>

      <Button variant="outline" size="sm" onClick={() => window.open(shareOn.facebook, "_blank")} className="text-xs">
        Facebook
      </Button>

      <Button variant="outline" size="sm" onClick={() => window.open(shareOn.twitter, "_blank")} className="text-xs">
        X (Twitter)
      </Button>

      <Button variant="outline" size="sm" onClick={() => window.open(shareOn.linkedin, "_blank")} className="text-xs">
        LinkedIn
      </Button>

      <Button variant="outline" size="sm" onClick={() => window.open(shareOn.whatsapp, "_blank")} className="text-xs">
        WhatsApp
      </Button>

      <Button variant="outline" size="sm" onClick={handleCopy} className="text-xs gap-2 bg-transparent">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  )
}
