"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [clickedCard, setClickedCard] = useState<number | null>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const handleCardClick = (idx: number) => {
    setClickedCard(idx);
    setTimeout(() => setClickedCard(null), 600);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-2",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className={cn(
              "relative w-[350px] md:w-[450px] max-w-full shrink-0",
              "rounded-2xl border border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)]",
              "dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]",
              "cursor-pointer transition-all duration-300",
              "hover:scale-105 hover:shadow-lg hover:border-red-400 dark:hover:border-red-500",
              "px-6 py-5",
            )}
            key={`${item.name}-${idx}`}
            onClick={() => handleCardClick(idx)}
            style={{
              animation:
                clickedCard === idx ? "pulseRed 0.6s ease-in-out" : undefined,
            }}
          >
            <blockquote className="flex flex-col">
              {/* Quote */}
              <span className="text-sm md:text-base leading-relaxed font-normal text-neutral-700 dark:text-gray-100 mb-3">
                "{item.quote}"
              </span>

              {/* Name, Title and Image - Left aligned */}
              <div className="flex items-center gap-3">
                {/* Image - Left Side */}
                {item.image ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-red-400 dark:border-red-500">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400/20 to-zinc-300/30 dark:from-red-500/20 dark:to-zinc-700/30 flex items-center justify-center shrink-0 border-2 border-red-400/50 dark:border-red-500/50">
                    <span className="text-lg font-bold text-red-400 dark:text-red-400 select-none">
                      {item.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}

                {/* Name and Title - Right of Image */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm md:text-base font-semibold text-neutral-800 dark:text-gray-100">
                    {item.name}
                  </span>
                  <span className="text-xs md:text-sm text-neutral-500 dark:text-gray-400">
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>

      <style jsx>{`
        @keyframes pulseRed {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            border-color: #ef4444;
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
            border-color: #fca5a5;
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            border-color: #ef4444;
          }
        }
      `}</style>
    </div>
  );
};