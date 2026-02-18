import { Helmet } from "react-helmet-async";

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedDate?: string;
  modifiedDate?: string;
  keywords?: string;
  article?: boolean;
  noindex?: boolean;
  category?: string;
  tags?: string[];
  readingTime?: string;
  section?: string;
  // 🆕 New props for better SEO
  articleBody?: string; // First 200-300 words of article
  wordCount?: number;
  authorImage?: string;
  authorBio?: string;
  relatedArticles?: Array<{ title: string; url: string }>;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  image,
  url,
  type = "website",
  author,
  publishedDate,
  modifiedDate,
  keywords,
  article = false,
  noindex = false,
  category,
  tags = [],
  readingTime,
  section,
  articleBody,
  wordCount,
  authorImage,
  authorBio,
  relatedArticles = [],
}) => {
  // Default values
  const siteTitle = title
    ? `${title} | Prime World Media`
    : "Prime World Media | Business Magazine & Leadership Insights";
  const siteDesc =
    description ||
    "Prime World Media showcases stories of visionary leaders and entrepreneurs, sharing their successes, challenges, and insights to inspire the global enterprise community.";
  const siteImage = image || "https://primeworldmedia.com/default-preview.jpg";
  const siteUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.href
      : "https://primeworldmedia.com");
  const siteName = "Prime World Media";
  const twitterHandle = "@primeworldmedia";

  // Ensure description is within optimal length (150-160 characters)
  const optimizedDesc =
    siteDesc.length > 160 ? `${siteDesc.substring(0, 157)}...` : siteDesc;

  // 🔥 COMPREHENSIVE KEYWORDS - Enhanced for better SEO
  const siteKeywords =
    keywords ||
    "business magazine, leadership insights, entrepreneur stories, business news, enterprise community, visionary leaders, business articles, success stories, CEO interviews, executive profiles, business leadership, entrepreneurship, startup stories, business strategy, corporate leadership, management insights, business innovation, industry leaders, business trends, executive interviews, business culture, leadership development, business growth, entrepreneur interviews, business transformation, digital transformation, business excellence, thought leadership, business podcast, radio station, LGBT+ community, Pride World Media, media platform, broadcasting, business media, online magazine, business journalism, corporate news, business analysis, market insights, business intelligence, CEO profiles, founder stories, business podcast network, business radio, media centre, business events, competitions, advertising, audio podcasts, business networking, professional development, career insights, business success, leadership skills, business coaching, management strategies, business innovation trends, industry analysis, business case studies, executive leadership, business mentorship, entrepreneurial mindset, business opportunities, market trends, business solutions, corporate strategy, business culture insights, workplace innovation, business best practices, leadership excellence, business transformation stories, digital business, business technology, business growth strategies, startup ecosystem, venture capital, business funding, investment insights, business partnerships, corporate governance, business ethics, sustainability in business, social responsibility, diversity and inclusion, business empowerment, professional growth, career advancement, business inspiration, motivational stories, business achievements, industry disruption, business resilience, crisis management, business adaptation, future of work, remote work, business collaboration, team leadership, organizational development, business communication, brand building, marketing strategies, business visibility, thought leaders, industry experts, business influencers, media network, content creation, storytelling, business narratives, success principles, business wisdom, executive coaching, leadership training, business education, professional resources, business community, networking opportunities, business connections, industry events, business awards, recognition programs, business excellence awards";

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://primeworldmedia.com",
      },
    ],
  };

  // Add section to breadcrumb if provided
  if (section && article) {
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: section,
      item: `https://primeworldmedia.com/${section.toLowerCase()}`,
    });

    if (title) {
      breadcrumbSchema.itemListElement.push({
        "@type": "ListItem",
        position: 3,
        name: title,
        item: siteUrl,
      });
    }
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: "https://primeworldmedia.com",
    logo: {
      "@type": "ImageObject",
      url: "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769935087/magazines/images/file_hhy9uy.jpg",
      width: 600,
      height: 60,
    },
    description: optimizedDesc,
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
      availableLanguage: ["English"],
    },
  };

  // 🔥 SITELINKS SEARCH BOX SCHEMA - For Google Sitelinks
  const sitelinksSearchBoxSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: "https://primeworldmedia.com",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://primeworldmedia.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    alternateName: "Prime Media",
    url: "https://primeworldmedia.com",
    description: optimizedDesc,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769935087/magazines/images/file_hhy9uy.jpg",
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
  };

  // 🔥 Enhanced Article Schema with ALL details for rich snippets
  const articleSchema = article
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: title,
        description: optimizedDesc,
        image: [siteImage], // Array format preferred by Google
        datePublished: publishedDate,
        dateModified: modifiedDate || publishedDate,
        author: {
          "@type": "Person",
          name: author || "Prime World Media Editorial Team",
          url: author
            ? `https://primeworldmedia.com/authors/${author.toLowerCase().replace(/\s+/g, "-")}`
            : "https://primeworldmedia.com",
          ...(authorImage && { image: authorImage }),
          ...(authorBio && { description: authorBio }),
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769935087/magazines/images/file_hhy9uy.jpg",
            width: 600,
            height: 60,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": siteUrl,
        },
        ...(category && { articleSection: category }),
        ...(tags.length > 0 && { keywords: tags.join(", ") }),
        ...(articleBody && { articleBody: articleBody }),
        ...(wordCount && { wordCount: wordCount }),
        ...(readingTime && {
          timeRequired: `PT${readingTime}M`, // ISO 8601 duration format
        }),
        inLanguage: "en-US",
        isAccessibleForFree: true,
        // 🆕 Add copyright info
        copyrightHolder: {
          "@type": "Organization",
          name: siteName,
        },
        copyrightYear: publishedDate
          ? new Date(publishedDate).getFullYear().toString()
          : new Date().getFullYear().toString(),
      }
    : null;

  // 🆕 FAQ Schema - If you have FAQ sections in articles
  const faqSchema =
    article && tags.includes("faq")
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            // Add your FAQ items here when you have them
          ],
        }
      : null;

  // 🆕 WebPage Schema - For better page understanding
  const webPageSchema = !article
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: siteTitle,
        description: optimizedDesc,
        url: siteUrl,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          url: "https://primeworldmedia.com",
          name: siteName,
        },
        about: {
          "@type": "Thing",
          name: title || "Business and Leadership",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: siteImage,
        },
      }
    : null;

  // 🆕 ItemList Schema - For listing pages (categories, archives)
  const itemListSchema =
    !article && relatedArticles.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: relatedArticles.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: item.url,
            name: item.title,
          })),
        }
      : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{siteTitle}</title>
      <meta name="description" content={optimizedDesc} />
      <meta name="keywords" content={siteKeywords} />

      {/* 🔥 CRITICAL: Canonical URL - Prevents duplicate content issues */}
      <link rel="canonical" href={siteUrl} />

      {/* Alternate for different languages (add when available) */}
      <link rel="alternate" hrefLang="en" href={siteUrl} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />

      {/* Robots - Enhanced for better crawling */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <meta
            name="robots"
            content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
          />
          <meta
            name="googlebot"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          <meta
            name="bingbot"
            content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
          />
          {/* 🆕 Yandex bot */}
          <meta name="yandex-verification" content="index, follow" />
        </>
      )}

      {/* Author and Publisher */}
      {author && <meta name="author" content={author} />}
      <meta name="publisher" content={siteName} />

      {/* Content Language */}
      <meta httpEquiv="content-language" content="en-US" />

      {/* Geographic Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* 🆕 Additional Content Classification */}
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      {article && category && <meta name="news_keywords" content={category} />}

      {/* 🆕 Google News specific tags */}
      {article && (
        <>
          <meta name="syndication-source" content={siteUrl} />
          <meta name="original-source" content={siteUrl} />
        </>
      )}

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:type" content={article ? "article" : type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={optimizedDesc} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:image:secure_url" content={siteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title || siteName} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific OG tags */}
      {article && (
        <>
          {publishedDate && (
            <meta property="article:published_time" content={publishedDate} />
          )}
          {modifiedDate && (
            <meta property="article:modified_time" content={modifiedDate} />
          )}
          {author && <meta property="article:author" content={author} />}
          {category && <meta property="article:section" content={category} />}
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <meta key={index} property="article:tag" content={tag} />
            ))}
          <meta
            property="article:publisher"
            content="https://primeworldmedia.com"
          />
        </>
      )}

      {/* Twitter Card Tags - Enhanced */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={optimizedDesc} />
      <meta name="twitter:image" content={siteImage} />
      <meta name="twitter:image:alt" content={title || siteName} />
      <meta name="twitter:domain" content="primeworldmedia.com" />
      {/* 🆕 Twitter App Card - If you have a mobile app */}
      <meta name="twitter:app:name:iphone" content={siteName} />
      <meta name="twitter:app:name:googleplay" content={siteName} />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      <meta name="color-scheme" content="light dark" />

      {/* Referrer Policy for better privacy */}
      <meta name="referrer" content="origin-when-cross-origin" />

      {/* iOS Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Microsoft Tags */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />

      {/* 🆕 Pinterest Verification - If you use Pinterest */}
      {/* <meta name="p:domain_verify" content="your_pinterest_verification_code" /> */}

      {/* Favicon Links - Important for branding */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* 🔥 RSS Feed - Critical for content discovery */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${siteName} RSS Feed`}
        href="https://primeworldmedia.com/rss.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={`${siteName} Atom Feed`}
        href="https://primeworldmedia.com/atom.xml"
      />

      {/* Preconnect for Performance - Helps with Core Web Vitals */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      {/* 🆕 Additional preconnects for common third-party resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Structured Data (JSON-LD) - Critical for Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      {/* 🔥 Sitelinks Search Box Schema - For Google Sitelinks */}
      <script type="application/ld+json">
        {JSON.stringify(sitelinksSearchBoxSchema)}
      </script>
      {article && section && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
      {/* 🆕 WebPage Schema for non-article pages */}
      {webPageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(webPageSchema)}
        </script>
      )}
      {/* 🆕 FAQ Schema if applicable */}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
      {/* 🆕 ItemList Schema for listing pages */}
      {itemListSchema && (
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default Seo;
