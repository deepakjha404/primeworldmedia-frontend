"use client";

import type React from "react";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Upload, FileText, BookOpen, PenTool, Layout } from "lucide-react"; // Added Layout icon
import Link from "next/link";
import Cookies from "js-cookie";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-40 w-full bg-muted animate-pulse rounded-lg" />
  ),
});
import "quill/dist/quill.snow.css";
import Footer from "@/components/Footer";

export default function CreatePostPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  // 1. Updated Type to include "stories"
  const [postType, setPostType] = useState<
    "magazine" | "news" | "article" | "stories"
  >("news");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [category, setCategory] = useState("Tech");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        ["link", "clean"],
      ],
    }),
    [],
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background text-center py-20">
        <Navbar />
        <h1 className="text-2xl font-bold">Please login to create a post.</h1>
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
      setCoverImage(file);
      const reader = new FileReader();
      reader.onload = (event) =>
        setPreviewImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  // const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) setPdfFile(file);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!coverImage) return alert("Cover image is required");

      // Magazine ke liye PDF URL check karo
      if (postType === "magazine" && !pdfUrl) {
        return alert("Magazine PDF URL is required");
      }

      const token = Cookies.get("token");

      const formData = new FormData();
      formData.append("image", coverImage);

      const data = {
        title,
        description,
        category,
        author: user?.name || "Admin",
        content: description,
        date: new Date().toISOString().split("T")[0],
        ...(postType === "magazine" && { pdf: pdfUrl }), // ✅ 'pdf' key use karo (pdfUrl nahi)
      };

      formData.append("data", JSON.stringify(data));

      let apiUrl = "";
      if (postType === "magazine") {
        apiUrl =
          "https://theglobalmagazine-backend-laka.onrender.com/api/magazines/upload-magazine";
      } else if (postType === "article") {
        apiUrl =
          "https://theglobalmagazine-backend-laka.onrender.com/api/articles/upload-article";
      } else if (postType === "stories") {
        apiUrl =
          "https://theglobalmagazine-backend-laka.onrender.com/api/stories/upload-Stories";
      } else {
        apiUrl =
          "https://theglobalmagazine-backend-laka.onrender.com/api/news/upload-news";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      router.push("/admin/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <style jsx global>{`
        .ql-toolbar.ql-snow {
          border-color: hsl(var(--border));
          background: #fff;
          border-radius: 8px 8px 0 0;
        }
        .ql-container.ql-snow {
          border-color: hsl(var(--border));
          border-radius: 0 0 8px 8px;
          font-size: 1rem;
          min-height: 250px;
        }
        .dark .ql-toolbar.ql-snow {
          background: #1a1a1a;
        }
        .dark .ql-editor {
          color: white;
        }
        .dark .ql-stroke {
          stroke: white !important;
        }
        .dark .ql-fill {
          fill: white !important;
        }
        .dark .ql-picker {
          color: white !important;
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground mb-8">
          Share your story with the community
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 3. Updated UI Grid to accommodate 4 items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => setPostType("news")}
              className={`p-4 rounded-lg border-2 transition ${postType === "news" ? "border-accent bg-accent/10 text-accent" : "border-border"}`}
            >
              <FileText className="mx-auto mb-2" /> News
            </button>
            <button
              type="button"
              onClick={() => setPostType("article")}
              className={`p-4 rounded-lg border-2 transition ${postType === "article" ? "border-accent bg-accent/10 text-accent" : "border-border"}`}
            >
              <PenTool className="mx-auto mb-2" /> Article
            </button>
            <button
              type="button"
              onClick={() => setPostType("stories")}
              className={`p-4 rounded-lg border-2 transition ${postType === "stories" ? "border-accent bg-accent/10 text-accent" : "border-border"}`}
            >
              <Layout className="mx-auto mb-2" /> Stories
            </button>
            <button
              type="button"
              onClick={() => setPostType("magazine")}
              className={`p-4 rounded-lg border-2 transition ${postType === "magazine" ? "border-accent bg-accent/10 text-accent" : "border-border"}`}
            >
              <BookOpen className="mx-auto mb-2" /> Magazine
            </button>
          </div>

          {/* ... Rest of your form fields (Title, Description, Category, Image) remain exactly the same ... */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground"
                required
              />
            </div>
            {/*Rich Text*/}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description (Rich Text) *
              </label>
              <div className="bg-background border border-border rounded-lg overflow-hidden">
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
      .floating-toolbar-editor {
        position: relative;
        max-height: 500px;
        overflow-y: auto;
      }
      
      .floating-toolbar-editor .ql-toolbar {
        position: sticky !important;
        top: 0 !important;
        z-index: 100 !important;
        background: #ffffff !important;
        border: none !important;
        border-bottom: 1px solid hsl(var(--border)) !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08) !important;
        padding: 8px !important;
      }
      
      /* Dark mode toolbar background */
      .dark .floating-toolbar-editor .ql-toolbar {
        background: #1a1a1a !important;
      }
      
      /* Toolbar icons - Light mode */
      .floating-toolbar-editor .ql-toolbar .ql-stroke {
        stroke: #444 !important;
      }
      
      .floating-toolbar-editor .ql-toolbar .ql-fill {
        fill: #444 !important;
      }
      
      .floating-toolbar-editor .ql-toolbar .ql-picker-label {
        color: #444 !important;
      }
      
      /* Toolbar icons - Dark mode */
      .dark .floating-toolbar-editor .ql-toolbar .ql-stroke {
        stroke: #e5e7eb !important;
      }
      
      .dark .floating-toolbar-editor .ql-toolbar .ql-fill {
        fill: #e5e7eb !important;
      }
      
      .dark .floating-toolbar-editor .ql-toolbar .ql-picker-label {
        color: #e5e7eb !important;
      }
      
      /* Toolbar button hover/active */
      .floating-toolbar-editor .ql-toolbar button:hover,
      .floating-toolbar-editor .ql-toolbar button.ql-active {
        background: rgba(0, 0, 0, 0.05) !important;
      }
      
      .dark .floating-toolbar-editor .ql-toolbar button:hover,
      .dark .floating-toolbar-editor .ql-toolbar button.ql-active {
        background: rgba(255, 255, 255, 0.1) !important;
      }
      
      .floating-toolbar-editor .ql-container {
        border: none !important;
        min-height: 400px;
        background: hsl(var(--background)) !important;
      }
      
      .floating-toolbar-editor .ql-editor {
        min-height: 400px;
        font-size: 16px;
        padding: 20px;
        color: #000000 !important;
      }
      
      /* Dark mode editor text */
      .dark .floating-toolbar-editor .ql-editor {
        color: #ffffff !important;
      }
      
      /* SABHI TEXT ELEMENTS KE LIYE COLOR FIX */
      .floating-toolbar-editor .ql-editor *,
      .floating-toolbar-editor .ql-editor p,
      .floating-toolbar-editor .ql-editor span,
      .floating-toolbar-editor .ql-editor div,
      .floating-toolbar-editor .ql-editor h1,
      .floating-toolbar-editor .ql-editor h2,
      .floating-toolbar-editor .ql-editor h3,
      .floating-toolbar-editor .ql-editor h4,
      .floating-toolbar-editor .ql-editor h5,
      .floating-toolbar-editor .ql-editor h6,
      .floating-toolbar-editor .ql-editor li,
      .floating-toolbar-editor .ql-editor ol,
      .floating-toolbar-editor .ql-editor ul,
      .floating-toolbar-editor .ql-editor strong,
      .floating-toolbar-editor .ql-editor b,
      .floating-toolbar-editor .ql-editor em,
      .floating-toolbar-editor .ql-editor i,
      .floating-toolbar-editor .ql-editor u,
      .floating-toolbar-editor .ql-editor s,
      .floating-toolbar-editor .ql-editor blockquote,
      .floating-toolbar-editor .ql-editor pre,
      .floating-toolbar-editor .ql-editor code {
        color: #000000 !important;
      }
      
      /* Dark mode - SABHI TEXT ELEMENTS */
      .dark .floating-toolbar-editor .ql-editor *,
      .dark .floating-toolbar-editor .ql-editor p,
      .dark .floating-toolbar-editor .ql-editor span,
      .dark .floating-toolbar-editor .ql-editor div,
      .dark .floating-toolbar-editor .ql-editor h1,
      .dark .floating-toolbar-editor .ql-editor h2,
      .dark .floating-toolbar-editor .ql-editor h3,
      .dark .floating-toolbar-editor .ql-editor h4,
      .dark .floating-toolbar-editor .ql-editor h5,
      .dark .floating-toolbar-editor .ql-editor h6,
      .dark .floating-toolbar-editor .ql-editor li,
      .dark .floating-toolbar-editor .ql-editor ol,
      .dark .floating-toolbar-editor .ql-editor ul,
      .dark .floating-toolbar-editor .ql-editor strong,
      .dark .floating-toolbar-editor .ql-editor b,
      .dark .floating-toolbar-editor .ql-editor em,
      .dark .floating-toolbar-editor .ql-editor i,
      .dark .floating-toolbar-editor .ql-editor u,
      .dark .floating-toolbar-editor .ql-editor s,
      .dark .floating-toolbar-editor .ql-editor blockquote,
      .dark .floating-toolbar-editor .ql-editor pre,
      .dark .floating-toolbar-editor .ql-editor code {
        color: #ffffff !important;
      }
      
      /* Placeholder color */
      .floating-toolbar-editor .ql-editor.ql-blank::before {
        color: #999999 !important;
      }
      
      .dark .floating-toolbar-editor .ql-editor.ql-blank::before {
        color: #666666 !important;
      }
      
      .floating-toolbar-editor .ql-editor:focus {
        outline: none;
      }
      
      /* Dropdown menu dark mode */
      .dark .ql-picker-options {
        background: #1a1a1a !important;
        border-color: hsl(var(--border)) !important;
      }
      
      .dark .ql-picker-item {
        color: #e5e7eb !important;
      }
      
      .dark .ql-picker-item:hover {
        background: rgba(255, 255, 255, 0.1) !important;
      }
    `,
                  }}
                />

                <div className="floating-toolbar-editor">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ["link", "image"],
                        ["blockquote", "code-block"],
                        ["clean"],
                      ],
                      clipboard: {
                        matchVisual: false,
                      },
                    }}
                    placeholder="Write your content here..."
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-accent text-foreground"
              >
                <option value="All">All</option>
                <option value="Business">Business</option>
                <option value="Consulting">Consulting</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Law">Law</option>
                <option value="Tech">Tech</option>
                <option value="Leaders">Leaders</option>
                <option value="Science">Science</option>
                <option value="Environment">Environment</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Lifestyle">Faishon</option>
                <option value="Lifestyle">Designing</option>
                <option value="Investment Management">
                  Investment Management
                </option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Marketing">Marketing</option>
                <option value="AI">AI</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Cover Image *
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-accent transition cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  required
                />
                <Upload className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-foreground">Click to upload image</p>
              </div>
              {previewImage && (
                <img
                  src={previewImage}
                  className="mt-4 w-40 rounded-lg border border-border"
                  alt="Preview"
                />
              )}
            </div>

            {postType === "magazine" && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Magazine PDF URL *
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/magazine.pdf"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {pdfUrl && (
                  <p className="mt-2 text-sm text-accent font-semibold">
                    PDF URL: {pdfUrl}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-6 text-lg"
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
            <Link href="/">
              <Button variant="outline" className="py-6 px-10 text-lg">
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
