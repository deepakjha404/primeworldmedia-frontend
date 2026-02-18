"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/auth-context";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Upload,
  FileText,
  BookOpen,
  ChevronLeft,
  Loader2,
  ChevronRight,
  PenTool,
  Layout,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-40 w-full bg-muted animate-pulse rounded-lg" />
  ),
});
import "quill/dist/quill.snow.css";

export default function EditPostPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  const [postType, setPostType] = useState<
    "magazine" | "news" | "article" | "stories"
  >("news");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [existingPdfUrl, setExistingPdfUrl] = useState("");
  const [category, setCategory] = useState("Tech");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const API_URL = "https://theglobalmagazine-backend-laka.onrender.com/api";

  // const modules = useMemo(
  //   () => ({
  //     toolbar: [
  //       [{ header: [1, 2, 3, false] }],
  //       ["bold", "italic", "underline", "strike"],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       [{ color: [] }, { background: [] }],
  //       ["link", "clean"],
  //     ],
  //   }),
  //   [],
  // );

  useEffect(() => {
    const fetchPost = async () => {
      if (!isAuthenticated) return;

      try {
        const token = Cookies.get("token");

        // 1. Try fetching from Magazines
        let res = await fetch(
          `${API_URL}/magazines/getMagazineById/${postId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.ok) {
          const json = await res.json();
          setPostType("magazine");
          fillFormData(json.data);
        } else {
          // 2. Try fetching from News
          const newsRes = await fetch(
            `${API_URL}/news/getMagazineId/${postId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (newsRes.ok) {
            const json = await newsRes.json();
            const post = json.data || json.news || json;
            setPostType("news");
            fillFormData(post);
          } else {
            // 3. Try fetching from Articles
            const articleRes = await fetch(
              `${API_URL}/articles/getMagazineId/${postId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              },
            );

            if (articleRes.ok) {
              const json = await articleRes.json();
              const post = json.data || json.Article || json;
              setPostType("article");
              fillFormData(post);
            } else {
              // 4. Try fetching from Stories
              const storiesRes = await fetch(
                `${API_URL}/stories/getMagazineId/${postId}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                },
              );

              if (storiesRes.ok) {
                const json = await storiesRes.json();
                const post = json.data || json.Stories || json;
                setPostType("stories");
                fillFormData(post);
              } else {
                setNotFound(true);
              }
            }
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    const fillFormData = (post: any) => {
      setTitle(post.title || "");
      setDescription(post.description || post.content || "");
      setCategory(post.category || "Tech");
      setPreviewImage(post.image || "");
      if (post.pdf) {
        setExistingPdfUrl(post.pdf);
        setPdfUrl(post.pdf);
      }
    };

    fetchPost();
  }, [postId, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = Cookies.get("token");
      const formData = new FormData();

      if (coverImage) formData.append("image", coverImage);
      // ❌ Remove this line:
      // if (pdfFile && postType === "magazine") formData.append("pdf", pdfFile);

      const data = {
        title,
        description,
        category,
        author: "",
        content: description,
        date: new Date().toISOString().split("T")[0],
        ...(postType === "magazine" && pdfUrl && { pdf: pdfUrl }),
      };

      formData.append("data", JSON.stringify(data));

      let endpoint = "";
      switch (postType) {
        case "magazine":
          endpoint = `${API_URL}/magazines/updateMagazine/${postId}`;
          break;
        case "news":
          endpoint = `${API_URL}/news/updateNews/${postId}`;
          break;
        case "article":
          endpoint = `${API_URL}/articles/updateArticle/${postId}`;
          break;
        case "stories":
          endpoint = `${API_URL}/stories/updateStories/${postId}`;
          break;
      }

      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      alert(
        `${postType.charAt(0).toUpperCase() + postType.slice(1)} updated successfully!`,
      );
      router.push("/profile");
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );

  if (notFound)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Post Not Found</h1>
        <Link href="/profile">
          <Button>Back to Profile</Button>
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

      <div className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-accent hover:underline mb-6"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Profile
        </Link>

        <h1 className="text-4xl font-bold mb-2">Edit Post</h1>
        <p className="text-muted-foreground mb-8">
          Update your {postType} details
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card p-6 border rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
            {postType === "magazine" ? (
              <BookOpen className="text-accent w-5 h-5" />
            ) : postType === "article" ? (
              <PenTool className="text-accent w-5 h-5" />
            ) : postType === "stories" ? (
              <Layout className="text-accent w-5 h-5" />
            ) : (
              <FileText className="text-accent w-5 h-5" />
            )}
            <span className="text-sm font-bold uppercase tracking-widest">
              {postType} Mode
            </span>
          </div>

          <div className="space-y-4">
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
                <option value="Investment Management">
                  Investment Management
                </option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Marketing">Marketing</option>
                <option value="AI">AI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Cover Image *
              </label>
              <div className="flex flex-col gap-4">
                {previewImage && (
                  <img
                    src={previewImage}
                    className="w-40 rounded-lg border border-border"
                    alt="Preview"
                  />
                )}
                <div className="border-2 border-dashed border-border rounded-lg p-10 text-center hover:border-accent transition cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCoverImage(file);
                        setPreviewImage(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <Upload className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-foreground">
                    {previewImage ? "Replace Image" : "Click to upload image"}
                  </p>
                </div>
              </div>
            </div>

            {postType === "magazine" && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Magazine PDF URL *
                </label>

                {/* Existing PDF URL display */}
                {existingPdfUrl && (
                  <div className="mb-3 p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">
                      Current PDF:
                    </p>
                    <a
                      href={existingPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline break-all"
                    >
                      {existingPdfUrl}
                    </a>
                  </div>
                )}

                {/* PDF URL Input */}
                <input
                  type="url"
                  placeholder="https://example.com/magazine.pdf"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                />

                {pdfUrl && pdfUrl !== existingPdfUrl && (
                  <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-semibold">
                    ✓ New PDF URL will be updated
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Link href="/profile">
              <Button variant="outline" className="py-6 px-10 text-lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>

        {/* Pagination UI Placeholder (Next/Prev) */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </Button>
          <span className="text-sm font-medium">Item Controls</span>
          <Button variant="outline" size="sm" disabled>
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
