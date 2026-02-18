"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  Eye,
  TrendingUp,
  Bookmark,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import { ShareButtons } from "@/components/share-buttons";
import Footer from "@/components/Footer";
import Seo from "@/components/seo";
import { seoConfigurations } from "@/lib/seoConfig";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
  views?: number;
}

export default function ArticleDetailPage() {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [completion, setCompletion] = useState(0);

  const API_BASE = "https://theglobalmagazine-backend-laka.onrender.com/api";

  // Reading Progress Logic
  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100,
        );
      }
    };
    window.addEventListener("scroll", updateScrollCompletion);
    return () => window.removeEventListener("scroll", updateScrollCompletion);
  }, []);

  const fetchRelatedArticles = useCallback(
    async (category: string, currentId: string) => {
      try {
        const res = await fetch(`${API_BASE}/news/get-news`);
        if (!res.ok) throw new Error("Failed to fetch related news");
        const json = await res.json();
        const allNews = json.news || json.data || [];

        const filtered = allNews
          .filter(
            (n: any) =>
              n.category.toLowerCase() === category.toLowerCase() &&
              (n._id || n.id) !== currentId,
          )
          .slice(0, 12) // Fetch 12 for the bottom section
          .map((n: any) => ({
            id: n._id || n.id,
            title: n.title,
            image: n.image,
            category: n.category,
            author: n.author,
            date: n.date,
          }));

        setRelatedArticles(filtered);
      } catch (error) {
        console.error("Related fetch error:", error);
      }
    },
    [API_BASE],
  );

  const fetchArticleDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/news/getMagazineId/${params.id}`);
      if (!res.ok) throw new Error("Article not found");
      const json = await res.json();
      const a = json.news || json.data;

      const formatted: Article = {
        id: a._id || a.id,
        title: a.title,
        description: a.description,
        content: a.content,
        image: a.image,
        category: a.category,
        date: a.date,
        author: a.author,
        views: a.views,
      };

      setArticle(formatted);
      fetchRelatedArticles(formatted.category, formatted.id);
    } catch (error) {
      console.error("Main fetch error:", error);
      setArticle(null);
    } finally {
      setIsLoading(false);
    }
  }, [params.id, API_BASE, fetchRelatedArticles]);

  useEffect(() => {
    if (params.id) fetchArticleDetail();
  }, [params.id, fetchArticleDetail]);

  if (isLoading)
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-pulse">
          <h2 className="text-2xl font-black text-muted-foreground uppercase tracking-widest">
            LOADING NEWS...
          </h2>
        </div>
      </div>
    );

  if (!article)
    return (
      <div className="bg-background min-h-screen text-center py-20">
        <Navbar />
        <p>Article not found</p>
        <Link href="/news" className="text-accent underline font-bold">
          Back to news
        </Link>
      </div>
    );

  // Generate dynamic SEO for this news article
  const newsSeo = seoConfigurations.createNewsSeo(
    article.title,
    article.description,
    article.author,
    article.date,
    article.date,
    article.image,
    article.id,
    article.category,
    undefined,
    undefined,
  );

  return (
    <>
      <Seo {...newsSeo} />
      <div className="bg-background min-h-screen selection:bg-accent/30">
        <Navbar />

        {/* Progress Bar */}
        <div
          className="fixed top-0 left-0 h-[4px] bg-accent z-[100] transition-all duration-150"
          style={{ width: `${completion}%` }}
        />

        <section className="bg-card/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-accent"
            >
              <ChevronLeft className="w-3 h-3" /> Back to Newsroom
            </Link>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* LEFT: MAIN ARTICLE */}
            <article className="lg:col-span-8 space-y-12">
              <header className="space-y-8">
                <div className="flex items-center gap-4">
                  <span className="bg-accent text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                    {article.category}
                  </span>
                  <div className="h-px flex-1 bg-border/50" />
                </div>

                <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.95]">
                  {article.title}
                </h1>

                {/* <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent text-lg">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-muted-foreground">
                        Written By
                      </p>
                      <p className="text-sm font-bold">{article.author}</p>
                    </div>
                  </div>
                  <div className="h-8 w-px bg-border hidden sm:block" />
                  <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/80">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" /> {article.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-accent" /> {article.views || 0}{" "}
                      Reads
                    </span>
                  </div>
                </div> */}
              </header>

              <div className="relative group overflow-hidden rounded-3xl border border-border shadow-2xl">
                <img
                  src={article.image || "/placeholder.svg"}
                  className="w-full h-auto grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
                  alt="News"
                />
              </div>

            <div className="prose prose-invert max-w-none relative overflow-visible">
  {article.content ? (
    <div
      className="text-xl text-foreground/90 rich-text-wrapper drop-cap-style"
      style={{
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: "18px",
        lineHeight: "1.6",
        textAlign: "justify",
        textJustify: "inter-word",
        wordSpacing: "0.05em",
        letterSpacing: "0.01em",
        hyphens: "auto",
        WebkitHyphens: "auto",
        maxWidth: "100%",
      }}
      dangerouslySetInnerHTML={{
        __html: article.content
          .replace(/&nbsp;/g, " ")
          .replace(/\s+/g, " "),
      }}
    />
  ) : (
    <p className="italic text-muted-foreground text-left px-4">
      Breaking details emerging...
    </p>
  )}

  <style jsx global>{`
    /* TEXT COLOR FIX - Dono modes ke liye */
    .rich-text-wrapper,
    .rich-text-wrapper *,
    .rich-text-wrapper p,
    .rich-text-wrapper span,
    .rich-text-wrapper div,
    .rich-text-wrapper h1,
    .rich-text-wrapper h2,
    .rich-text-wrapper h3,
    .rich-text-wrapper h4,
    .rich-text-wrapper h5,
    .rich-text-wrapper h6,
    .rich-text-wrapper li,
    .rich-text-wrapper strong,
    .rich-text-wrapper b,
    .rich-text-wrapper em,
    .rich-text-wrapper i,
    .rich-text-wrapper u,
    .rich-text-wrapper blockquote {
      color: hsl(var(--foreground)) !important;
    }

    /* Newspaper Layout Fix - Gaps hatane ke liye */
    .rich-text-wrapper p {
      margin-bottom: 1.8rem !important;
      text-align: justify !important;
      line-height: 1.8;
      text-justify: inter-word;
    }

    /* Lists ko properly display karne ke liye */
    .rich-text-wrapper ul,
    .rich-text-wrapper ol {
      margin-left: 2rem !important;
      margin-bottom: 1.8rem !important;
      padding-left: 0.5rem !important;
      list-style-position: outside !important;
    }

    .rich-text-wrapper ul {
      list-style-type: disc !important;
    }

    .rich-text-wrapper ol {
      list-style-type: decimal !important;
    }

    .rich-text-wrapper li {
      margin-bottom: 0.8rem !important;
      line-height: 1.8 !important;
      text-align: left !important;
      display: list-item !important;
    }

    /* Nested lists */
    .rich-text-wrapper ul ul,
    .rich-text-wrapper ol ol,
    .rich-text-wrapper ul ol,
    .rich-text-wrapper ol ul {
      margin-left: 1.5rem !important;
      margin-top: 0.5rem !important;
    }

    /* Headings ko bhi fix karo agar koi ho */
    .rich-text-wrapper h1,
    .rich-text-wrapper h2,
    .rich-text-wrapper h3,
    .rich-text-wrapper h4,
    .rich-text-wrapper h5,
    .rich-text-wrapper h6 {
      margin-top: 2rem !important;
      margin-bottom: 1rem !important;
      font-weight: bold !important;
      line-height: 1.3 !important;
      text-align: left !important;
    }

    /* TABLE STYLING - FORCEFULLY VISIBLE BORDERS */
    .rich-text-wrapper table {
      width: 100% !important;
      border-collapse: separate !important;
      border-spacing: 0 !important;
      margin: 2rem 0 !important;
      background-color: transparent !important;
      border: 2px solid #000 !important;
      display: table !important;
    }

    /* Dark mode ke liye table border */
    @media (prefers-color-scheme: dark) {
      .rich-text-wrapper table {
        border: 2px solid #fff !important;
      }
      .rich-text-wrapper th,
      .rich-text-wrapper td {
        border: 1px solid #fff !important;
      }
    }

    /* Light mode ke liye table border */
    @media (prefers-color-scheme: light) {
      .rich-text-wrapper table {
        border: 2px solid #000 !important;
      }
      .rich-text-wrapper th,
      .rich-text-wrapper td {
        border: 1px solid #000 !important;
      }
    }

    .rich-text-wrapper thead {
      background-color: hsl(var(--muted) / 0.5) !important;
    }

    /* HAR CELL KA STRONG BORDER */
    .rich-text-wrapper th,
    .rich-text-wrapper td {
      padding: 0.75rem 1rem !important;
      text-align: left !important;
      color: hsl(var(--foreground)) !important;
      border: 1px solid #000 !important;
      line-height: 1.6 !important;
      vertical-align: top !important;
      background-color: transparent !important;
    }

    .rich-text-wrapper th {
      font-weight: 700 !important;
      background-color: hsl(var(--muted) / 0.3) !important;
    }

    /* Alternate row colors */
    .rich-text-wrapper tbody tr:nth-child(even) td {
      background-color: hsl(var(--muted) / 0.1) !important;
    }

    /* Table responsive */
    @media (max-width: 768px) {
      .rich-text-wrapper table {
        display: block !important;
        overflow-x: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }
    }

    /* Red Drop Cap (A) Alignment */
    .drop-cap-style p:first-of-type::first-letter {
      font-size: 5.5rem;
      font-weight: 900;
      color: #ef4444;
      float: left;
      line-height: 0.75;
      margin-right: 0.8rem;
      margin-top: 0.6rem;
      font-family: inherit;
    }

    /* Large screens par text ko sidebar ke bagal tak le jaane ke liye */
    @media (min-width: 1024px) {
      .rich-text-wrapper {
        width: 92% !important;
        max-width: 92% !important;
      }
    }

    /* Mobile view fix */
    @media (max-width: 1024px) {
      .rich-text-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        padding-right: 0 !important;
        text-align: left !important;
      }
      .rich-text-wrapper p {
        text-align: left !important;
      }
      .rich-text-wrapper ul,
      .rich-text-wrapper ol {
        margin-left: 1.5rem !important;
      }
    }
  `}</style>
</div>
              {/* Author Bio Section */}
              {/* <div className="pt-12 border-t border-border">
                <div className="bg-card border-2 border-border p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center font-black text-2xl text-white flex-shrink-0 shadow-lg">
                    {article.author.charAt(0)}
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-2xl font-black tracking-tighter uppercase">
                      {article.author}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
                      Editorial Lead at THE GLOBAL MEDIA. Dedicated to delivering
                      precise, high-impact journalism from around the globe.
                    </p>
                  </div>
                </div>
              </div> */}
            </article>

            {/* RIGHT: SIDEBAR (Only 3 Items) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-12">
                {/* Reading Status */}
                <div className="hidden lg:block border-l-4 border-accent pl-6 py-2 bg-card/30 rounded-r-xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">
                    Reading Status
                  </p>
                  <div className="text-4xl font-black italic">
                    {Math.round(completion || 0)}%
                  </div>
                  <div className="w-full h-1.5 bg-muted mt-3 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${completion || 0}%` }}
                    />
                  </div>
                </div>

                {/* Sidebar Top 3 */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-accent w-5 h-5" />
                    <h4 className="text-xl font-black uppercase tracking-tighter italic">
                      Top Picks
                    </h4>
                  </div>
                  <div className="space-y-8">
                    {relatedArticles?.slice(0, 3).map((item, index) => (
                      <Link
                        key={item.id}
                        href={`/news/${item.id}`}
                        className="group flex gap-4 items-start"
                      >
                        {/* Aapke CSS variable 'chart-3' ka use kiya hai jo image se match karta hai */}
                        <span className="text-4xl font-black text-chart-3 leading-none shrink-0">
                          0{index + 1}
                        </span>

                        <div className="space-y-1">
                          <h5 className="font-bold text-sm leading-tight group-hover:text-accent transition-colors line-clamp-2 uppercase">
                            {item.title}
                          </h5>
                          <p className="text-[9px] font-black text-muted-foreground tracking-widest uppercase">
                            {item.date}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-foreground text-background p-8 rounded-2xl relative overflow-hidden group shadow-2xl">
                  <Bookmark className="absolute -right-4 -top-4 w-24 h-24 opacity-5" />
                  <h4 className="text-xl font-black leading-none mb-4 uppercase">
                    Stay <br /> Ahead.
                  </h4>
                  <p className="text-[10px] font-bold opacity-60 mb-6 tracking-widest uppercase">
                    Weekly Intelligence Report
                  </p>
                  <form
                    className="space-y-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-background/10 border border-background/20 rounded-lg px-4 py-3 text-[10px] font-bold outline-none focus:bg-background/20"
                    />
                    <button className="w-full bg-accent text-white font-black py-3 rounded-lg text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                      JOIN THE HUB
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* RELATED NEWS SLIDER */}
        {relatedArticles.length > 0 && (
          <section className="bg-card/20 border-t border-border py-6 pb-6 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-4">
                <div className="space-y-3">
                  <span className="text-accent text-xs font-black uppercase tracking-[0.4em]">
                    Editorial Picks
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                    Stay <span className="text-accent">Informed</span>
                  </h2>
                </div>
                <div className="hidden md:flex items-center gap-3 text-muted-foreground font-bold text-sm tracking-widest uppercase animate-pulse">
                  <span>Swipe</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              <div
                className="magazine-scroll-container flex overflow-x-auto gap-8 pb-2 scrollbar-hide snap-x snap-mandatory touch-pan-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {relatedArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="group flex-shrink-0 w-[280px] md:w-[350px] snap-start"
                  >
                    <div className="bg-background border border-border rounded-3xl overflow-hidden transition-all duration-300 hover:border-accent/50 hover:shadow-2xl h-full flex flex-col">
                      <div className="aspect-video overflow-hidden bg-muted relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <span className="text-[10px] font-black uppercase text-accent tracking-[0.2em]">
                            {item.category}
                          </span>
                          <h3 className="font-bold text-xl leading-tight group-hover:text-accent transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                        <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
                            {item.date}
                          </span>
                          <div className="h-10 w-10 rounded-full bg-muted group-hover:bg-accent flex items-center justify-center transition-all">
                            <ChevronRight className="w-5 h-5 group-hover:text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <style jsx global>{`
              .magazine-scroll-container::-webkit-scrollbar {
                display: none;
              }
            `}</style>
          </section>
        )}

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
