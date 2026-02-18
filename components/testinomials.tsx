"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    // Background tere About page se matching
 <div className="pt-8 pb-0 flex flex-col antialiased bg-background text-foreground items-center justify-center relative overflow-hidden transition-colors duration-300">
      
      {/* 1. Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-2">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-extrabold text-left border-b-2 border-primary pb-1 uppercase tracking-tighter">
            What Our Readers Say
          </h2>
          <p className="text-muted-foreground mt-1 text-xs italic">
            Real feedback from our community.
          </p>
        </div>
      </div>

      {/* 2. Scroller Container - Space controlled by parent padding */}
      <div className="flex flex-col items-center justify-center w-full overflow-hidden">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="normal"
          className="w-full"
        />
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "Prime World Media helped us tell our story in a way that truly connected with our audience. The coverage was professional and impactful.",
    name: "Priya Sharma",
    title: "Founder, TechVista Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "Working with their team was seamless. They understood our vision perfectly and delivered high-quality content that exceeded our brand's expectations.",
    name: "Arjun Mehta",
    title: "CEO, Digital Innovations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "The feature brought significant credibility to our brand. Their storytelling approach is both genuine and effective for reaching a modern audience.",
    name: "Sneha Desai",
    title: "Co-founder, GreenLeaf Ventures",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "Prime World Media's coverage gave us the visibility we needed in a competitive market. We highly recommend their professional media services.",
    name: "Rahul Kapoor",
    title: "Director, Nexus Consulting",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "Their team took the time to understand our business and crafted a narrative that resonated with our target audience quite perfectly.",
    name: "Anjali Reddy",
    title: "Marketing Head, CloudSync Technologies",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=faces&auto=format",
  },
  {
    quote: "Professional, timely, and results-driven. The feature helped us establish deep trust with potential clients and partners across the entire industry.",
    name: "Vikram Patel",
    title: "Founder, StartUp Hub India",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=faces&auto=format",
  },
];
