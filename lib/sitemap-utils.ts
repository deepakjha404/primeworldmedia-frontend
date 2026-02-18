/**
 * Sitemap Generator for Prime World Media
 * Generates XML sitemap for better search engine crawling
 */

import { writeFileSync } from "fs";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

interface Article {
  slug: string;
  updatedAt: string;
}

interface Story {
  slug: string;
  updatedAt: string;
}

interface Magazine {
  slug: string;
  publishedDate: string;
}

interface Category {
  slug: string;
}

interface Tag {
  slug: string;
}

interface Author {
  slug: string;
}

/**
 * Generate sitemap XML string
 */
export function generateSitemap(urls: SitemapUrl[]): string {
  const urlsXml = urls
    .map((url) => {
      return `  <url>
    <loc>${escapeXml(url.loc)}</loc>${
      url.lastmod
        ? `
    <lastmod>${url.lastmod}</lastmod>`
        : ""
    }${
      url.changefreq
        ? `
    <changefreq>${url.changefreq}</changefreq>`
        : ""
    }${
      url.priority !== undefined
        ? `
    <priority>${url.priority.toFixed(1)}</priority>`
        : ""
    }
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

/**
 * Escape special XML characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Generate complete sitemap for Prime World Media
 */
export function generatePrimeWorldMediaSitemap(data: {
  articles: Article[];
  stories: Story[];
  magazines: Magazine[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
}): string {
  const baseUrl = "https://primeworldmedia.com";
  const urls: SitemapUrl[] = [];

  // Static Pages (High Priority)
  urls.push({
    loc: baseUrl,
    changefreq: "daily",
    priority: 1.0,
    lastmod: new Date().toISOString().split("T")[0],
  });

  urls.push({
    loc: `${baseUrl}/articles`,
    changefreq: "daily",
    priority: 0.9,
    lastmod: new Date().toISOString().split("T")[0],
  });

  urls.push({
    loc: `${baseUrl}/stories`,
    changefreq: "daily",
    priority: 0.9,
    lastmod: new Date().toISOString().split("T")[0],
  });

  urls.push({
    loc: `${baseUrl}/magazines`,
    changefreq: "weekly",
    priority: 0.9,
    lastmod: new Date().toISOString().split("T")[0],
  });

  urls.push({
    loc: `${baseUrl}/about`,
    changefreq: "monthly",
    priority: 0.5,
  });

  urls.push({
    loc: `${baseUrl}/contact`,
    changefreq: "monthly",
    priority: 0.5,
  });

  // Articles (High Priority - Fresh Content)
  data.articles.forEach((article) => {
    urls.push({
      loc: `${baseUrl}/articles/${article.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: article.updatedAt.split("T")[0],
    });
  });

  // Stories (High Priority - Evergreen Content)
  data.stories.forEach((story) => {
    urls.push({
      loc: `${baseUrl}/stories/${story.slug}`,
      changefreq: "monthly",
      priority: 0.8,
      lastmod: story.updatedAt.split("T")[0],
    });
  });

  // Magazines
  data.magazines.forEach((magazine) => {
    urls.push({
      loc: `${baseUrl}/magazines/${magazine.slug}`,
      changefreq: "monthly",
      priority: 0.7,
      lastmod: magazine.publishedDate.split("T")[0],
    });
  });

  // Categories
  data.categories.forEach((category) => {
    urls.push({
      loc: `${baseUrl}/category/${category.slug}`,
      changefreq: "weekly",
      priority: 0.6,
    });
  });

  // Tags
  data.tags.forEach((tag) => {
    urls.push({
      loc: `${baseUrl}/tag/${tag.slug}`,
      changefreq: "weekly",
      priority: 0.5,
    });
  });

  // Authors
  data.authors.forEach((author) => {
    urls.push({
      loc: `${baseUrl}/authors/${author.slug}`,
      changefreq: "monthly",
      priority: 0.6,
    });
  });

  return generateSitemap(urls);
}

/**
 * Generate sitemap index for multiple sitemaps (for large sites)
 */
