import { brand } from "@/lib/brand";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/shared/SocialLinks";

const socials = [
  { label: "Facebook", href: brand.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: brand.social.instagram, Icon: InstagramIcon },
  { label: "TikTok", href: brand.social.tiktok, Icon: TikTokIcon },
] as const;

/** Info strip above the main header row; shares its container so edges line up. Collapsed by the header on scroll. */
export function TopInfoBar() {
  return (
    <div className="hidden bg-brand-black text-[14px] text-white/90 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <ul className="flex min-w-0 items-center gap-x-6">
          <li className="flex min-w-0 items-center gap-2">
            <span className="material-symbols-outlined shrink-0 text-[18px] text-brand-red" aria-hidden="true">
              location_on
            </span>
            <span className="truncate">{brand.location.address}</span>
          </li>
          <li className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px] text-brand-red" aria-hidden="true">
              schedule
            </span>
            <span>{brand.hours}</span>
          </li>
        </ul>
        <div className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap text-[13px] text-white/70">Follow us</span>
          <div className="flex items-center gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white/10 !text-white transition hover:bg-brand-red"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
