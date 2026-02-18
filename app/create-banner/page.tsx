"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Link2,
  LayoutDashboard,
  Hash,
  Tag,
  ToggleRight,
  ImageIcon,
  CheckCircle2,
  AlertCircle,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import Footer from "@/components/Footer";

type Status = "Active" | "Archived";

export default function UploadBannerPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [destination, setDestination] = useState("");
  const [position, setPosition] = useState<number | "">("");
  const [label, setLabel] = useState("");
  const [status, setStatus] = useState<Status>("Active");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-center py-20">
        <Navbar />
        <h1 className="text-2xl font-bold">Please login to upload a banner.</h1>
        <div className="mt-4 flex gap-4 justify-center">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline">Sign Up</Button>
          </Link>
        </div>
      </div>
    );
  }

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
      if (!image) {
        setFeedback({ type: "error", message: "Banner image is required." });
        return;
      }
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

      const token = Cookies.get("token");

      const formData = new FormData();
      formData.append("image", image);

      const data = {
        title: title.trim() || undefined,
        url,
        destination: destination.trim(),
        position: Number(position),
        label: label.trim(),
        status,
      };

      formData.append("data", JSON.stringify(data));

      const response = await fetch(
        "https://theglobalmagazine-backend-laka.onrender.com/api/general/upload-banner",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.message || "Upload failed. Please try again.");
      }

      setFeedback({
        type: "success",
        message: "Banner uploaded successfully! Redirecting…",
      });

      setTimeout(() => router.push("/admin/dashboard"), 1500);
    } catch (error: any) {
      setFeedback({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-accent/10 text-accent">
              <LayoutDashboard size={22} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Upload Home Banner
            </h1>
          </div>
          <p className="text-muted-foreground ml-[52px]">
            Add a new promotional banner to the homepage carousel.
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

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* ── Image Upload ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-3">
              <ImageIcon size={15} className="text-accent" />
              Banner Image <span className="text-accent">*</span>
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
                    className="w-full max-h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white">
                    <Upload size={24} />
                    <span className="text-sm font-medium">Change Image</span>
                  </div>
                </div>
              ) : (
                <div className="py-14 flex flex-col items-center justify-center text-muted-foreground group-hover:text-accent transition-colors">
                  <Upload size={32} className="mb-3" />
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

            {previewImage && (
              <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                <CheckCircle2 size={12} className="text-green-500" />
                {image?.name}
              </p>
            )}
          </div>

          {/* ── Title (optional) ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Tag size={15} className="text-accent" />
              Title{" "}
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
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Users will be taken to this URL when they click the banner.
            </p>
          </div>

          {/* ── Destination ── */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <MapPin size={15} className="text-accent" />
              Destination <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Paris, France"
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground placeholder:text-muted-foreground transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              The destination this banner is associated with.
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
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                placeholder="e.g. 1"
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
              {(["Active", "Archived"] as Status[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-3 rounded-lg border-2 text-sm font-semibold capitalize transition ${
                    status === s
                      ? s === "Active"
                        ? "border-green-500 bg-green-500/10 text-green-600 dark:text-green-400"
                        : "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400"
                      : "border-border text-muted-foreground hover:border-accent"
                  }`}
                >
                  {s === "Active" ? "✓ Active" : "✕ Inactive"}
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
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Uploading…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Upload size={18} />
                  Upload Banner
                </span>
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
