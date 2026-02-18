"use client";

import React from "react";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { useTheme } from "@/context/theme-context";

const LegalPage = () => {
  const { theme } = useTheme();

  const terms = [
    "By accessing the Prime World Media website (www.primeworldmedia.com), you confirm that you are 18 years or older.",
    "The website may be used only for personal, informational, and non-commercial purposes.",
    "All content on this website—including text, images, designs, logos, graphics, software, and ideas—is the intellectual property of Prime World Media, unless otherwise stated.",
    "Copying, modifying, republishing, or redistributing our content without proper credit is not permitted. Content may be shared only with clear attribution to Prime World Media.",
    "The website may include links to third-party websites. Prime World Media does not control or take responsibility for the content, policies, or practices of external sites.",
    "Any information sent by Prime World Media via email is intended only for the designated recipient and must not be shared or used without authorization.",
    "All information on this website is provided for general informational purposes only. Prime World Media does not guarantee accuracy or completeness.",
    "Any actions taken based on website content are at your own risk. Prime World Media is not liable for any losses or damages.",
    "Once you leave the Prime World Media website, different terms and privacy policies may apply, for which we are not responsible.",
    "Content shared on our website or social media platforms reflects the views of individual contributors and does not necessarily represent Prime World Media’s opinions.",
    "Prime World Media reserves the right to remove comments or user-generated content that is abusive, misleading, inappropriate, or harmful without prior notice.",
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

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-left border-b border-border pb-6 uppercase tracking-tight">
            Terms of <span className="text-primary">Use</span>
          </h1>

          {/* Normal Bullet Points List */}
          <div className="space-y-6 text-[17px] leading-relaxed text-foreground/80 max-w-5xl">
            <ul className="space-y-5">
              {terms.map((text, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  <p>{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Sections */}
          <div className="mt-20 space-y-12 border-t border-border pt-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider text-foreground">
                Cancellation Policy
              </h2>
              <p className="text-[17px] text-foreground/70 leading-relaxed">
                As we are a service provider, we do not accept cancellations
                once the process is started or completed. We collect payments
                under our official business name, Prime World Media Pvt. Ltd
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider text-foreground">
                Refund Policy
              </h2>
              <p className="text-[17px] text-foreground/70 leading-relaxed">
                As we are a service provider, we do not provide refunds once the
                process is started. If the service is yet to be provided,
                clients can request a refund. The usual Turnaround Time (TAT) is
                30 working days.
              </p>
            </section>

            <section className="bg-muted/30 p-8 rounded-sm border border-border italic">
              <h2 className="text-xl font-bold mb-2 not-italic text-foreground">
                Consent of Reader
              </h2>
              <p className="text-foreground/70">
                By using our website, you hereby agree to our disclaimer, terms,
                and policies.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
