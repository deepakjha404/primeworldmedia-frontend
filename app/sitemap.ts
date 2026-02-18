import { MetadataRoute } from "next";

interface ContentItem {
  _id?: string;
  id?: string;
  slug?: string;
  updatedAt?: string;
  createdAt?: string;
  publishedDate?: string;
}

const BASE_URL = "https://primeworldmedia.com";
const API_BASE = "https://theglobalmagazine-backend-laka.onrender.com/api";
const LOGO_URL = `${BASE_URL}/logo.png`;

function resolveId(item: ContentItem): string | null {
  return item.slug || item._id || item.id || null;
}

function resolveDate(item: ContentItem): Date {
  return new Date(item.updatedAt || item.publishedDate || item.createdAt || Date.now());
}

async function fetchList(path: string, keys: string[]): Promise<ContentItem[]> {
  try {
    const response = await fetch(`${API_BASE}/${path}`, {
      next: { revalidate: 3600 },
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    for (const key of keys) {
      if (Array.isArray(data?.[key])) return data[key];
    }

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0, images: [LOGO_URL] },
    { url: `${BASE_URL}/magazines`, lastModified: now, changeFrequency: "weekly", priority: 0.9, images: [LOGO_URL] },
    { url: `${BASE_URL}/stories`, lastModified: now, changeFrequency: "daily", priority: 0.9, images: [LOGO_URL] },
    { url: `${BASE_URL}/articles`, lastModified: now, changeFrequency: "daily", priority: 0.9, images: [LOGO_URL] },
    { url: `${BASE_URL}/news`, lastModified: now, changeFrequency: "daily", priority: 0.9, images: [LOGO_URL] },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8, images: [LOGO_URL] },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8, images: [LOGO_URL] },
    { url: `${BASE_URL}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3, images: [LOGO_URL] },
    { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3, images: [LOGO_URL] },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3, images: [LOGO_URL] },
  ];

  const [articles, stories, magazines, news] = await Promise.all([
    fetchList("articles/get-Article", ["articles", "Article", "data"]),
    fetchList("stories/get-stories", ["stories", "Story", "Stories", "data"]),
    fetchList("magazines/getAllMagazine", ["magazines", "data"]),
    fetchList("news/get-news", ["news", "data"]),
  ]);

  const articlePages: MetadataRoute.Sitemap = articles
    .map((item) => {
      const id = resolveId(item);
      if (!id) return null;

      return {
        url: `${BASE_URL}/article/${id}`,
        lastModified: resolveDate(item),
        changeFrequency: "weekly" as const,
        priority: 0.8,
        images: [LOGO_URL],
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const storyPages: MetadataRoute.Sitemap = stories
    .map((item) => {
      const id = resolveId(item);
      if (!id) return null;

      return {
        url: `${BASE_URL}/stories/${id}`,
        lastModified: resolveDate(item),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: [LOGO_URL],
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const magazinePages: MetadataRoute.Sitemap = magazines
    .map((item) => {
      const id = resolveId(item);
      if (!id) return null;

      return {
        url: `${BASE_URL}/magazine/${id}`,
        lastModified: resolveDate(item),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: [LOGO_URL],
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const newsPages: MetadataRoute.Sitemap = news
    .map((item) => {
      const id = resolveId(item);
      if (!id) return null;

      return {
        url: `${BASE_URL}/news/${id}`,
        lastModified: resolveDate(item),
        changeFrequency: "daily" as const,
        priority: 0.8,
        images: [LOGO_URL],
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  return [
    ...staticPages,
    ...articlePages,
    ...storyPages,
    ...magazinePages,
    ...newsPages,
  ];
}
