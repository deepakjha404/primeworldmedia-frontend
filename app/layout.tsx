import type { Metadata } from "next";
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://primeworldmedia.com"),
  title: {
    default:
      "Prime World Media | Business Magazine, Leadership Insights & Entrepreneur Stories",
    template:
      "%s | Prime World Media - Business Magazine & Leadership Insights",
  },
  description:
    "Prime World Media is your premier business magazine featuring leadership insights, entrepreneur stories, business news, and success stories from visionary leaders in the global enterprise community. Discover business articles, CEO interviews, and entrepreneurship strategies.",
  keywords: [
    "business magazine",
    "leadership insights",
    "entrepreneur stories",
    "business news",
    "enterprise community",
    "visionary leaders",
    "business articles",
    "success stories",
    "CEO interviews",
    "entrepreneurship",
    "business leadership",
    "corporate leadership",
    "business strategy",
    "executive insights",
    "startup stories",
    "business innovation",
    "industry leaders",
    "business trends",
    "management insights",
    "business growth",
    "leadership development",
    "business inspiration",
    "entrepreneur magazine",
    "business publication",
    "executive magazine",
    "business media",
    "leadership magazine",
    "business journalism",
    "corporate news",
    "business intelligence",
    "thought leadership",
    "business thought leaders",
    "enterprise leadership",
    "business best practices",
    "leadership strategies",
    "entrepreneurial success",
    "business case studies",
    "industry insights",
    "business transformation",
    "digital business",
    "business excellence",
  ],
  authors: [{ name: "Prime World Media" }],
  creator: "Prime World Media",
  publisher: "Prime World Media",
  generator: "v0.app",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://primeworldmedia.com",
    siteName: "Prime World Media - Business Magazine & Leadership Insights",
    title:
      "Prime World Media | Business Magazine, Leadership Insights & Entrepreneur Stories",
    description:
      "Prime World Media is the leading business magazine showcasing leadership insights, entrepreneur stories, business news, and success stories from visionary leaders and executives in the global enterprise community.",
    images: [
      {
        url: "https://primeworldmedia.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Prime World Media - Business Magazine & Leadership Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Prime World Media | Business Magazine, Leadership Insights & Entrepreneur Stories",
    description:
      "Leading business magazine featuring leadership insights, entrepreneur stories, business news, and success stories from visionary leaders in the enterprise community.",
    site: "@primeworldmedia",
    creator: "@primeworldmedia",
    images: ["https://primeworldmedia.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "", // Add your Google verification code here
  },
  other: {
    "article:publisher": "Prime World Media",
    "article:author": "Prime World Media Editorial Team",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicon and App Icons */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color - will be overridden by ThemeProvider */}
        <meta name="theme-color" content="#000000" />

        {/* Apple Mobile Web App */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Prime World Media" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Additional SEO Meta Tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta
          name="audience"
          content="Business Professionals, Entrepreneurs, Leaders, Executives"
        />
        <meta
          name="classification"
          content="Business Magazine, Leadership, Entrepreneurship"
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Prime World Media",
              alternateName: "Prime World Media - Business Magazine",
              url: "https://primeworldmedia.com",
              logo: "https://primeworldmedia.com/logo.png",
              description:
                "Prime World Media is a leading business magazine and media platform that showcases leadership insights, entrepreneur stories, business news, and success stories from visionary leaders and executives in the global enterprise community.",
              sameAs: [
                "https://twitter.com/primeworldmedia",
                "https://www.facebook.com/primeworldmedia",
                "https://www.linkedin.com/company/primeworldmedia",
                "https://www.instagram.com/primeworldmedia",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                url: "https://primeworldmedia.com/contact",
              },
              foundingDate: "2024",
              keywords:
                "business magazine, leadership insights, entrepreneur stories, business news, visionary leaders, enterprise community, success stories, business articles, CEO interviews, entrepreneurship",
              areaServed: "Worldwide",
              audience: {
                "@type": "Audience",
                audienceType:
                  "Business Professionals, Entrepreneurs, Leaders, Executives",
              },
            }),
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Prime World Media",
              alternateName: "Prime World Media Business Magazine",
              url: "https://primeworldmedia.com",
              description:
                "Prime World Media is your premier business magazine featuring leadership insights, entrepreneur stories, business news, and success stories from visionary leaders in the global enterprise community.",
              publisher: {
                "@type": "Organization",
                name: "Prime World Media",
                logo: {
                  "@type": "ImageObject",
                  url: "https://primeworldmedia.com/logo.png",
                },
              },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://primeworldmedia.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              about: {
                "@type": "Thing",
                name: "Business Leadership and Entrepreneurship",
                description:
                  "Leadership insights, business news, entrepreneur stories, and success stories from the enterprise community",
              },
              keywords:
                "business magazine, leadership insights, entrepreneur stories, business news, enterprise community, visionary leaders, success stories",
            }),
          }}
        />

        {/* Structured Data - NewsMediaOrganization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              name: "Prime World Media",
              url: "https://primeworldmedia.com",
              logo: "https://primeworldmedia.com/logo.png",
              description:
                "Business magazine providing leadership insights, entrepreneur stories, and business news for the global enterprise community",
              publishingPrinciples:
                "https://primeworldmedia.com/editorial-guidelines",
              actionableFeedbackPolicy: "https://primeworldmedia.com/feedback",
              correctionsPolicy: "https://primeworldmedia.com/corrections",
              ethicsPolicy: "https://primeworldmedia.com/ethics",
              masthead: "https://primeworldmedia.com/about",
              missionCoveragePrioritiesPolicy:
                "https://primeworldmedia.com/mission",
              diversityPolicy: "https://primeworldmedia.com/diversity",
              verificationFactCheckingPolicy:
                "https://primeworldmedia.com/fact-checking",
            }),
          }}
        />

        {/* Structured Data - PeriodicalPublisher */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PeriodicalPublisher",
              name: "Prime World Media",
              url: "https://primeworldmedia.com",
              description:
                "Premier business magazine featuring leadership insights, entrepreneur stories, and business news",
              publishes: {
                "@type": "Periodical",
                name: "Prime World Media Business Magazine",
                description:
                  "Business magazine covering leadership insights, entrepreneur stories, success stories, and business news for the enterprise community",
              },
            }),
          }}
        />

        {/* Structured Data - Site Navigation for Google Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Prime World Media Navigation",
              description: "Main navigation sections of Prime World Media",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Articles - Business Magazine & Leadership Insights",
                  description:
                    "Read the latest business articles, leadership insights, and entrepreneur stories from Prime World Media",
                  url: "https://primeworldmedia.com/articles",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 2,
                  name: "Stories - Success Stories from Visionary Leaders",
                  description:
                    "Discover inspiring success stories and entrepreneur journeys from business leaders worldwide",
                  url: "https://primeworldmedia.com/stories",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 3,
                  name: "News - Latest Business News & Updates",
                  description:
                    "Stay updated with the latest business news, industry trends, and enterprise community updates",
                  url: "https://primeworldmedia.com/news",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 4,
                  name: "Magazine - Digital Business Magazine",
                  description:
                    "Explore our digital business magazine featuring in-depth articles and exclusive interviews",
                  url: "https://primeworldmedia.com/magazine",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 5,
                  name: "Competitions - Business Competitions & Awards",
                  description:
                    "Participate in business competitions and awards for entrepreneurs and leaders",
                  url: "https://primeworldmedia.com/competitions",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 6,
                  name: "Pride-On-Demand - Exclusive Content & Interviews",
                  description:
                    "Access exclusive on-demand content, interviews, and insights from business thought leaders",
                  url: "https://primeworldmedia.com/pride-on-demand",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 7,
                  name: "Pride TV - Business Television & Video Content",
                  description:
                    "Watch business television programs, leadership interviews, and entrepreneurship shows",
                  url: "https://primeworldmedia.com/pride-tv",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 8,
                  name: "Stations - Business Media Stations & Podcasts",
                  description:
                    "Listen to business podcasts, audio content, and media stations covering enterprise news",
                  url: "https://primeworldmedia.com/stations",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 9,
                  name: "Advertising - Business Advertising Solutions",
                  description:
                    "Advertise your business with Prime World Media and reach global enterprise community",
                  url: "https://primeworldmedia.com/advertising",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 10,
                  name: "P-O-D Audio - Business Audio Podcasts & Content",
                  description:
                    "Listen to business audio podcasts featuring entrepreneur stories and leadership insights",
                  url: "https://primeworldmedia.com/p-o-d-audio",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 11,
                  name: "P-O-D Listen Again - Replay Business Podcasts",
                  description:
                    "Listen again to your favorite business podcasts and audio content from Prime World Media",
                  url: "https://primeworldmedia.com/p-o-d-listen-again",
                },
              ],
            }),
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home - Prime World Media Business Magazine",
                  item: "https://primeworldmedia.com",
                },
              ],
            }),
          }}
        />

        {/* Google Analytics - Uncomment and add your GA4 Measurement ID */}
        {/* <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        /> */}
      </head>
      <body
        className={`${geist.className} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