export function generateSitemapIndex(
  sitemaps: { loc: string; lastmod?: string }[],
): string {
  const sitemapsXml = sitemaps
    .map((sitemap) => {
      return `  <sitemap>
    <loc>${escapeXml(sitemap.loc)}</loc>${
      sitemap.lastmod
        ? `
    <lastmod>${sitemap.lastmod}</lastmod>`
        : ""
    }
  </sitemap>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapsXml}
</sitemapindex>`;
}

/**
 * Split sitemap if it exceeds limits (50,000 URLs or 50MB)
 */
export function generateMultipleSitemaps(data: {
  articles: Article[];
  stories: Story[];
  magazines: Magazine[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
}): { index: string; sitemaps: Record<string, string> } {
  const baseUrl = "https://primeworldmedia.com";
  const sitemaps: Record<string, string> = {};

  // Static pages sitemap
  const staticUrls: SitemapUrl[] = [
    { loc: baseUrl, changefreq: "daily", priority: 1.0 },
    { loc: `${baseUrl}/articles`, changefreq: "daily", priority: 0.9 },
    { loc: `${baseUrl}/stories`, changefreq: "daily", priority: 0.9 },
    { loc: `${baseUrl}/magazines`, changefreq: "weekly", priority: 0.9 },
    { loc: `${baseUrl}/about`, changefreq: "monthly", priority: 0.5 },
    { loc: `${baseUrl}/contact`, changefreq: "monthly", priority: 0.5 },
  ];
  sitemaps["static"] = generateSitemap(staticUrls);

  // Articles sitemap
  const articleUrls: SitemapUrl[] = data.articles.map((article) => ({
    loc: `${baseUrl}/articles/${article.slug}`,
    changefreq: "weekly" as const,
    priority: 0.8,
    lastmod: article.updatedAt.split("T")[0],
  }));
  sitemaps["articles"] = generateSitemap(articleUrls);

  // Stories sitemap
  const storyUrls: SitemapUrl[] = data.stories.map((story) => ({
    loc: `${baseUrl}/stories/${story.slug}`,
    changefreq: "monthly" as const,
    priority: 0.8,
    lastmod: story.updatedAt.split("T")[0],
  }));
  sitemaps["stories"] = generateSitemap(storyUrls);

  // Magazines sitemap
  const magazineUrls: SitemapUrl[] = data.magazines.map((magazine) => ({
    loc: `${baseUrl}/magazines/${magazine.slug}`,
    changefreq: "monthly" as const,
    priority: 0.7,
    lastmod: magazine.publishedDate.split("T")[0],
  }));
  sitemaps["magazines"] = generateSitemap(magazineUrls);

  // Categories and tags sitemap
  const taxonomyUrls: SitemapUrl[] = [
    ...data.categories.map((cat) => ({
      loc: `${baseUrl}/category/${cat.slug}`,
      changefreq: "weekly" as const,
      priority: 0.6,
    })),
    ...data.tags.map((tag) => ({
      loc: `${baseUrl}/tag/${tag.slug}`,
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
  ];
  sitemaps["taxonomy"] = generateSitemap(taxonomyUrls);

  // Authors sitemap
  const authorUrls: SitemapUrl[] = data.authors.map((author) => ({
    loc: `${baseUrl}/authors/${author.slug}`,
    changefreq: "monthly" as const,
    priority: 0.6,
  }));
  sitemaps["authors"] = generateSitemap(authorUrls);

  // Generate sitemap index
  const indexSitemaps = Object.keys(sitemaps).map((key) => ({
    loc: `${baseUrl}/sitemap-${key}.xml`,
    lastmod: new Date().toISOString().split("T")[0],
  }));
  const index = generateSitemapIndex(indexSitemaps);

  return { index, sitemaps };
}

/**
 * Example usage in a Node.js script or API endpoint
 */
export async function generateAndSaveSitemap() {
  // In a real application, fetch this data from your database
  const data = {
    articles: [
      { slug: "ai-leadership-strategies", updatedAt: "2026-02-10T00:00:00Z" },
      { slug: "startup-funding-guide", updatedAt: "2026-02-09T00:00:00Z" },
      // ... more articles
    ],
    stories: [
      { slug: "ceo-success-story", updatedAt: "2026-02-08T00:00:00Z" },
      // ... more stories
    ],
    magazines: [
      { slug: "january-2026", publishedDate: "2026-01-01T00:00:00Z" },
      // ... more magazines
    ],
    categories: [
      { slug: "leadership" },
      { slug: "innovation" },
      // ... more categories
    ],
    tags: [
      { slug: "ai" },
      { slug: "startups" },
      // ... more tags
    ],
    authors: [
      { slug: "john-doe" },
      // ... more authors
    ],
  };

  const sitemap = generatePrimeWorldMediaSitemap(data);

  // Save to public directory
   writeFileSync('public/sitemap.xml', sitemap);
  // In Express: res.header('Content-Type', 'application/xml').send(sitemap);

  return sitemap;
}

/**
 * Dynamic sitemap generation for Next.js API route
 * Place in: pages/api/sitemap.xml.ts or app/sitemap.xml/route.ts
 */
export const exampleNextJsApiRoute = `
// pages/api/sitemap.xml.ts (Next.js Pages Router)
import { NextApiRequest, NextApiResponse } from 'next';
import { generatePrimeWorldMediaSitemap } from '@/utils/sitemap';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data from your database
    const [articles, stories, magazines, categories, tags, authors] = await Promise.all([
      fetchArticles(),
      fetchStories(),
      fetchMagazines(),
      fetchCategories(),
      fetchTags(),
      fetchAuthors(),
    ]);

    const sitemap = generatePrimeWorldMediaSitemap({
      articles,
      stories,
      magazines,
      categories,
      tags,
      authors,
    });

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}

// app/sitemap.xml/route.ts (Next.js App Router)
import { NextResponse } from 'next/server';
import { generatePrimeWorldMediaSitemap } from '@/utils/sitemap';

export async function GET() {
  const [articles, stories, magazines, categories, tags, authors] = await Promise.all([
    fetchArticles(),
    fetchStories(),
    fetchMagazines(),
    fetchCategories(),
    fetchTags(),
    fetchAuthors(),
  ]);

  const sitemap = generatePrimeWorldMediaSitemap({
    articles,
    stories,
    magazines,
    categories,
    tags,
    authors,
  });

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
`;

// Export all functions
export default {
  generateSitemap,
  generatePrimeWorldMediaSitemap,
  generateSitemapIndex,
  generateMultipleSitemaps,
  generateAndSaveSitemap,
};
