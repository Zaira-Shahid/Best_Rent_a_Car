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
            <div className="space-y-3 text-sm text-white/70">
              <ContactNumbers />
              <div className="space-y-1">
                <p>{brand.location.address}</p>
                <p className="text-white/55">{brand.hours}</p>
                <a
                  href={brand.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium !text-white/85 transition hover:!text-accent"
                >
                  Get Directions
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </div>
              <a href={`mailto:${brand.email}`} className="block transition hover:text-accent">
                {brand.email}
              </a>
            </div>
            <SocialLinks />
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
