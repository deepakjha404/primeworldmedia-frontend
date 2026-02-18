"use client";

import type React from "react";

import { Navbar } from "@/components/navbar";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload } from "lucide-react";
import Cookies from "js-cookie";

export default function CreateMagazinePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Technology",
    author: user?.name || "",
    date: new Date().toISOString().split("T")[0],
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="bg-background min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">
            You do not have access to this page.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") setPdfFile(file);
    else setError("Please upload a valid PDF file");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      if (!imageFile) return setError("Please upload a cover image");
      if (!pdfFile) return setError("Please upload a PDF file");

      const token = Cookies.get("token")
      if (!token) return setError("Please login again");

      const fd = new FormData();
      fd.append("image", imageFile);
      fd.append("pdf", pdfFile);
      fd.append("data", JSON.stringify(formData));

      const res = await fetch(
        "https://theglobalmagazine-backend-laka.onrender.com/api/magazines/upload-magazine",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Upload failed");
      }

      setSuccess("Magazine published successfully!");
      setFormData({
        title: "",
        description: "",
        content: "",
        category: "Technology",
        author: user?.name || "",
        date: new Date().toISOString().split("T")[0],
      });
      setImageFile(null);
      setPdfFile(null);
      setImagePreview("");
      setTimeout(() => router.push("/admin/dashboard"), 1500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-accent hover:underline mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold">Create New Magazine</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded">
              <p className="font-semibold mb-1">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded">
              <p className="font-semibold mb-1">Success</p>
              <p className="text-sm">{success}</p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-semibold">Magazine Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-muted/50 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Enter magazine title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={2}
              className="w-full bg-muted/50 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              placeholder="Magazine description"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Cover Image</label>
            <div className="flex items-start gap-4">
              <label className="flex-1 cursor-pointer">
                <div className="w-full bg-muted/50 border border-border rounded px-4 py-3 text-muted-foreground hover:border-accent transition flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">
                    {imageFile ? imageFile.name : "Choose cover image..."}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-20 h-28 object-cover rounded border border-border"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Upload Magazine PDF</label>
            <p className="text-xs text-muted-foreground mb-2">
              Upload a PDF file to enable interactive page-flipping for readers
            </p>
            <label className="cursor-pointer block">
              <div className="w-full bg-muted/50 border border-border rounded px-4 py-3 text-muted-foreground hover:border-accent transition flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span className="text-sm">
                  {pdfFile ? pdfFile.name : "Choose PDF file..."}
                </span>
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                required
                className="hidden"
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={8}
              className="w-full bg-muted/50 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none font-mono text-sm"
              placeholder="Full magazine content"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-muted/50 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Author</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full bg-muted/50 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Author name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Publication Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full bg-muted/50 border border-border rounded px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-accent text-primary-foreground px-6 py-3 rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {isSubmitting ? "Publishing..." : "Publish Magazine"}
            </button>
            <Link
              href="/admin/dashboard"
              className="flex-1 border border-border px-6 py-3 rounded font-semibold hover:bg-muted transition text-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
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
