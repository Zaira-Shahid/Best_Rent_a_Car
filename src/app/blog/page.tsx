import type { Metadata } from "next";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { blogPosts } from "@/data";
import { pageMeta } from "@/lib/seo";
import { brand } from "@/lib/brand";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description: `Car rental tips, travel guides, and company updates from ${brand.name}.`,
  path: "/blog",
  keywords: ["car rental tips", "Pakistan travel guide"],
});

export default function BlogPage() {
  return <BlogPageContent initialPosts={blogPosts} />;
}
