import type { MetadataRoute } from "next";
import { blogCategories, blogPosts, carCategories, carModels, cities, services } from "@/data";

export const dynamic = "force-static";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://best-rent-a-car.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/reviews",
    "/faq",
    "/cars",
    "/city-services",
    "/services",
    "/blog",
    "/contact",
    "/terms",
    "/privacy",
    "/booking-policy",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const cityRoutes = cities.map((city) => ({
    url: `${baseUrl}/rent-a-car/${city.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categoryRoutes = carCategories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const carRoutes = carModels.map((car) => ({
    url: `${baseUrl}/cars/${car.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogCategoryRoutes = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const blogPostRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...cityRoutes,
    ...serviceRoutes,
    ...categoryRoutes,
    ...carRoutes,
    ...blogCategoryRoutes,
    ...blogPostRoutes,
  ];
}
