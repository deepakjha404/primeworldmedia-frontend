import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
  X,
  Instagram,
  Loader2,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";

/**
 * Types for the helper components
 */
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

/**
 * Helper Component: Navigation Links with hover effect
 */

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="hover:text-accent transition-colors flex items-center gap-2 group"
    >
      <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
      {children}
    </Link>
  </li>
);

/**
 * Helper Component: Social Media Buttons
 */
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

const Footer: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(
        "https://theglobalmagazine-backend-laka.onrender.com/api/general/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail(""); // Clear input
      } else {
        throw new Error(data.message || "Something went wrong");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      // Optional: Reset message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };
  return (
    
    <footer className="bg-secondary/30 backdrop-blur-sm border-t border-border mt-16 sm:mt-24 relative overflow-hidden">
      {/* Background Decoration - subtle blur effect */}

      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* Brand Section */}
          <div className="space-y-6"> 
            <div>
              <Link href="/" className="flex items-center group shrink-0 py-1">
                {/* Width ko w-64 se start karke desktop par 350px tak kiya hai 
                taaki logo poora wide area cover kare bina quality loose kiye.
              */}
                <div className="relative h-14 w-64 sm:w-80 md:w-[250px] flex items-center justify-start transition-all duration-300">
                  {/* Subtle Glow: Background ke saath match karne ke liye */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-white/5 rounded-full" />

                  <img
                    src={
                      theme === "dark"
                        ? "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769437620/Screenshot_2026-01-26_195427_v6kk6r.png"
                        : "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769440825/Screenshot_2026-01-26_204919_hf3zgo.png"
                    }
                    alt="The Global Media Wide Logo"
                    /* 'object-contain' image ko stretch hone se bachayega.
                    'w-full' aur 'h-full' image ko container ke hisaab se max size dega.
                  */
                    className="h-full w-full object-contain object-left transition-all duration-500 group-hover:scale-[1.02] filter brightness-110 contrast-[1.05]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://cdn-icons-png.flaticon.com/512/3642/3642279.png";
                    }}
                  />

                  {/* Bottom Accent Line: Wide logo ke niche premium look ke liye */}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-accent/80 to-transparent group-hover:w-full transition-all duration-700 rounded-full" />
                </div>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prime World Media is a business magazine and media platform that
                showcases the stories of visionary leaders and entrepreneurs,
                sharing their successes, challenges, and insights to inspire the
                global enterprise community.
              </p>
            </div>
            <div className="flex gap-4">
              <SocialLink
                href="#"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[24px] h-[24px] fill-current"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                }
                label="X (formerly Twitter)"
              />

              {/* LinkedIn - Official Square Logo */}
              <SocialLink
                href="https://www.linkedin.com/company/primeworldmedia/"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[24px] h-[24px] fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"></path>
                  </svg>
                }
                label="LinkedIn"
              />

              {/* Facebook - Official Circle Logo */}
              <SocialLink
                href="#"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[24px] h-[24px] fill-current"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                }
                label="Facebook"
              />

              {/* Instagram - Official Outline Logo */}
              <SocialLink
                href="https://www.instagram.com/primeworldmedia_com?igsh=YTlmaGl1Y3M3YzZk&utm_source=qr"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[24px] h-[24px] fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                }
                label="Instagram"
              />
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="font-bold mb-6 text-foreground text-sm uppercase tracking-widest">
              Explore Content
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/magazines"
                  className="hover:text-accent transition-colors"
                >
                  Magazines
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="hover:text-accent transition-colors"
                >
                  Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="hover:text-accent transition-colors"
                >
                  Articles
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/news"
                  className="hover:text-accent transition-colors"
                >
                  News
                </Link>
              </li> */}

              {/* <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-accent transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-accent transition-colors"
                >
                  Disclaimer
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Office Section */}
          <div>
            <h4 className="font-bold mb-6 text-foreground text-sm uppercase tracking-widest">
              The Hub
            </h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Work with Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-accent transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="hover:text-accent transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/advertise"
                  className="hover:text-accent transition-colors"
                >
                  Advertise
                </Link>
              </li> */}
              <li className="pt-2">
                {/* <p className="text-foreground font-semibold mb-1">
                  Jaipur Office:
                </p>
                <p className="text-xs italic leading-relaxed">
                  Malviya Nagar, Jaipur, Rajasthan, 302017
                </p> */}
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-bold mb-6 text-foreground text-sm uppercase tracking-widest">
              Newsletter
            </h4>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Get the week's best stories delivered straight to your inbox.
            </p>

            <form className="space-y-2" onSubmit={handleSubscribe}>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  disabled={status === "loading"}
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-xs focus:ring-2 focus:ring-accent outline-none transition-all pr-10 disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-accent text-accent-foreground text-xs font-bold py-2.5 rounded-lg hover:bg-accent/90 transition-all flex items-center justify-center gap-2 group disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <>
                    Subscribe Now
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              {/* Feedback Message */}
              {status !== "idle" && (
                <p
                  className={`text-[10px] mt-2 font-medium ${
                    status === "success" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col items-center justify-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {/* Agar future mein links add karne ho toh wo yahan center mein hi dikhenge */}
          </div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em] text-center">
            &copy; {new Date().getFullYear()} PRIME WORLD MEDIA. ALL RIGHTS
            RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
