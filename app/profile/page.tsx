"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Upload,
  Mail,
  Calendar,
  FileText,
  BookOpen,
  Pencil,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  ScrollText,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const { isAuthenticated, user, updateProfile, uploadAvatar, logout } =
    useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<any[]>([]);

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const API_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("token");
        if (!token) return;

        // Fetch all data with proper error handling
        const [magRes, newsRes, articleRes, storiesRes] = await Promise.all([
          fetch(`${API_URL}/magazines/getUserMagazine`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => null),
          fetch(`${API_URL}/news/getYour-news`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => null),
          fetch(`${API_URL}/articles/getYour-Article`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => null),
          fetch(`${API_URL}/stories/getYour-Stories`, {
            headers: { Authorization: `Bearer ${token}` },
          }).catch(() => null),
        ]);

        // Parse responses with error handling
        let mags: any[] = [];
        let news: any[] = [];
        let articles: any[] = [];
        let stories: any[] = [];

        // Magazines
        if (magRes && magRes.ok) {
          try {
            const magData = await magRes.json();
            mags = Array.isArray(magData.posts)
              ? magData.posts
              : magData.data || [];
          } catch (err) {
            console.error("Error parsing magazines:", err);
          }
        }

        // News
        if (newsRes && newsRes.ok) {
          try {
            const newsData = await newsRes.json();
            news = Array.isArray(newsData.news)
              ? newsData.news
              : newsData.data || [];
          } catch (err) {
            console.error("Error parsing news:", err);
          }
        }

        // Articles
        if (articleRes && articleRes.ok) {
          try {
            const contentType = articleRes.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const articleData = await articleRes.json();
              articles = Array.isArray(articleData.articles)
                ? articleData.articles
                : articleData.data || [];
            } else {
              console.warn("Articles endpoint returned non-JSON response");
            }
          } catch (err) {
            console.error("Error parsing articles:", err);
          }
        }

        // Stories
        if (storiesRes && storiesRes.ok) {
          try {
            const contentType = storiesRes.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const storiesData = await storiesRes.json();
              stories = Array.isArray(storiesData.stories)
                ? storiesData.stories
                : storiesData.data || [];
            } else {
              console.warn("Stories endpoint returned non-JSON response");
            }
          } catch (err) {
            console.error("Error parsing stories:", err);
          }
        }

        const combined = [
          ...mags.map((m: any) => ({ ...m, type: "magazine" })),
          ...news.map((n: any) => ({ ...n, type: "news" })),
          ...articles.map((a: any) => ({ ...a, type: "article" })),
          ...stories.map((s: any) => ({ ...s, type: "stories" })),
        ];

        setUserPosts(combined);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [isAuthenticated]);

  // --- Stats Calculation ---
  const magazinesCount = userPosts.filter((p) => p.type === "magazine").length;
  const newsCount = userPosts.filter((p) => p.type === "news").length;
  const articlesCount = userPosts.filter((p) => p.type === "article").length;
  const storiesCount = userPosts.filter((p) => p.type === "stories").length;

  // --- Pagination Logic ---
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(userPosts.length / postsPerPage);

  const handleDelete = async (postId: string, type: string) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this ${type}?`,
    );
    if (!confirmDelete) return;

    try {
      const token = Cookies.get("token");
      let endpoint = "";
      let method = "PUT";

      switch (type) {
        case "news":
          endpoint = `${API_URL}/news/deleteMagazine/${postId}`;
          method = "PUT";
          break;
        case "magazine":
          endpoint = `${API_URL}/magazines/deleteMagazine/${postId}`;
          method = "PUT";
          break;
        case "article":
          endpoint = `${API_URL}/articles/deleteMagazine/${postId}`;
          method = "PUT";
          break;
        case "stories":
          endpoint = `${API_URL}/stories/deleteMagazine/${postId}`;
          method = "PUT";
          break;
        default:
          return;
      }

      const res = await fetch(endpoint, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setUserPosts((prev) => prev.filter((post) => post._id !== postId));
        alert(
          `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`,
        );
      } else {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to delete" }));
        alert(errorData.message || "Error deleting post");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting post");
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Profile Header */}
        <div className="bg-card border rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative group">
              <img
                src={user?.avatar || "/placeholder.svg"}
                className="w-32 h-32 rounded-full border-4 border-accent object-cover shadow-md"
                alt="Profile"
              />
              <label className="absolute bottom-1 right-1 bg-accent p-2 rounded-full cursor-pointer text-white hover:scale-110 transition shadow-lg">
                {isUploading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                <input
                  type="file"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setIsUploading(true);
                      const url = await uploadAvatar(file);
                      await updateProfile({ avatar: url });
                      setIsUploading(false);
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold">{user?.name}</h1>
                  <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start mt-2">
                    <Mail className="w-4 h-4" /> {user?.email}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={logout}
                  className="rounded-full px-6"
                >
                  Logout
                </Button>
              </div>
              <div className="mt-6 bg-muted/30 p-4 rounded-xl relative group">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      className="flex-1 bg-background border rounded-lg px-3 py-2 text-sm"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        updateProfile({ bio });
                        setIsEditing(false);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-sm italic text-foreground/80">
                      {bio || "Add a bio to tell people about yourself..."}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-accent/10"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- Updated Stats Grid with 5 Cards --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-card border p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-accent">{userPosts.length}</p>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">
              Total Posts
            </p>
          </div>
          <div className="bg-card border p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-blue-600">{magazinesCount}</p>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">
              Magazines
            </p>
          </div>
          <div className="bg-card border p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-green-600">{newsCount}</p>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">
              News
            </p>
          </div>
          <div className="bg-card border p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-purple-600">
              {articlesCount}
            </p>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">
              Articles
            </p>
          </div>
          <div className="bg-card border p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
            <p className="text-3xl font-bold text-orange-600">{storiesCount}</p>
            <p className="text-xs uppercase font-bold text-muted-foreground tracking-widest mt-1">
              Stories
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex items-center justify-between mb-8 border-b pb-4">
          <h2 className="text-2xl font-bold">My Published Content</h2>

          {/* Naya Button */}
          <button
            onClick={() => (window.location.href = "/banner")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Tags
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin w-12 h-12 text-accent" />
          </div>
        ) : userPosts.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
            <p className="text-muted-foreground">
              You haven't published anything yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <div
                  key={post._id}
                  className="group relative bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <Link
                    href={
                      post.type === "news"
                        ? `/news/${post._id}`
                        : post.type === "article"
                          ? `/article/${post._id}`
                          : post.type === "stories"
                            ? `/stories/${post._id}`
                            : `/magazine/${post._id}`
                    }
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={post.image || "/placeholder.svg"}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        alt={post.title}
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {post.type === "magazine" ? (
                        <BookOpen className="w-3 h-3 text-blue-500" />
                      ) : post.type === "article" ? (
                        <Newspaper className="w-3 h-3 text-purple-500" />
                      ) : post.type === "stories" ? (
                        <ScrollText className="w-3 h-3 text-orange-500" />
                      ) : (
                        <FileText className="w-3 h-3 text-green-500" />
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                        {post.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-accent transition">
                      {post.title}
                    </h3>
                  </div>

                  {/* Action Overlays */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-9 w-9 rounded-full shadow-lg"
                      onClick={() => router.push(`/edit-post/${post._id}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-9 w-9 rounded-full shadow-lg"
                      onClick={() => handleDelete(post._id, post.type)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-6">
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <div className="text-sm font-medium">
                  Page <span className="text-accent">{currentPage}</span> of{" "}
                  {totalPages}
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      {/* --- Your Exact Footer --- */}
      <Footer />
    </div>
  );
}
