"use client";

import { Navbar } from "@/components/navbar";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Eye, Users, FileText, Zap } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: "news" | "magazine";
  category: string;
  date: string;
  author: string;
  status: "draft" | "published";
}

interface Stats {
  totalArticles: number;
  totalMagazines: number;
  totalUsers: number;
  publishedContent: number;
}

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalArticles: 8,
    totalMagazines: 6,
    totalUsers: 1,
    publishedContent: 14,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/");
    } else {
      fetchDashboardData();
    }
  }, [isAuthenticated, user, router]);

  const fetchDashboardData = () => {
    setIsLoading(true);
    try {
      const storedContent = localStorage.getItem("userContent");
      const userContent: ContentItem[] = storedContent
        ? JSON.parse(storedContent)
        : [];

      // Combine with default mock content
      const mockContent: ContentItem[] = [
        {
          id: "1",
          title: "Revolutionary AI Transforms Global Industries",
          type: "news",
          category: "Tech",
          date: "Today",
          author: "Dr. Sarah Chen",
          status: "published",
        },
        {
          id: "2",
          title: "Global Markets Hit Record Highs",
          type: "news",
          category: "Business",
          date: "Today",
          author: "James Mitchell",
          status: "published",
        },
        {
          id: "3",
          title: "Climate Change Summit Reaches Historic Agreement",
          type: "news",
          category: "World",
          date: "Today",
          author: "Elena Rodriguez",
          status: "published",
        },
      ];

      setContent([...userContent, ...mockContent].slice(0, 10));
      setStats({
        totalArticles: 8 + userContent.filter((c) => c.type === "news").length,
        totalMagazines:
          6 + userContent.filter((c) => c.type === "magazine").length,
        totalUsers: 1,
        publishedContent:
          14 + userContent.filter((c) => c.status === "published").length,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) return;
    const storedContent = localStorage.getItem("userContent");
    if (storedContent) {
      const userContent = JSON.parse(storedContent);
      const updated = userContent.filter((c: ContentItem) => c.id !== id);
      localStorage.setItem("userContent", JSON.stringify(updated));
      setContent(content.filter((item) => item.id !== id));
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">
            You do not have access to this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Admin Header */}
      <section className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Admin Dashboard
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Manage your content and monitor platform activity
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link
                href="/admin/create-news"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary-foreground px-4 py-2 rounded font-semibold hover:opacity-90 transition text-sm"
              >
                <Plus className="w-4 h-4" />
                New Article
              </Link>
              <Link
                href="/admin/create-magazine"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary-foreground px-4 py-2 rounded font-semibold hover:opacity-90 transition text-sm"
              >
                <Plus className="w-4 h-4" />
                New Magazine
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Total Articles
              </span>
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold">
              {stats.totalArticles}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Total Magazines
              </span>
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold">
              {stats.totalMagazines}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Published
              </span>
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold">
              {stats.publishedContent}
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-xs sm:text-sm">
                Total Users
              </span>
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold">{stats.totalUsers}</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 font-semibold transition border-b-2 text-sm whitespace-nowrap ${
              activeTab === "overview"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-4 py-3 font-semibold transition border-b-2 text-sm whitespace-nowrap ${
              activeTab === "content"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            All Content
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-3 font-semibold transition border-b-2 text-sm whitespace-nowrap ${
              activeTab === "settings"
                ? "border-accent text-accent"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Settings
          </button>
        </div>

        {/* Content Tabs */}
        {activeTab === "overview" && (
          <div className="pb-12 space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-6">
                Recent Content
              </h3>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <div className="space-y-3">
                  {content.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No content yet
                    </p>
                  ) : (
                    content.map((item) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs uppercase px-2 py-1 bg-accent/10 text-accent rounded">
                              {item.type}
                            </span>
                            <h4 className="font-semibold line-clamp-1 text-sm">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span>{item.category}</span>
                            <span>{item.date}</span>
                            <span>{item.author}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                              item.status === "published"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-yellow-500/10 text-yellow-400"
                            }`}
                          >
                            {item.status}
                          </span>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 hover:bg-red-500/10 rounded transition"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="pb-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-6">All Content</h3>
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading...
              </div>
            ) : content.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No content yet
              </p>
            ) : (
              <div className="space-y-3">
                {content.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-card border border-border rounded-lg hover:border-accent transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs uppercase px-2 py-1 bg-accent/10 text-accent rounded">
                          {item.type}
                        </span>
                        <h4 className="font-semibold line-clamp-1 text-sm">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span>{item.category}</span>
                        <span>{item.date}</span>
                        <span>{item.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                          item.status === "published"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {item.status}
                      </span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-500/10 rounded transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="pb-12 space-y-6">
            <div className="bg-card border border-border rounded-lg p-5 space-y-4">
              <h3 className="font-bold text-sm sm:text-base">
                Platform Settings
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <span className="text-xs sm:text-sm">Maintenance Mode</span>
                  <button className="px-3 py-1 text-xs bg-muted rounded hover:bg-muted/80 transition">
                    Disable
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <span className="text-xs sm:text-sm">User Registration</span>
                  <button className="px-3 py-1 text-xs bg-accent/20 text-accent rounded hover:bg-accent/30 transition">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <footer className="bg-card border-t border-border mt-16 sm:mt-24 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-accent tracking-tighter mb-4">
                  THE GLOBAL MEDIA
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Elevating digital journalism through premium storytelling and
                  global perspectives. Join our community of over 100,000+
                  informed readers.
                </p>
              </div>
              <div className="flex gap-4">
                {/* Social Icons Placeholder - replace with actual Lucide icons if needed */}
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">TW</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">IN</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <span className="text-xs font-bold">FB</span>
                </a>
              </div>
            </div>

            {/* Explore Section */}
            <div>
              <h4 className="font-bold mb-6 text-foreground text-sm uppercase tracking-widest">
                Explore Content
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/news"
                    className="hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all" />{" "}
                    Latest News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/magazines"
                    className="hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all" />{" "}
                    Digital Magazines
                  </Link>
                </li>
                <li>
                  <Link
                    href="/archive"
                    className="hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all" />{" "}
                    Archive
                  </Link>
                </li>
                <li>
                  <Link
                    href="/featured"
                    className="hover:text-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all" />{" "}
                    Editor's Choice
                  </Link>
                </li>
              </ul>
            </div>

            {/* Office Section */}
            <div>
              <h4 className="font-bold mb-6 text-foreground text-sm uppercase tracking-widest">
                The Hub
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-accent transition-colors"
                  >
                    About the Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-accent transition-colors"
                  >
                    Work with Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/advertise"
                    className="hover:text-accent transition-colors"
                  >
                    Advertise
                  </Link>
                </li>
                <li className="pt-2">
                  <p className="text-foreground font-semibold mb-1">
                    Jaipur Office:
                  </p>
                  <p className="text-xs italic leading-relaxed">
                    Malviya Nagar, Jaipur, Rajasthan, 302017
                  </p>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h4 className="font-bold mb-6 text-foreground text-sm uppercase tracking-widest">
                Newsletter
              </h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Get the week's best stories delivered straight to your inbox.
              </p>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-muted border border-border rounded-lg px-4 py-2.5 text-xs focus:ring-2 focus:ring-accent outline-none"
                />
                <button className="w-full bg-accent text-primary-foreground text-xs font-bold py-2.5 rounded-lg hover:bg-accent/90 transition-all">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <Link href="/privacy" className="hover:text-accent transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-accent transition">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-accent transition">
                Cookie Policy
              </Link>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">
              &copy; 2026 THE GLOBAL MEDIA. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
