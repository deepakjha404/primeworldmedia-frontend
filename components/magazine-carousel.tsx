"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

interface Magazine {
  _id: string;
  title: string;
  image: string;
}

export function MagazineCarousel({ magazines }: { magazines: Magazine[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for Swipe & Logic
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 50;

  // --- HANDLERS ---
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % magazines.length);
  }, [magazines.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + magazines.length) % magazines.length);
  }, [magazines.length]);

  // Reset auto-play timer
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(nextSlide, 4000);
  }, [nextSlide]);

  // --- KEYBOARD LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Input fields mein typing ke waqt slide disable karne ke liye
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName))
        return;

      // Arrow keys can pause/play animation
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        // Optional: Can add pause/play logic here if needed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // --- RESIZE LOGIC ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- SWIPE HANDLERS ---
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    if (distance > minSwipeDistance) {
      nextSlide();
      resetAutoPlay();
    }
    if (distance < -minSwipeDistance) {
      prevSlide();
      resetAutoPlay();
    }
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  if (magazines.length === 0) return null;

  return (
    <div
      className="relative w-full pt-8 pb-0 overflow-hidden -mb-16"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Continuous Sliding Carousel */}
      <div className="relative h-[520px] w-full mx-auto overflow-hidden mb-0">
        <div
          className="flex items-center gap-8 animate-scroll"
          style={{
            animation: "scroll 30s linear infinite",
          }}
        >
          {/* Quadruple magazines for seamless infinite loop */}
          {[...magazines, ...magazines, ...magazines, ...magazines].map(
            (mag: Magazine, idx: number) => {
              const actualIndex = idx % magazines.length;

              return (
                <div
                  key={`${mag._id}-${idx}`}
                  className="cursor-pointer flex-shrink-0 transition-all duration-300 hover:scale-105"
                >
                  <div className="relative w-[320px] bg-white rounded-sm overflow-hidden group shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
                    <img
                      src={mag.image || "/placeholder.svg"}
                      alt={mag.title}
                      className="w-full h-auto object-contain pointer-events-none bg-white"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-white text-xl font-bold line-clamp-2">
                          {mag.title}
                        </h4>
                      </div>

                      {/* Corner Badge */}
                      <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                        <span className="text-white text-xs font-bold">
                          #{actualIndex + 1}
                        </span>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Link */}
                    <Link
                      href={`/magazine/${mag._id}`}
                      className="absolute inset-0 z-10"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${magazines.length * 328}px);
          }
        }
      `}</style>
    </div>
  );
}
