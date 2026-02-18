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
} from "lucide-react";
import Footer from "@/components/Footer";
import Seo from "@/components/seo";
import { seoConfigurations } from "@/lib/seoConfig";

interface Magazine {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
}

export default function MagazinesPage() {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const API_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_URL}/magazines/getAllMagazine`);
        const json = await res.json();
        setMagazines(json.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMagazines();
  }, []);

  const filteredMagazines = magazines.filter((m) => {
    const matchCategory =
      selectedCategory === "all" ||
      m.category.toLowerCase() === selectedCategory;
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredMagazines.length / itemsPerPage) || 1;
  const currentItems = filteredMagazines.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

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
    "Fashion",
    "Designing",
  ];

  return (
    <>
      {/* ✅ UPDATED SEO - Using seo-configurations */}
      <Seo {...seoConfigurations.magazines} />

      <div className="bg-background min-h-screen transition-colors duration-300">
        <Navbar />

        {/* --- HERO SECTION: Simple & Professional --- */}
        <section className="relative pt-16 pb-10 overflow-hidden border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Our <span className="text-primary">Magazines</span>
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto mb-10">
              Browse our collection of premium digital magazines covering global
              news and trends.
            </p>

            {/* Clean Search Bar */}
            <div className="max-w-xl mx-auto relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search magazines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-12 pr-6 py-3.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* --- CATEGORY FILTER --- */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => {
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

        {/* --- MAGAZINES GRID --- */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentItems.map((magazine) => (
                  <Link
                    key={magazine._id}
                    href={`/magazine/${magazine._id}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted border border-border shadow-md group-hover:border-primary/50 transition-all duration-300">
                      <img
                        src={magazine.image || "/placeholder.svg"}
                        alt={magazine.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                          {magazine.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 mt-4 space-y-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground uppercase">
                        <Clock className="w-3 h-3" />{" "}
                        {magazine.date || "Jan 2026"}
                      </div>
                      <h3 className="text-lg font-bold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {magazine.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed flex-1">
                        {magazine.description}
                      </p>
                      <div className="pt-3 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest border-t border-border/50 group-hover:translate-x-1 transition-transform">
                        Read Now <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* --- PAGINATION --- */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-16 py-8 border-t border-border">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-lg border border-border bg-card text-foreground hover:border-primary disabled:opacity-30 transition-all shadow-sm"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg border font-bold text-sm transition-all shadow-sm ${
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
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-lg border border-border bg-card text-foreground hover:border-primary disabled:opacity-30 transition-all shadow-sm"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* --- FOOTER --- */}
        <Footer />
      </div>
    </>
  );
}