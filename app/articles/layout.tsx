import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Read business articles, leadership insights, and expert analysis from Prime World Media.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    url: "https://primeworldmedia.com/articles",
    title: "Articles | Prime World Media",
    description:
      "Read business articles, leadership insights, and expert analysis from Prime World Media.",
  },
};

export default function ArticlesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
