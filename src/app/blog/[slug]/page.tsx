import type { Metadata } from "next";
import { BlogCategoryContent } from "@/components/blog/BlogCategoryContent";
import { BlogPostClientFallback } from "@/components/blog/BlogPostClientFallback";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import {
  blogCategories,
  blogPosts,
  getBlogCategory,
  getBlogPost,
  getPostsByCategory,
} from "@/data";
import { pageMeta } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const categoryParams = blogCategories.map((category) => ({ slug: category.slug }));
  const postParams = blogPosts.map((post) => ({ slug: post.slug }));
  return [...categoryParams, ...postParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (post) {
    return pageMeta({
      title: post.title,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      keywords: [post.title.toLowerCase(), "car rental blog", "Pakistan travel"],
    });
  }

  const category = getBlogCategory(slug);
  if (category) {
    return pageMeta({
      title: category.name,
      description: `${category.name} articles and tips from Best Rent a Car.`,
      path: `/blog/${category.slug}`,
      keywords: [category.name.toLowerCase(), "car rental blog"],
    });
  }

  return { title: "Blog" };
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;

  const post = getBlogPost(slug);
  if (post) {
    return <BlogPostContent post={post} />;
  }

  const category = getBlogCategory(slug);
  if (category) {
    return <BlogCategoryContent category={category} posts={getPostsByCategory(category.slug)} />;
  }

  return <BlogPostClientFallback slug={slug} />;
}
