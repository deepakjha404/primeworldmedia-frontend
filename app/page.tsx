"use client";

import { Navbar } from "@/components/navbar";
import { MagazineCarousel } from "@/components/magazine-carousel";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSlider from "@/components/HeroSlider";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loadingScreen";
import AccessControlModal from "@/components/AccessControlModal";
import { useSearchParams, useRouter } from "next/navigation";
import Seo from "@/components/seo";
import { seoConfigurations } from "@/lib/seoConfig";

import { InfiniteMovingCardsDemo } from "@/components/testinomials";

// Interfaces
interface Article {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

interface Magazine {
  _id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
  issue: string;
  featured: boolean;
}

interface ArticlePost {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: string;
  createdAt: string;
  readTime?: string;
}

interface Ad {
  _id: string;
  image: string;
  link: string;
  isActive: boolean;
}
interface Story {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
}

// Separate component for search params logic
function AccessControlHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showAccessModal, setShowAccessModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("auth_error") === "1") {
      setShowAccessModal(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setShowAccessModal(false);
    router.replace("/", { scroll: false });
  };

  return (
    <AccessControlModal isOpen={showAccessModal} onClose={handleCloseModal} />
  );
}

function HomePageContent() {
  const [featured, setFeatured] = useState<Magazine[]>([]);
  const [allNews, setAllNews] = useState<Article[]>([]);
  const [displayNews, setDisplayNews] = useState<Article[]>([]);
  const [articles, setArticles] = useState<ArticlePost[]>([]);
  const [articleCategory, setArticleCategory] = useState("all");
  const [displayArticles, setDisplayArticles] = useState<ArticlePost[]>([]);
  const [ad, setAd] = useState<Ad | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [contentType, setContentType] = useState<"news" | "articles">("news");
  const [currentIndex, setCurrentIndex] = useState(0);

  const [stories, setStories] = useState<Story[]>([]);
  const [displayStories, setDisplayStories] = useState<Story[]>([]);
  const [storyCategory, setStoryCategory] = useState("all");

  const handleNext = (length: number) =>
    setCurrentIndex((prev) => (prev + 1) % length);
  const handlePrev = (length: number) =>
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  const BASE_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [magRes, newsRes, adRes, articleRes, storeisRes] =
          await Promise.all([
            fetch(`${BASE_URL}/magazines/getAllMagazine`),
            fetch(`${BASE_URL}/news/get-news`),
            fetch(`${BASE_URL}/ads/get-home-banner`),
            fetch(`${BASE_URL}/articles/get-Article`),
            fetch(`${BASE_URL}/stories/get-stories`),
          ]);

        const magData = await magRes.json();
        const newsData = await newsRes.json();
        const articleData = await articleRes.json();
        const storiesData = await storeisRes.json();

        const articleList = Array.isArray(articleData.articles)
          ? articleData.articles
          : articleData.data || [];

        setArticles(articleList);
        setDisplayArticles(articleList);

        try {
          const adData = await adRes.json();
          if (adData && adData.success && adData.ad) {
            setAd(adData.ad);
          } else {
            setAd({
              _id: "test-ad",
              image:
                "https://localiq.com/wp-content/uploads/2025/02/banner-ad-example-ikea.webp",
              link: "https://nike.com",
              isActive: true,
            });
          }
        } catch (e) {
          setAd({
            _id: "fallback-ad",
            image:
              "https://localiq.com/wp-content/uploads/2025/02/banner-ad-example-ikea.webp",
            link: "https://google.com",
            isActive: true,
          });
        }

        const mags = Array.isArray(magData.magazines)
          ? magData.magazines
          : magData.data || [];
        const strs = Array.isArray(storiesData.Story)
          ? storiesData.Story
          : storiesData.data || [];
        setStories(strs);
        setDisplayStories(strs);

        const featuredMags = mags.filter((m: Magazine) => m.featured === true);
        setFeatured(featuredMags.length > 0 ? featuredMags : mags.slice(0, 7));

        const news = Array.isArray(newsData.news)
          ? newsData.news
          : newsData.data || [];
        setAllNews(news);
        setDisplayNews(news);
      } catch (err) {
        console.error("Backend connectivity error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setDisplayNews(allNews);
    } else {
      const filtered = allNews.filter(
        (n) => n.category?.toLowerCase() === selectedCategory.toLowerCase(),
      );
      setDisplayNews(filtered);
    }
  }, [selectedCategory, allNews]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (articleCategory === "all") {
      setDisplayArticles(articles);
    } else {
      const filtered = articles.filter(
        (a) => a.category?.toLowerCase() === articleCategory.toLowerCase(),
      );
      setDisplayArticles(filtered);
    }
  }, [articleCategory, articles]);

  useEffect(() => {
    if (storyCategory === "all") setDisplayStories(stories);
    else
      setDisplayStories(
        stories.filter(
          (s) => s.category?.toLowerCase() === storyCategory.toLowerCase(),
        ),
      );
  }, [storyCategory, stories]);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      <Seo {...seoConfigurations.home} />
      <Suspense fallback={null}>
        <AccessControlHandler />
      </Suspense>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0.2 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-white"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-background min-h-screen overflow-x-hidden">
        <Navbar />
        <HeroSlider />

        {/* Featured updated hai Magazines Section - Spacing Reduced */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 mt-4 sm:mt-6 pb-0">
          <div className="flex items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-accent" />
              <h2 className="text-2xl sm:text-4xl font-bold">
                <Link
                  href="/magazines"
                  className="hover:text-accent transition-colors"
                >
                  Featured Magazines
                </Link>
              </h2>
            </div>

            <Link
              href="/magazines"
              className="group flex items-center gap-1.5 text-sm sm:text-base font-medium text-muted-foreground hover:text-accent transition-all"
            >
              <span className="hidden sm:inline">View More</span>
              <span className="sm:hidden">More</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-2"></p>

          {isLoading ? (
            <div className="text-center py-2">
              <div className="inline-block animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
            </div>
          ) : (
            <MagazineCarousel magazines={featured} />
          )}
        </section>
        {/* Ad Section - Fix for Single Image Upload */}
        {/* {!isLoading && ad && ad.image && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
            <Link
              href={ad.link}
              target="_blank"
              className="block relative group"
            >
              <div className="w-full h-[100px] sm:h-[160px] md:h-[200px] bg-muted rounded-2xl overflow-hidden border border-border shadow-sm group-hover:border-accent transition-all duration-300">
                <img
                  src={ad.image}
                  alt="Sponsored Advertisement"
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                  ADVERTISEMENT
                </div>
              </div>
            </Link>
          </section>
        )} */}

        {/* Latest News Section - Reduced gap (mt-16) for better flow */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-0 border-t border-border mt-6 overflow-hidden">
          {/* ================= Story ================= */}
          <div>
            <div className="mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Stories
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin w-7 h-7 border-4 border-accent border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayStories.slice(0, 6).map((story) => (
                  <Link
                    key={story._id}
                    href={`/stories/${story._id}`}
                    className="group"
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-accent hover:shadow-xl h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={story.image || "/placeholder.svg"}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="uppercase font-bold text-accent">
                            {story.category}
                          </span>
                          <span className="text-muted-foreground">
                            {story.date
                              ? new Date(story.date).toLocaleDateString()
                              : "Today"}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm sm:text-base leading-tight group-hover:text-accent">
                          {story.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                          {story.description
                            ?.replace(/<[^>]*>?/gm, "")
                            .replace(/&nbsp;/g, " ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-6">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 px-8 py-3 border border-accent/50 
        text-accent rounded-lg font-semibold hover:bg-accent/10 transition text-sm"
              >
                View More Stories
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          {/* ===== SOFT DIVIDER ===== */}
          <div className="w-full h-px bg-border mt-8 mb-4" />

          {/* ================= ARTICLES ================= */}

          <div className="mb-0">
            <div className="mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                Articles
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin w-7 h-7 border-4 border-accent border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayArticles.slice(0, 6).map((article) => (
                  <Link
                    key={article._id}
                    href={`/article/${article._id}`}
                    className="group"
                  >
                    <div className="bg-card/80 backdrop-blur border border-border rounded-xl overflow-hidden transition-all hover:shadow-lg hover:border-accent h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-1 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="uppercase font-bold text-accent">
                            {article.category}
                          </span>
                          <span className="text-muted-foreground">
                            {article.createdAt
                              ? new Date(article.createdAt).toLocaleDateString()
                              : "Today"}
                          </span>
                        </div>

                        <h3 className="font-semibold text-sm sm:text-base leading-snug group-hover:text-accent">
                          {article.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-3 flex-1">
                          {article.description
                            ?.replace(/<[^>]*>?/gm, "")
                            .replace(/&nbsp;/g, " ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-6">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-8 py-3 border border-accent/50 
        text-accent rounded-lg font-semibold hover:bg-accent/10 transition text-sm"
              >
                View More Articles
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ===== SOFT DIVIDER ===== */}
          {/* <div className="w-full h-px bg-border mt-8 mb-4" /> */}

          {/* ================= NEWS ================= */}
          {/* <div>
            <div className="mb-6">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight">
                News
              </h2>
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin w-7 h-7 border-4 border-accent border-t-transparent rounded-full" />
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayNews.slice(0, 3).map((news) => (
                  <Link
                    key={news._id}
                    href={`/news/${news._id}`}
                    className="group"
                  >
                    <div className="bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-accent hover:shadow-xl h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={news.image || "/placeholder.svg"}
                          alt={news.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="p-4 flex flex-col flex-1 space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="uppercase font-bold text-accent">
                            {news.category}
                          </span>
                          <span className="text-muted-foreground">
                            {news.date
                              ? new Date(news.date).toLocaleDateString()
                              : "Today"}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm sm:text-base leading-tight group-hover:text-accent">
                          {news.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
                          {news.description
                            ?.replace(/<[^>]*>?/gm, "")
                            .replace(/&nbsp;/g, " ")}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="text-center mt-6">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-8 py-3 border border-accent/50 
        text-accent rounded-lg font-semibold hover:bg-accent/10 transition text-sm"
              >
                View More News
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div> */}
        </section>
        {/* <div className="w-full h-px bg-border mt-8 mb-4" /> */}
        {/* <InfiniteMovingCardsDemo/> */}
        {/* Footer */}
        <Footer />

        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomePageContent />
    </Suspense>
  );
}
