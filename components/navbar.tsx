"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Plus, Search, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Comparison fix for TypeScript error
  const userRole = user?.role as string;
  const canCreate =
    isAuthenticated && (userRole === "creator" || userRole === "admin");

  if (!mounted) return null;

  return (
    <nav className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-50 shadow-sm font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT SECTION: LOGO & NAVIGATION */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center group shrink-0 py-1">
              {/* Width ko w-64 se start karke desktop par 350px tak kiya hai 
                taaki logo poora wide area cover kare bina quality loose kiye.
              */}
              <div className="relative h-14 w-64 sm:w-80 md:w-[250px] flex items-center justify-start transition-all duration-300">
                {/* Subtle Glow: Background ke saath match karne ke liye */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl bg-white/5 rounded-full" />

                <img
                  src={
                    theme === "dark"
                      ? "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769437620/Screenshot_2026-01-26_195427_v6kk6r.png"
                      : "https://res.cloudinary.com/de8b2z5cj/image/upload/v1769440825/Screenshot_2026-01-26_204919_hf3zgo.png"
                  }
                  alt="The Global Media Wide Logo"
                  /* 'object-contain' image ko stretch hone se bachayega.
                    'w-full' aur 'h-full' image ko container ke hisaab se max size dega.
                  */
                  className="h-full w-full object-contain object-left transition-all duration-500 group-hover:scale-[1.02] filter brightness-110 contrast-[1.05]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://cdn-icons-png.flaticon.com/512/3642/3642279.png";
                  }}
                />

                {/* Bottom Accent Line: Wide logo ke niche premium look ke liye */}
                <div className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gradient-to-r from-accent/80 to-transparent group-hover:w-full transition-all duration-700 rounded-full" />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Magazines", "Stories", "Articles"].map(
                (item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-foreground/70 hover:text-accent transition-colors font-semibold text-sm uppercase tracking-wider"
                  >
                    {item}
                  </Link>
                ),
              )}

              {isAuthenticated && userRole === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-accent hover:opacity-80 transition font-bold text-sm flex items-center gap-1.5 uppercase tracking-wider"
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT SECTION: SEARCH & ACTIONS */}
          <div className="hidden md:flex items-center gap-5">
            {/* WIDER SEARCH BAR */}
            <div className="relative group hidden lg:block">
              <input
                type="search"
                placeholder="Search stories, magazines..."
                className="bg-muted/40 border border-border/50 rounded-full pl-5 pr-12 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 w-64 focus:w-80 transition-all duration-300 ease-in-out placeholder:text-muted-foreground/60"
              />
              <div className="absolute right-1 top-1 h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center group-focus-within:bg-accent transition-colors">
                <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-white" />
              </div>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-accent border border-transparent hover:border-border/50"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                {/* ROLE-BASED CREATE ACTION */}
                {canCreate && (
                  <Link href="/create-post">
                    <Button
                      size="sm"
                      className="h-9 rounded-full px-5 font-bold text-xs uppercase tracking-tighter shadow-md"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Create
                    </Button>
                  </Link>
                )}

                {/* Profile Brief */}
                <Link
                  href="/profile"
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-muted transition border border-border/20"
                >
                  <img
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-accent/10"
                  />
                  <span className="text-xs font-bold truncate max-w-[90px] text-foreground/80 uppercase">
                    {user?.name?.split(" ")[0]}
                  </span>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  /* 'hover:bg-accent/10' background ko halka rakhega aur 'hover:text-accent' text ko visible rakhega */
                  className="text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:bg-accent/10 hover:text-accent focus:text-accent"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <></>
              // <div className="flex items-center gap-2">
              //   <Link href="/login">
              //     <Button
              //       variant="ghost"
              //       size="sm"
              //       className="font-bold text-xs uppercase tracking-widest"
              //     >
              //       Login
              //     </Button>
              //   </Link>
              //   <Link href="/register">
              //     <Button
              //       size="sm"
              //       className="h-9 rounded-full px-6 font-bold text-xs uppercase tracking-widest shadow-lg shadow-accent/20"
              //     >
              //       Join Now
              //     </Button>
              //   </Link>
              // </div>
            )}
          </div>

          {/* MOBILE TOGGLE UI */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-foreground/70">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU NAVIGATION */}
        {mobileOpen && (
          <div className="md:hidden pb-8 pt-4 border-t border-border space-y-3 px-2">
            {["Home", "Magazines", "Stories", "Articles"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-foreground/80 hover:bg-muted rounded-xl font-bold uppercase text-sm tracking-widest"
              >
                {item}
              </Link>
            ))}
            {canCreate && (
              <Link
                href="/create-post"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-accent font-black uppercase text-sm tracking-widest"
              >
                Create Story
              </Link>
            )}
            <div className="h-px bg-border my-4 mx-4" />
            {isAuthenticated ? (
              <div className="flex flex-col gap-4 px-4">
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="font-black text-sm uppercase flex items-center gap-2"
                >
                  <img
                    src={user?.avatar || "/placeholder.svg"}
                    className="w-8 h-8 rounded-full"
                  />{" "}
                  Profile
                </Link>
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="w-full rounded-xl uppercase font-bold text-xs"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 px-2">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl font-bold"
                  >
                    LOGIN
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full rounded-xl font-bold">JOIN</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
