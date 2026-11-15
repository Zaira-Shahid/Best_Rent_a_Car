import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { blogPosts } from "@/data";

export function HomeBlog() {
  return (
    <Section className="bg-white">
      <Reveal>
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Blog</p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
              Travel guides & tips
            </h2>
            <p className="mt-3 max-w-xl text-sm text-primary/75 sm:text-base">
              Useful reads for planning city trips and mountain getaways.
            </p>
          </div>
          <ButtonLink href="/blog" variant="outline">
            View Blog
          </ButtonLink>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.slice(0, 6).map((post, index) => (
          <Reveal key={post.slug} delay={Math.min(index, 5) * 80}>
            <article className="group flex h-full flex-col overflow-hidden rounded-[12px] border border-primary/8 bg-background transition duration-300 hover:-translate-y-1.5 hover:border-secondary/25 hover:shadow-[0_16px_40px_rgba(0,11,29,0.08)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs uppercase tracking-wide text-secondary">{post.date}</p>
                <h3 className="mt-2 text-lg font-semibold text-primary">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-secondary">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-primary/75">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-secondary"
                >
                  Read more <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
