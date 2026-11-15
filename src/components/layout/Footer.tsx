import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  footerCompanyLinks,
  footerLocationLinks,
  footerServiceLinks,
  policyLinks,
} from "@/data";
import { brand, formatPhoneDisplay } from "@/lib/brand";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-6 text-base font-semibold">{title}</h4>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm text-white/55 transition hover:text-accent">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.4-3.68 3.56-3.68 1.03 0 2.11.18 2.11.18v2.32h-1.19c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.9h-2.2V22c4.78-.75 8.44-4.91 8.44-9.93Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .55.04.81.1V9.01a6.28 6.28 0 0 0-.81-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.72a8.2 8.2 0 0 0 4.77 1.52V6.81a4.85 4.85 0 0 1-1.01-.12Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.58A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.58a3 3 0 0 0 2.12-2.12A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.75 15.5v-7l6.25 3.5-6.25 3.5Z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.17 2.56 7.75 6.22 9.22-.08-.72-.16-1.84.03-2.63.17-.72 1.1-4.64 1.1-4.64s-.28-.56-.28-1.4c0-1.31.76-2.29 1.71-2.29.8 0 1.2.61 1.2 1.33 0 .81-.52 2.02-.79 3.14-.22.94.48 1.71 1.41 1.71 1.69 0 2.99-1.78 2.99-4.35 0-2.27-1.63-3.86-3.97-3.86-2.7 0-4.29 2.03-4.29 4.12 0 .82.31 1.69.71 2.17a.29.29 0 0 1 .07.27c-.07.3-.23.94-.26 1.07-.04.17-.14.21-.32.13-1.2-.56-1.95-2.3-1.95-3.71 0-3.01 2.19-5.78 6.31-5.78 3.31 0 5.89 2.36 5.89 5.52 0 3.29-2.08 5.95-4.96 5.95-.97 0-1.88-.5-2.19-1.1l-.6 2.27c-.22.84-.8 1.89-1.19 2.53A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
    </svg>
  );
}

const socialLinks = [
  { label: "Facebook", href: brand.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: brand.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: brand.social.tiktok, Icon: TikTokIcon },
  { label: "YouTube", href: brand.social.youtube, Icon: YouTubeIcon },
  { label: "Pinterest", href: brand.social.pinterest, Icon: PinterestIcon },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Logo className="h-16 w-[112px]" />
            <p className="max-w-xs text-sm leading-relaxed text-white/55">
              Redefining luxury travel standards across Pakistan. Your premium mobility partner.
            </p>
            <div className="space-y-1 text-sm text-white/70">
              <a href={`tel:${brand.phone}`} className="block transition hover:text-accent">
                {formatPhoneDisplay()}
              </a>
              <a href={`mailto:${brand.email}`} className="block transition hover:text-accent">
                {brand.email}
              </a>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-accent hover:text-primary"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={footerCompanyLinks} />
          <FooterColumn title="Services" links={footerServiceLinks} />
          <FooterColumn title="Popular Locations" links={footerLocationLinks} />
          <FooterColumn title="Legal" links={policyLinks} />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <a
            href="https://www.developerx.org/" /* TODO: replace with Developers Tech Solutions URL */
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit flex-col text-xs text-white/45 transition hover:text-accent"
          >
            Website By Developers Tech Solutions
            <span className="developerx-line" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
