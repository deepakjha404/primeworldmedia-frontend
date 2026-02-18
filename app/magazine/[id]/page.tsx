"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  ArrowRight,
  Eye,
  BookOpen,
  MessageCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { SoftFlipbookViewer } from "@/components/advanced-flipbook-viewer";
import Footer from "@/components/Footer";
import Seo from "@/components/seo";
import { seoConfigurations } from "@/lib/seoConfig";

interface Magazine {
  _id: string;
  title: string;
  description: string;
  content?: string;
  image: string;
  category: string;
  date: string;
  author: string;
  views?: number;
  pdf?: string;
}

interface RelatedMagazine {
  id: string;
  title: string;
  image: string;
  category: string;
}

export default function MagazineDetailPage() {
  const params = useParams();
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [relatedMagazines, setRelatedMagazines] = useState<RelatedMagazine[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [completion, setCompletion] = useState(0);

  const API_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

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

  const fetchRelatedMagazines = useCallback(
    async (category: string, currentId: string) => {
      try {
        const res = await fetch(`${API_URL}/magazines/getAllMagazine`);
        if (!res.ok) throw new Error("Failed to fetch related");
        const json = await res.json();
        const filtered = (json.data || [])
          .filter((m: any) => m.category === category && m._id !== currentId)
          .slice(0, 12)
          .map((m: any) => ({
            id: m._id,
            title: m.title,
            image: m.image,
            category: m.category,
          }));
        setRelatedMagazines(filtered);
      } catch (error) {
        console.error("Related fetch error:", error);
      }
    },
    [API_URL],
  );

  const fetchMagazineDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${API_URL}/magazines/getMagazineById/${params.id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch magazine");
      const json = await res.json();
      const magData = json.data;
      setMagazine(magData);
      if (magData) {
        await fetchRelatedMagazines(magData.category, magData._id);
      }
    } catch (error) {
      console.error(error);
      setMagazine(null);
    } finally {
      setIsLoading(false);
    }
  }, [params.id, API_URL, fetchRelatedMagazines]);

  useEffect(() => {
    fetchMagazineDetail();
  }, [fetchMagazineDetail]);

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground animate-pulse font-bold tracking-widest">
            LOADING MAGAZINE...
          </p>
        </div>
      </div>
    );
  }

  if (!magazine) {
    return (
      <div className="bg-background min-h-screen text-center py-20">
        <Navbar />
        <p className="mb-4">Magazine not found</p>
        <Link href="/magazines" className="text-accent hover:underline">
          Back to magazines
        </Link>
      </div>
    );
  }

  const magazineSeo = seoConfigurations.createMagazineSeo(
    magazine.title,
    magazine.date || "Latest Issue",
    magazine.description || "",
    magazine.date || new Date().toISOString(),
    magazine.image || "https://primeworldmedia.com/logo.png",
    magazine._id,
  );

  return (
    <>
      <Seo {...magazineSeo} />
      <div className="bg-background min-h-screen selection:bg-accent/30">
      <Navbar />

      <div
        className="fixed top-0 left-0 h-[4px] bg-accent z-[100] transition-all duration-150 shadow-[0_0_10px_rgba(var(--accent),0.5)]"
        style={{ width: `${completion}%` }}
      />

      <section className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/magazines"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:underline"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Library
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header without Author/Views */}
          <header className="space-y-6 text-center">
            <div className="flex items-center gap-3 justify-center">
              <span className="bg-accent text-white px-3 py-1 text-[10px] font-black uppercase tracking-tighter">
                {magazine.category}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-balance">
              {magazine.title}
            </h1>
          </header>

          {/* Interactive PDF Section - Full Width Image Like View */}
          <div className="lg:col-span-12">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/5 blur-3xl -z-10 rounded-full" />
              {/* FULL WIDTH FLIPBOOK SECTION */}
              {magazine.pdf && (
                <section className="w-full bg-transparent overflow-hidden">
                  {/* Header Info (Optional - matches your current style) */}
                  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <BookOpen className="w-3 h-3 text-accent" /> Digital Edition
                  </div>

                  {/* Magazine Container: Pura Wide aur Height Controlled */}
                  <div className="w-full relative flex justify-center bg-transparent">
                    {/* Height kam karne ke liye yahan h-[500px] ya h-[60vh] try karein. 
          Ye parent container flipbook ki height ko constrain karega.
      */}
                    <div className="w-full h-[500px] md:h-[700px] overflow-hidden flex items-center justify-center">
                      <SoftFlipbookViewer
                        pdfUrl={magazine.pdf}
                        title={magazine.title}
                      />
                    </div>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* RELATED MAGAZINES - Original Design Kept */}
      {relatedMagazines.length > 0 && (
        <section className="bg-card/30 border-t border-border py-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div className="space-y-2">
                <span className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
                  Recommendations
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  More from{" "}
                  <span className="text-accent">{magazine.category}</span>
                </h2>
              </div>
              <div className="hidden md:flex items-center gap-2 text-muted-foreground text-sm font-medium">
                <span>Swipe or use Shift + Scroll</span>
                <ArrowRight className="w-4 h-4 animate-bounce-x" />
              </div>
            </div>

            <div className="relative">
              <div
                className="flex overflow-x-auto gap-6 pb-10 scrollbar-hide snap-x snap-mandatory touch-pan-x"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {relatedMagazines.map((related) => (
                  <Link
                    key={related.id}
                    href={`/magazine/${related.id}`}
                    className="group flex-shrink-0 w-[280px] md:w-[320px] snap-start"
                  >
                    <div className="relative bg-background border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 h-full flex flex-col">
                      <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                        <img
                          src={
                            related.image ||
                            "/placeholder.svg?height=400&width=300"
                          }
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                          MAGAZINE
                        </div>
                      </div>
                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors line-clamp-2">
                          {related.title}
                        </h3>
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-[10px] font-black uppercase text-accent tracking-wider">
                            {related.category}
                          </span>
                          <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                            <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <style jsx global>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none !important;
              }
              .scrollbar-hide {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
              }
              @keyframes bounce-x {
                0%,
                100% {
                  transform: translateX(0);
                }
                50% {
                  transform: translateX(5px);
                }
              }
              .animate-bounce-x {
                animation: bounce-x 1s infinite;
              }
            `}</style>
          </div>
        </section>
      )}

      {/* FOOTER - Original Design Kept */}
      <Footer/>
    </div>
    </>
  );
}
