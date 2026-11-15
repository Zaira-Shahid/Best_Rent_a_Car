import Image from "next/image";
import Link from "next/link";
import { CtaBanner } from "@/components/shared";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { blogCategories, blogPosts } from "@/data";
import type { BlogPost } from "@/types";
import { brand } from "@/lib/brand";

type BlogPostContentProps = {
  post: BlogPost;
};

export function BlogPostContent({ post }: BlogPostContentProps) {
  const category = blogCategories.find((item) => item.slug === post.category);
  const related = blogPosts
    .filter((item) => item.category === post.category && item.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <section className="relative min-h-[360px] w-full overflow-hidden sm:min-h-[440px] lg:min-h-[520px]">
        {post.image.startsWith("/") ? (
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
        <Container className="relative z-10 flex min-h-[360px] flex-col justify-end py-12 sm:min-h-[440px] sm:py-16 lg:min-h-[520px] lg:pb-20">
          <Reveal>
            {category ? (
              <Link
                href={`/blog/${category.slug}`}
                className="mb-4 inline-block w-fit rounded-full bg-secondary px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white transition hover:brightness-110"
              >
                {category.name}
              </Link>
            ) : null}
            <h1 className="hero-shadow max-w-3xl font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">{post.excerpt}</p>
            <p className="mt-6 text-sm font-medium text-white/70">
              By {post.author} • {post.date} • {post.readTime}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-primary/8 bg-[#f3f4f5] py-6">
        <Container>
          <nav className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <Link href="/blog" className="hover:text-primary">
              Blog
            </Link>
            {category ? (
              <>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                <Link href={`/blog/${category.slug}`} className="hover:text-primary">
                  {category.name}
                </Link>
              </>
            ) : null}
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-medium text-primary line-clamp-1">{post.title}</span>
          </nav>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <Reveal>
                <div className="space-y-5 text-base leading-relaxed text-primary/80 sm:text-lg">
                  {post.content.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>

              {post.tips && post.tips.length > 0 ? (
                <Reveal delay={80}>
                  <div className="mt-10 rounded-xl border border-secondary/20 bg-secondary/5 p-6 sm:p-8">
                    <h2 className="font-heading text-lg font-semibold text-primary sm:text-xl">
                      Quick tips
                    </h2>
                    <ul className="mt-4 space-y-3">
                      {post.tips.map((tip) => (
                        <li key={tip} className="flex gap-3 text-sm text-primary/75 sm:text-base">
                          <span className="material-symbols-outlined mt-0.5 shrink-0 text-secondary text-[20px]">
                            check_circle
                          </span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              {post.cta ? (
                <Reveal delay={120}>
                  <p className="mt-10 border-l-4 border-accent pl-5 text-base font-medium text-primary sm:text-lg">
                    {post.cta}
                  </p>
                </Reveal>
              ) : null}
            </article>

            <aside className="space-y-8 lg:col-span-4">
              <Reveal delay={60}>
                <div className="luxury-card-shadow rounded-xl border border-primary/8 bg-white p-6 sm:p-8">
                  <h2 className="border-b border-primary/8 pb-4 font-heading text-lg font-semibold">
                    Categories
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {blogCategories.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={`/blog/${item.slug}`}
                          className={`text-sm transition hover:text-secondary ${
                            item.slug === post.category ? "font-semibold text-secondary" : "text-muted"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {related.length > 0 ? (
                <Reveal delay={100}>
                  <div className="luxury-card-shadow rounded-xl border border-primary/8 bg-white p-6 sm:p-8">
                    <h2 className="border-b border-primary/8 pb-4 font-heading text-lg font-semibold">
                      Related reads
                    </h2>
                    <div className="mt-5 space-y-5">
                      {related.map((item) => (
                        <Link key={item.slug} href={`/blog/${item.slug}`} className="group flex gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover transition group-hover:scale-110"
                              sizes="64px"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-primary transition group-hover:text-secondary">
                              {item.title}
                            </h3>
                            <span className="text-xs text-muted">{item.date}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>

      <CtaBanner
        title={`Plan your next trip with ${brand.name}`}
        description="Book a sedan, SUV, or chauffeur for city days, airport transfers, and mountain weekends."
      />
    </>
  );
}
