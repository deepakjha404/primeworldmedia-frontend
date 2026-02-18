"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  _id: string;
  image: string;
  title: string;
  destination: string;
  url: string;
  position: number;
  label: string;
  status: string;
}

const BANNER_API =
  "https://theglobalmagazine-backend-laka.onrender.com/api/general/get-banner";

const HeroSlider = () => {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(BANNER_API);

        // Network error check
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Data validation
        if (!data) {
          throw new Error("Invalid response: No data received");
        }

        if (!data.success) {
          throw new Error(data.message || "API request failed");
        }

        if (!Array.isArray(data.homePageBanner)) {
          throw new Error(
            "Invalid data format: homePageBanner is not an array",
          );
        }

        // Filter and sort
        const sorted = [...data.homePageBanner]
          .filter((b: BannerSlide) => {
            // Validate each banner object
            if (!b || typeof b !== "object") return false;
            if (b.status !== "Active") return false;
            if (typeof b.position !== "number") return false;
            return true;
          })
          .sort((a: BannerSlide, b: BannerSlide) => a.position - b.position);

        if (sorted.length === 0) {
          console.warn("No active banners found");
        }

        setSlides(sorted);
      } catch (err) {
        // Proper error handling
        if (err instanceof TypeError && err.message.includes("fetch")) {
          setError("Network error. Please check your internet connection.");
        } else if (err instanceof SyntaxError) {
          setError("Invalid response format from server.");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }

        // Log error for debugging (production mein proper logging service use karo)
        console.error("Banner fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const handleImageClick = () => {
    const activeSlide = slides[currentIndex];
    if (activeSlide?.url) {
      window.location.href = activeSlide.url;
    }
  };

  // ===== LOADING STATE =====
  if (loading) {
    return (
      <section className="bg-background py-4 sm:py-6">
        <div className="w-full px-2">
          <div className="relative w-full md:max-w-[80%] md:aspect-[17/9] mx-auto aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-700 animate-pulse" />
          <div className="mt-4 px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-5 gap-3 md:gap-3 w-full md:max-w-[83%] mx-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ===== ERROR STATE =====
  if (error || slides.length === 0) {
    return (
      <section className="bg-background py-4 sm:py-6">
        <div className="w-full px-2">
          <div className="relative w-full md:max-w-[80%] md:aspect-[17/9] mx-auto aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500 text-sm">
            {error || "Koi banner available nahi hai."}
          </div>
        </div>
      </section>
    );
  }

  const activeSlide = slides[currentIndex];

  // ===== MAIN RENDER =====
  return (
    <section className="bg-background py-4 sm:py-6">
      <div className="w-full px-2">
        {/* ===== MAIN SLIDER BOX ===== */}
        <div className="relative w-full md:max-w-[80%] md:aspect-[17/9] mx-auto aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-xl border-2 border-gray-200 dark:border-gray-700">
          {/* Draggable Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              onClick={handleImageClick}
              className="absolute inset-0 cursor-pointer w-full h-full"
            >
              <img
                src={activeSlide.image || "/placeholder.svg"}
                className="w-full h-full object-cover"
                alt={activeSlide.title || "Banner"}
              />

              {/* Text Overlay */}
              <div className="absolute left-6 bottom-4 md:left-12 md:bottom-8 z-30 pointer-events-none flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex flex-col items-start"
                >
                  {/* Red Label */}
                  {/* Red Label */}
                  {/* Red Label - More compact for mobile */}
                  {activeSlide.label && (
                    <div className="mb-0.5 md:mb-2">
                      <span className="bg-red-600 text-white px-1 py-0.5 text-[9px] md:text-xs font-bold tracking-[0.15em] uppercase box-decoration-clone leading-none">
                        {activeSlide.label}
                      </span>
                    </div>
                  )}

                  {/* White Title - Smaller on mobile */}
                  {activeSlide.title && (
                    <h2 className="text-white text-base md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-md max-w-[200px] md:max-w-md">
                      {activeSlide.title}
                    </h2>
                  )}

                  {/* Destination - Tightened up */}
                  {activeSlide.destination && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.4 }}
                      className="text-white/80 text-[10px] md:text-sm font-medium mt-0 md:mt-1 drop-shadow-sm max-w-[180px] md:max-w-sm tracking-wide"
                    >
                      {activeSlide.destination}
                    </motion.p>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute right-4 bottom-4 md:right-6 md:bottom-6 z-40 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all shadow-lg rounded-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="bg-black/40 hover:bg-black/60 text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all rounded-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* ===== THUMBNAILS ===== */}
        <div className="mt-4 px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-5 gap-3 md:gap-3 w-full md:max-w-[83%] mx-auto">
            {slides.map((slide, index) => {
              const isActive = currentIndex === index;
              return (
                <button
                  key={slide._id}
                  onClick={() => setCurrentIndex(index)}
                  className="relative w-full flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`relative aspect-video w-full overflow-hidden transition-all duration-300 rounded-lg border-2
                    ${
                      isActive
                        ? "border-primary shadow-lg z-20"
                        : "border-gray-300 dark:border-gray-600 z-10 hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={slide.image || "/placeholder.svg"}
                      className="w-full h-full object-cover"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="h-1 mt-2 w-full bg-primary rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
