"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Upload,
  ChevronLeft,
  Loader2,
  Link2,
  Hash,
  Tag,
  ToggleRight,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

type Status = "active" | "inactive";

export default function EditBannerPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const bannerId = params.id as string;

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [position, setPosition] = useState<number | "">("");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState<Status>("active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const API_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  useEffect(() => {
    const fetchBanner = async () => {
      if (!isAuthenticated) return;

      try {
        const token = Cookies.get("token");

        const res = await fetch(`${API_URL}/banners/getBannerById/${bannerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const json = await res.json();
          const banner = json.data || json.banner || json;
          fillFormData(banner);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    const fillFormData = (banner: any) => {
      setTitle(banner.title || "");
      setUrl(banner.url || "");
      setPosition(banner.position ?? "");
      setLabel(banner.label || "");
      setStatus(banner.status === "inactive" ? "inactive" : "active");
      setPreviewImage(banner.image || "");
    };

    fetchBanner();
  }, [bannerId, isAuthenticated]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) =>
        setPreviewImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (event) =>
        setPreviewImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      if (!url) {
        setFeedback({ type: "error", message: "Redirect URL is required." });
        return;
      }
      if (position === "" || isNaN(Number(position))) {
        setFeedback({
          type: "error",
          message: "Position must be a valid number.",
        });
        return;
      }
      if (!label.trim()) {
        setFeedback({ type: "error", message: "Label is required." });
        return;
      }

      const token = Cookies.get("token");
      const formData = new FormData();

      if (image) formData.append("image", image);

      const data = {
        title: title.trim() || undefined,
        url,
        position: Number(position),
        label: label.trim(),
        status,
      };

      formData.append("data", JSON.stringify(data));

      const res = await fetch(`${API_URL}/banners/updateBanner/${bannerId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.message || "Update failed. Please try again.");
      }

      setFeedback({
        type: "success",
        message: "Banner updated successfully! Redirecting…",
      });

      setTimeout(() => router.push("/admin/dashboard"), 1500);
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading State ──
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );

  // ── Not Found State ──
  if (notFound)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Banner Not Found</h1>
        <Link href="/admin/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full">
        {/* Back Link */}
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 text-accent hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <LayoutDashboard size={20} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Edit Banner</h1>
          </div>
          <p className="text-muted-foreground ml-[52px]">
            Update the homepage banner details below.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`flex items-center gap-3 p-4 rounded-lg mb-6 border ${
              feedback.type === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <p className="text-sm font-medium">{feedback.message}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-7 bg-card p-6 border rounded-xl shadow-sm"
        >
          {/* Mode Badge */}
          <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <LayoutDashboard className="text-accent w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Banner Edit Mode
            </span>
          </div>

          {/* ── Image Upload ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <ImageIcon size={15} className="text-accent" />
              Banner Image
              <span className="text-muted-foreground font-normal text-xs">
                (leave empty to keep current)
              </span>
            </label>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="relative border-2 border-dashed border-border rounded-xl overflow-hidden group transition-colors hover:border-accent cursor-pointer"
            >
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Banner preview"
                    className="w-full max-h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                    <Upload size={24} />
                    <span className="text-sm font-medium">Replace Image</span>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-muted-foreground group-hover:text-accent transition-colors">
                  <Upload size={30} className="mb-3" />
                  <p className="font-medium text-sm">
                    Click or drag & drop to upload
                  </p>
                  <p className="text-xs mt-1">
                    PNG, JPG, WEBP — recommended 1920×600px
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            {image && (
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 size={12} className="text-green-500" />
                New image selected: {image.name}
              </p>
            )}
          </div>

          {/* ── Title (optional) ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Tag size={15} className="text-accent" />
              Title
              <span className="text-muted-foreground font-normal text-xs">
                (optional)
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Summer Sale Banner"
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground transition"
            />
          </div>

          {/* ── Redirect URL ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Link2 size={15} className="text-accent" />
              Redirect URL <span className="text-accent">*</span>
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              required
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Users will be taken to this URL when they click the banner.
            </p>
          </div>

          {/* ── Position + Label (2 columns) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                <Hash size={15} className="text-accent" />
                Position <span className="text-accent">*</span>
              </label>
              <input
                type="number"
                min={1}
                value={position}
                onChange={(e) =>
                  setPosition(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="e.g. 1"
                required
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground transition"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Display order in the carousel (1 = first).
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                <Tag size={15} className="text-accent" />
                Label <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Hero Banner"
                required
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground transition"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Internal reference name for this banner.
              </p>
            </div>
          </div>

          {/* ── Status Toggle ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <ToggleRight size={15} className="text-accent" />
              Status <span className="text-accent">*</span>
            </label>
            <div className="flex gap-4">
              {(["active", "inactive"] as Status[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold capitalize transition ${
                    status === s
                      ? s === "active"
                        ? "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400"
                        : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                      : "border-border text-muted-foreground hover:border-accent"
                  }`}
                >
                  {s === "active" ? "✓ Active" : "✕ Inactive"}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Only <strong>Active</strong> banners are displayed on the
              homepage.
            </p>
          </div>

          {/* ── Divider ── */}
          <div className="border-t border-border" />

          {/* ── Actions ── */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-6 text-base font-semibold"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Saving…
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Link href="/admin/dashboard">
              <Button
                variant="outline"
                type="button"
                className="py-6 px-10 text-base"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}