"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Loader2, // Loading spinner ke liye
} from "lucide-react";
import Footer from "@/components/Footer";


interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export default function ArticlesPage() {
  // State for Backend Data
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://theglobalmagazine-backend-laka.onrender.com/api/articles/get-Article",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const result = await response.json();

        // --- CHECKING ARRAY LOCATION ---
        // Agar result khud array hai toh setArticles(result)
        // Agar result ke andar 'articles' key hai toh setArticles(result.articles)
        if (Array.isArray(result)) {
          setArticles(result);
        } else if (result.articles && Array.isArray(result.articles)) {
          setArticles(result.articles);
        } else if (result.data && Array.isArray(result.data)) {
          setArticles(result.data);
        } else {
          console.error("API response format is not an array:", result);
          setArticles([]); // Fallback to empty array to avoid crash
        }
      } catch (err: any) {
        setError(err.message);
        setArticles([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // ... baki code
  // Filter logic (Now using 'articles' state instead of mock data)
 const filteredArticles = articles.filter((a) => {
    const matchCategory =
      selectedCategory === "all" ||
      a.category?.toLowerCase() === selectedCategory.toLowerCase();

    const title = a.title?.toLowerCase() || "";
    const excerpt = a.excerpt?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    const matchSearch = title.includes(query) || excerpt.includes(query);

    return matchCategory && matchSearch;
  });
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const currentItems = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <div className="bg-background min-h-screen transition-colors duration-300">
        <Navbar />

        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-12 overflow-hidden border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
              Latest <span className="text-primary">Articles</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-10 leading-relaxed">
              Deep dives into technology, business, and environment from our
              expert contributors.
            </p>

            <div className="max-w-xl mx-auto relative group">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl px-6 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* --- STICKY CATEGORY FILTER --- */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* container with overflow-x-auto for scrolling */}
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
        </div>

        {/* --- ARTICLES GRID / LOADING / ERROR --- */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground animate-pulse">
                Fetching latest stories...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-destructive font-medium">
              Error: {error}. Please check if the backend is running.
            </div>
          ) : currentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentItems.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="group flex flex-col h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-500"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </div>
                      <span>{article.date}</span>
                    </div>

                    <h3 className="text-xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1">
                      {article.excerpt}
                    </p>

                    <div className="pt-4 flex items-center justify-between border-t border-border/50">
                      {/* <span className="text-xs font-semibold text-foreground italic">
                      By {article.author}
                    </span> */}
                      <div className="flex items-center gap-1 text-primary text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <p className="text-muted-foreground font-medium">
                No articles found matching your criteria.
              </p>
            </div>
          )}

          {/* --- PAGINATION --- */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-20 py-10 border-t border-border/50">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-xl border border-border bg-card text-foreground hover:border-primary disabled:opacity-30 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-11 h-11 rounded-xl border font-black text-sm transition-all ${
                        currentPage === page
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "bg-card border-border text-foreground hover:border-primary"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-3 rounded-xl border border-border bg-card text-foreground hover:border-primary disabled:opacity-30 transition-all"
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
