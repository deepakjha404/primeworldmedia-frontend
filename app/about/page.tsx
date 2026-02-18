"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { useTheme } from "@/context/theme-context";
import {
  Facebook,
  Linkedin,
  Share2,
  Instagram,
  Check, // Added for "Copied" feedback
} from "lucide-react";
import Seo from "@/components/seo";
import seoConfigurations from "@/lib/seoConfig";


export default function AboutPage() {
  const { theme } = useTheme();
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Safely grab the URL only once the component mounts in the browser
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <>
     <Seo {...seoConfigurations.about} />
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">
      <Navbar />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 1. Page Title */}
        <h1 className="text-4xl font-bold mb-8 text-left border-b border-border pb-4 uppercase tracking-tight">
          About Us
        </h1>

        {/* 2. Social Share Bar */}
        {/* <div className="flex flex-wrap gap-2 mb-10">
         
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#3b5998] text-white px-6 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition-all flex-1 justify-center md:flex-none"
          >
            <Facebook size={18} fill="currentColor" /> Share on Facebook
          </a>

   
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#0077b5] text-white px-6 py-2 rounded-sm text-sm font-semibold hover:opacity-90 transition-all flex-1 justify-center md:flex-none"
          >
            <Linkedin size={18} fill="currentColor" /> Share on Linkedin
          </a>

          <div className="flex gap-2 w-full md:w-auto">
       
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#25D366] text-white rounded-sm hover:opacity-90"
            >
              <Share2 size={20} />
            </a>

        
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#bd081c] text-white rounded-sm hover:opacity-90"
            >
              <Instagram size={20} />
            </a>

            
            <button
              onClick={handleCopyLink}
              className="p-2 bg-muted text-muted-foreground border border-border rounded-sm hover:opacity-90 transition-colors"
              title="Copy Link"
            >
              {copied ? (
                <Check size={20} className="text-green-500" />
              ) : (
                <Share2 size={20} />
              )}
            </button>
          </div>
        </div> */}

        {/* 3. Narrative Text */}
        <article className="space-y-8 text-[17px] leading-relaxed text-foreground/80 text-justify">
          <p>
            <strong className="text-foreground font-bold text-lg">
              Prime World Media
            </strong>{" "}
            is a global business magazine that captures the ideas, ambitions,
            and achievements driving today’s enterprises. We bring forward
            authentic stories of leadership, innovation, and growth, presenting
            them in a way that is engaging, insightful, and easy to connect
            with.
          </p>

          <p>
            With a strong editorial foundation, we work across industries
            including technology, finance, consulting, manufacturing, and
            healthcare. Our coverage spans startups, growing businesses, and
            established organizations from every major region of the
            world—creating a truly international platform for business voices.
            Our magazine is the ultimate showcase for leadership habits and
            success stories of renowned business leaders & celebrities.
          </p>

          <p>
            We collaborate closely with companies and leaders to translate their
            vision into meaningful narratives. Every feature we publish is
            crafted with a human-first approach, helping brands communicate
            their value while building credibility and long-term visibility
            through our magazine and digital platforms. Our global reach ensures
            that every success story is broadcasted to an audience that values
            excellence.
          </p>

          <p>
            For our readers, Prime World Media serves as a source of inspiration
            and practical insight. From emerging entrepreneurs to seasoned
            professionals, our content is designed to spark ideas, encourage
            ambition, and prepare readers for the evolving challenges of the
            business world.
          </p>
        </article>
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
    </>
  );
}
