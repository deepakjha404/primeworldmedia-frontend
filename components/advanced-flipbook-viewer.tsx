"use client";

import { Loader2, Maximize2, BookOpen } from "lucide-react";
import { useState } from "react";

interface ViewerProps {
  pdfUrl: string;
  title: string;
}

export function SoftFlipbookViewer({ pdfUrl, title }: ViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  //const clientId = "260bc6a296800bf7";
  const flipbookUrl = pdfUrl;
  console.log(pdfUrl);
  

  return (
    // 1. Max-width ko 7xl se badha kar screen-2xl kiya aur padding thori kam ki
    <div className="w-full max-w-[1600px] mx-auto py-4 group">
      {/* 2. Aspect ratio ko [16/9] ya [21/9] ke aas paas rakha hai taaki bada dikhe */}
      <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/10] bg-[#0a0a0a] rounded-[1.5rem] p-1 shadow-[0_0_60px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/10 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -inset-2 bg-gradient-to-tr from-accent/10 via-transparent to-white/5 blur-3xl opacity-50 pointer-events-none" />

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-[#0a0a0a]/95 backdrop-blur-xl">
            <div className="relative">
              <Loader2
                className="animate-spin text-accent w-12 h-12"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 blur-xl bg-accent/20 animate-pulse" />
            </div>
            <p className="mt-6 text-white/40 text-[10px] uppercase tracking-[0.4em] font-light">
              Optimizing Viewport
            </p>
          </div>
        )}

        {/* Hardware Bezel */}
        <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden bg-black">
          <iframe
            src={flipbookUrl}
            title={title}
            className={`w-full h-full border-none transition-all duration-1000 ease-in-out ${
              isLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            allowFullScreen
            allow="clipboard-write"
          />
        </div>

        {/* Floating Controls */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-30 shadow-2xl">
          <BookOpen className="w-5 h-5 text-accent" />
          <span className="text-[11px] text-white/80 uppercase tracking-widest font-semibold">
            {title}
          </span>
          <div className="w-[1px] h-4 bg-white/20 mx-2" />

          <button
            onClick={() => window.open(flipbookUrl, "_blank")}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group/btn"
          >
            <span className="text-[10px] uppercase font-bold">Focus Mode</span>
            <Maximize2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div> */}
      </div>

      {/* Footer */}
      <div className="mt-8 flex flex-col items-center gap-1">
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-accent/40 to-transparent mb-2" />
        <span className="text-[10px] text-white/30 uppercase tracking-[0.6em] text-center">
          Cinematic Reading Experience
        </span>
      </div>
    </div>
  );
}
