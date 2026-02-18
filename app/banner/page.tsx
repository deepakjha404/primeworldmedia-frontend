"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  LayoutDashboard,
  ImageOff,
  AlertTriangle,
  CheckCircle2,
  Link2,
  Hash,
  Tag,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

type Banner = {
  _id: string;
  image?: string;
  title?: string;
  url: string;
  position: number;
  label: string;
  status: "active" | "inactive";
  createdAt?: string;
};

export default function ManageBannersPage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Banner | null>(null);

  const API_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const res = await fetch(`${API_URL}/general/get-banner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch banners");
      const json = await res.json();
      const list: Banner[] = json.data || json.homePageBanner || json || [];
      // Sort by position
      list.sort((a, b) => a.position - b.position);
      setBanners(list);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Could not load banners." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.role === "creator") fetchBanners();
  }, [isAuthenticated, user]);

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeletingId(confirmDelete._id);
    setConfirmDelete(null);
    try {
      const token = Cookies.get("token");
      const res = await fetch(
        `${API_URL}/general/delete-banner/${confirmDelete._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Delete failed");
      setBanners((prev) => prev.filter((b) => b._id !== confirmDelete._id));
      setFeedback({ type: "success", message: `"${confirmDelete.label}" banner deleted successfully.` });
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message || "Delete failed." });
    } finally {
      setDeletingId(null);
    }
  };

  // Auto-hide feedback after 3s
  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 3000);
    return () => clearTimeout(t);
  }, [feedback]);

  // ── Auth hydration hone tak wait karo ──
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 size={36} className="animate-spin text-accent" />
        <p className="text-sm">Loading…</p>
      </div>
    );
  }

  // ── Not logged in ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-center py-20">
        <Navbar />
        <h1 className="text-2xl font-bold mt-10">Please login to manage banners.</h1>
        <div className="mt-4 flex gap-4 justify-center">
          <Link href="/login"><Button>Login</Button></Link>
        </div>
      </div>
    );
  }

  // ── Logged in but not a creator ──
  if (user?.role !== "creator") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center gap-5 text-muted-foreground px-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10">
            <AlertTriangle size={32} className="text-red-500" />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
            <p className="text-sm mt-2 text-muted-foreground">
              You don't have permission to view this page.
              <br />
              Only <span className="font-semibold text-accent">Creator</span> accounts can manage banners.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Go to Homepage</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <LayoutDashboard size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Manage Banners</h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {loading ? "Loading…" : `${banners.length} banner${banners.length !== 1 ? "s" : ""} found`}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchBanners}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              Refresh
            </Button>
            <Link href="create-banner">
              <Button className="gap-2">
                <Plus size={18} />
                Create Banner
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Feedback Toast ── */}
        {feedback && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg mb-6 border transition-all ${
              feedback.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
            }`}
          >
            {feedback.type === "success" ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        {/* ── Loading State ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
            <Loader2 size={36} className="animate-spin text-accent" />
            <p className="text-sm">Fetching banners…</p>
          </div>
        ) : banners.length === 0 ? (
          /* ── Empty State ── */
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-muted-foreground border-2 border-dashed border-border rounded-2xl">
            <ImageOff size={48} className="opacity-30" />
            <div className="text-center">
              <p className="font-semibold text-foreground">No banners yet</p>
              <p className="text-sm mt-1">Upload your first homepage banner to get started.</p>
            </div>
            <Link href="/admin/upload-banner">
              <Button className="gap-2 mt-2">
                <Plus size={16} /> Create First Banner
              </Button>
            </Link>
          </div>
        ) : (
          /* ── Banner Grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Banner Image */}
                <div className="relative h-44 bg-muted overflow-hidden">
                  {banner.image ? (
                    <img
                      src={banner.image}
                      alt={banner.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <ImageOff size={28} className="opacity-40" />
                      <span className="text-xs">No image</span>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        banner.status === "active"
                          ? "bg-green-500/90 text-white"
                          : "bg-gray-500/80 text-white"
                      }`}
                    >
                      {banner.status === "active" ? "● Active" : "○ Inactive"}
                    </span>
                  </div>

                  {/* Position Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-sm">
                      #{banner.position}
                    </span>
                  </div>
                </div>

                {/* Banner Details */}
                <div className="p-4">
                  {/* Label + Title */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Tag size={12} className="text-accent" />
                      <span className="text-xs font-bold uppercase tracking-widest text-accent">
                        {banner.label}
                      </span>
                    </div>
                    {banner.title && (
                      <h3 className="font-semibold text-foreground line-clamp-1">
                        {banner.title}
                      </h3>
                    )}
                  </div>

                  {/* Meta Row */}
                  <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Hash size={11} />
                      Position {banner.position}
                    </span>
                    <span className="flex items-center gap-1 truncate max-w-[200px]">
                      <Link2 size={11} />
                      <a
                        href={banner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-accent hover:underline truncate"
                      >
                        {banner.url}
                      </a>
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-2 hover:border-red-500 hover:text-red-500 hover:bg-red-500/5 transition"
                      onClick={() => setConfirmDelete(banner)}
                      disabled={deletingId === banner._id}
                    >
                      {deletingId === banner._id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      {deletingId === banner._id ? "Deleting…" : "Delete"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Delete Confirm Modal ── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 mx-auto mb-4">
              <AlertTriangle size={28} className="text-red-500" />
            </div>

            {/* Text */}
            <h2 className="text-xl font-bold text-center mb-2">Delete Banner?</h2>
            <p className="text-sm text-muted-foreground text-center mb-1">
              Are you sure you want to delete
            </p>
            <p className="text-sm font-semibold text-center text-foreground mb-5">
              "{confirmDelete.label}"
            </p>

            {/* Preview thumbnail */}
            {confirmDelete.image && (
              <img
                src={confirmDelete.image}
                alt={confirmDelete.label}
                className="w-full h-28 object-cover rounded-lg border border-border mb-5"
              />
            )}

            <p className="text-xs text-muted-foreground text-center mb-6">
              This action cannot be undone.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600 text-white gap-2"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}