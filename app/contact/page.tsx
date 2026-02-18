"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Globe,
  MessageSquare,
  Clock,
  PenLine,
  Loader2,
} from "lucide-react";
import Footer from "../../components/Footer";

export default function ContactPage() {
  // --- STATE FOR FORM DATA ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- HANDLE INPUT CHANGES ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- HANDLE FORM SUBMISSION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Yahan aap apni Backend API ka link daal sakte hain
      // const response = await fetch("YOUR_BACKEND_API_URL/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // if (response.ok) {
      //   alert("Message sent successfully!");
      //   setFormData({ name: "", email: "", subject: "", message: "" });
      // }

      // Dummy Delay for testing UI
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form Data Submitted:", formData);
      alert("Success! Your message has been logged.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background transition-colors duration-300">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          {/* --- HERO SECTION --- */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-foreground">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Have a story to share or want to collaborate? Reach out to our
              team. We're here to elevate global conversations with you.
            </p>
          </div>

          {/* --- GRID CONTAINER --- */}
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* --- CONTACT FORM (CENTERED) --- */}
            {/* lg:col-start-2 add kiya hai taaki form beech mein aa jaye */}
            <div className="lg:col-span-3 lg:col-start-2 bg-card border border-border p-8 sm:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5">
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center justify-center sm:justify-start gap-3">
                  <MessageSquare className="text-primary w-7 h-7" /> Send a
                  Message
                </h2>
                <p className="text-muted-foreground text-sm">
                  Tell us more about how we can help you.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-5 py-4 border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-5 py-4 border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Partnership Inquiry"
                      required
                      className="w-full px-5 py-4 border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                    />
                    <PenLine className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    required
                    className="w-full px-5 py-4 border border-border rounded-2xl bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-7 rounded-2xl bg-primary text-primary-foreground text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex gap-3 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      Sending... <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
