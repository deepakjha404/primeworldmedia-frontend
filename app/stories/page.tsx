"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Clock,
  User,
} from "lucide-react";
import Footer from "@/components/Footer";
import Seo from "@/components/seo";
import seoConfigurations from "@/lib/seoConfig";


interface Article {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export default function StoryPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const BASE_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/stories/get-stories`);
        const json = await res.json();
        const rawData = Array.isArray(json.story)
          ? json.story
          : json.data || [];
        setArticles(rawData);
      } catch (err) {
        console.error("Failed to fetch story:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, []);

  // FIXED: Multiple category filtering
  const filteredArticles = articles.filter((a) => {
    const matchCategory =
      selectedCategory === "all" ||
      a.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = a.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const categories = [
    "All",
    "Business",
    "Consulting",
    "Finance",
    "Healthcare",
    "Education",
    "Real Estate",
    "Law",
    "Tech",
    "Leaders",
    "Science",
    "Environment",
    "Health",
    "Entertainment",
    "Lifestyle",
    "Investment Management",
    "Manufacturing",
    "Marketing",
    "AI",
    "Others",
    "Faishon",
    "Designing",
  ];

  return (
    <>
       <Seo {...seoConfigurations.stories} />
      <div className="bg-background min-h-screen text-foreground">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-16 pb-12 overflow-hidden border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              Latest <span className="text-primary">Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 font-medium">
              Stay updated with curated stories from around the world.
            </p>

            {/* Enhanced Search Bar */}
            <div className="max-w-xl mx-auto relative group">
              <input
                type="text"
                placeholder="Search story..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* --- CATEGORY FILTER --- FIXED */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => {
                    // Agar user dubara same active button pe click kare, toh reset to 'all'
                    // Ya fir normal functionality ke liye sirf setSelectedCategory(cat.toLowerCase()) rakhein
                    setSelectedCategory(cat.toLowerCase());
                    setCurrentPage(1);
                  }}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all border ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-primary"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- Story FEED --- */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <Link
                  key={article._id}
                  href={`/stories/${article._id}`}
                  className="group flex flex-col h-full"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-5 border border-border group-hover:border-primary/50 transition-all shadow-sm">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-primary text-primary-foreground text-[10px] font-black px-2 py-0.5 rounded uppercase">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase mb-3 tracking-wider">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{" "}
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed flex-1 mb-4 text-left">
                      {article.description
                        ?.replace(/<[^>]*>?/gm, "")
                        .replace(/&nbsp;/g, " ")
                        .replace(/&amp;/g, "&")
                        .trim()}
                    </p>

                    <div className="text-primary text-[10px] font-black uppercase tracking-widest border-t border-border pt-4 group-hover:translate-x-1 transition-transform">
                      Read Story →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* --- PAGINATION --- */}
          {!isLoading && totalPages > 1 && (
            <div className="mt-20 flex items-center justify-center gap-3">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-3 rounded-xl border border-border bg-card text-foreground hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl border-2 font-bold text-sm transition-all shadow-sm ${
                        currentPage === page
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-card border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-3 rounded-xl border border-border bg-card text-foreground hover:border-primary hover:text-primary disabled:opacity-30 transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </section>

        {/* --- FOOTER --- */}
        <Footer />
      </div>
    </>
  );
}
