import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  footerCompanyLinks,
  footerLocationLinks,
  footerServiceLinks,
  policyLinks,
} from "@/data";
import { ContactNumbers } from "@/components/shared/ContactNumbers";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { brand } from "@/lib/brand";

const footerLink =
  "inline-flex min-h-11 items-center text-sm !text-white/75 transition hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-5 text-base font-semibold">{title}</h4>
      <ul className="space-y-0">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={footerLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <Container className="relative z-10 pt-14 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* 1. About + social */}
          <div className="space-y-5">
            <Logo className="h-16 w-[112px]" />
            <p className="max-w-xs text-sm leading-relaxed text-white/75">
              Redefining luxury travel standards across Pakistan. Your premium mobility partner.
            </p>
            <SocialLinks />
            <ul className="flex flex-wrap gap-x-5">
              {footerCompanyLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Services */}
          <FooterColumn title="Services" links={footerServiceLinks} />

          {/* 3. Locations */}
          <FooterColumn title="Popular Locations" links={footerLocationLinks} />

          {/* 4. Contact */}
          <div>
            <h4 className="mb-5 text-base font-semibold">Contact</h4>
            <div className="space-y-4 text-sm text-white/80">
              <p className="flex gap-2.5">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-white" aria-hidden="true">
                  location_on
                </span>
                <span>{brand.location.address}</span>
              </p>
              <p className="flex gap-2.5">
                <span className="material-symbols-outlined shrink-0 text-[18px] text-white" aria-hidden="true">
                  schedule
                </span>
                <span>{brand.hours}</span>
              </p>
              <ContactNumbers />
              <a
                href={brand.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/30 px-5 font-semibold !text-white transition hover:bg-white hover:!text-brand-black"
              >
                Get Directions
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  arrow_outward
                </span>
              </a>
              {brand.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="block !text-white/80 transition hover:!text-white">
                  {email}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Large faint wordmark */}
      <div
        className="pointer-events-none relative z-0 -mb-[0.2em] mt-10 select-none overflow-hidden text-center font-heading text-[clamp(3.5rem,17vw,16rem)] font-extrabold uppercase leading-[0.8] tracking-tight text-white/[0.06] sm:mt-14"
        aria-hidden="true"
      >
        {brand.shortName}
      </div>

      <div className="relative z-10 border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-xs !text-white/75 transition hover:!text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href="https://www.developerx.org/" /* TODO: replace with Developers Tech Solutions URL */
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit flex-col text-xs !text-white/70 transition hover:!text-white"
          >
            Website By Developers Tech Solutions
            <span className="developerx-line" aria-hidden="true" />
          </a>
        </Container>
      </div>
    </footer>
  );
}
