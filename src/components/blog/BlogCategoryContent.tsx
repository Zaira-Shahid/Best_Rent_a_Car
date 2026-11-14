import Image from "next/image";
import Link from "next/link";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { blogCategories, blogPosts } from "@/data";
import type { BlogCategory, BlogPost } from "@/types";

type BlogCategoryContentProps = {
  category: BlogCategory;
  posts: BlogPost[];
};

export function BlogCategoryContent({ category, posts }: BlogCategoryContentProps) {
  const heroImage =
    posts[0]?.image ??
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80";

  return (
    <>
      <section className="relative min-h-[320px] w-full overflow-hidden sm:min-h-[400px]">
        <Image src={heroImage} alt={category.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/45 to-primary/15" />
        <Container className="relative z-10 flex min-h-[320px] flex-col justify-end py-12 sm:min-h-[400px] sm:py-16">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">Category</p>
            <h1 className="hero-shadow max-w-2xl font-heading text-3xl font-bold text-white sm:text-5xl">
              {category.name}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">
              {posts.length} {posts.length === 1 ? "article" : "articles"} with practical rental and travel advice.
            </p>
          </Reveal>
        </Container>
      </section>

      <BlogFilters
        activeSlug={category.slug}
        intro={`${posts.length} curated ${posts.length === 1 ? "article" : "articles"} in ${category.name} — tips and guides from Best Rent a Car.`}
      />

      <section className="bg-[#f8f9fa] py-14 sm:py-20">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-muted">No articles in this category yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={Math.min(index, 5) * 70}>
                  <article className="luxury-card-shadow group flex h-full flex-col overflow-hidden rounded-2xl border border-primary/8 bg-white transition hover:-translate-y-1">
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-8">
                      <p className="text-xs text-muted">
                        {post.date} • {post.readTime}
                      </p>
                      <h2 className="mt-2 font-heading text-lg font-semibold leading-tight text-primary sm:text-xl">
                        <Link href={`/blog/${post.slug}`} className="transition hover:text-secondary">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="mt-3 flex-1 text-sm text-muted">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-secondary"
                      >
                        Read More
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-2xl border border-primary/8 bg-white p-6 sm:p-8">
            <h3 className="font-heading text-lg font-semibold text-primary">Browse all categories</h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {blogCategories.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                      item.slug === category.slug
                        ? "bg-primary text-white"
                        : "border border-primary/10 bg-[#f8f9fa] text-muted hover:border-secondary/40 hover:text-secondary"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        item.slug === category.slug ? "bg-white/20 text-white" : "bg-primary/5 text-primary"
                      }`}
                    >
                      {blogPosts.filter((post) => post.category === item.slug).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaBanner
        title="Need a car for your next trip?"
        description="Get transparent rates for daily, weekly, and chauffeur rentals across Pakistan."
      />
    </>
  );
}
