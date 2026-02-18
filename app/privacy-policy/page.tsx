"use client";

import React from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { useTheme } from "@/context/theme-context";

const PrivacyPage = () => {
  const { theme } = useTheme();

  const privacySummary = [
    "Prime World Media collects personal information only when you choose to provide it, such as when subscribing to newsletters or filling out forms.",
    "You may browse our website without sharing personal details.",
    "We use publicly available business contact information to communicate with users and you may opt out at any time.",
    "Your information is collected directly by Prime World Media and is not sold, rented, or shared without your explicit consent.",
    "We use secure systems, including SSL encryption, to protect your data.",
    "Trusted third-party tools may be used for internal operations while following standard data protection practices.",
    "You have the right to request access to your personal information held by Prime World Media.",
    "This Privacy Policy may be updated periodically, and changes will be posted on our website.",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="flex-grow relative">
        {/* Background Decorative Grid */}
        <div
          className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: `url('/path-to-your-magazine-grid-image.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Standardized container to align content to the left */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Header Section - Left aligned without max-width paragraph */}
          <header className="mb-12 border-b border-border pb-8 text-left">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tighter uppercase">
              Privacy <span className="text-primary">Policy</span>
            </h1>
          </header>

          {/* Privacy Points List - Left aligned content */}
          <div className="space-y-6 max-w-5xl">
            <ul className="space-y-6">
              {privacySummary.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                  <p className="text-lg leading-relaxed text-foreground/80">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPage;