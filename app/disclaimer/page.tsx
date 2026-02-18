"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { useTheme } from "@/context/theme-context";
import { Facebook, Linkedin, Share2, Instagram, Check } from "lucide-react";

export default function DisclaimerPage() {
  const { theme } = useTheme();
  const [currentUrl, setCurrentUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  const disclaimerPoints = [
    <>
      The content on the{" "}
      <strong className="text-foreground">Prime World Media</strong> website is
      provided for general information purposes only. While we strive to keep
      information accurate and up to date, we make no guarantees regarding its
      completeness or reliability.
    </>,
    "Prime World Media does not endorse or recommend any individuals, companies, products, or services mentioned on this website. Any opinions expressed are those of the authors and do not necessarily reflect the views of Prime World Media.",
    "Prime World Media is not responsible for any decisions, actions, or losses resulting from the use of information on this website.",
    "Lists or featured companies are not rankings unless clearly stated. Information related to companies or leaders is published as received and may not be independently verified.",
    "User-generated content, sponsored posts, and images are provided by contributors. Prime World Media is not responsible for copyright or ownership issues but will provide proper credits where applicable.",
    <>
      Official communication from Prime World Media only comes from email
      addresses ending in{" "}
      <strong className="text-foreground underline underline-offset-4">
        @primeworldmedia.com
      </strong>
      . We do not use any personal IDs such as gmail.com or yahoo.com. We are
      not responsible for communication through unofficial channels.
    </>,
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300 flex flex-col">
      <Navbar />

      {/* Hero Section with Magazine Background Overlay */}
      <div className="relative flex-grow">
        <div
          className="absolute inset-0 z-0 opacity-[0.07] grayscale pointer-events-none"
          style={{
            backgroundImage: `url('https://theenterpriseworld.com/wp-content/uploads/2021/04/Disclaimer-Background.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* 1. Page Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-left border-b border-border pb-6 uppercase tracking-tight">
            Disclaimer
          </h1>

          {/* 3. Disclaimer Content Area */}
          <article className="space-y-10 text-[17px] leading-relaxed text-foreground/80 max-w-5xl">
            {/* Custom Bullet Points Section */}
            <div className="space-y-6">
              <ul className="space-y-6">
                {disclaimerPoints.map((point, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    {/* The "Normal" Bullet */}
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <div>{point}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Changes Notification Section */}
            {/* <div className="pt-10 border-t border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4 uppercase tracking-wider">
                Changes Notification
              </h2>
              <p className="text-foreground/70">
                We review our security measures and Privacy Policy on a periodic
                basis, and think to update the same from time to time. We may
                also change or update our Privacy Policy if we add new products;
                services or sections and the same will be posted here.
              </p>
            </div> */}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
