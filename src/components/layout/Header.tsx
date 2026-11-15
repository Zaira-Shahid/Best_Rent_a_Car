"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { fleetSections, getCarsForCategory } from "@/data/cars";
import { cities } from "@/data/cities";
import { brand, formatPhone, formatPrice, telLink, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { CityPage, NavItem, NavLink } from "@/types";

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname === item.href) return true;
  if (item.children?.some((child) => pathname === child.href)) return true;
  if (item.groups?.some((group) => group.items.some((child) => pathname === child.href))) return true;
  return pathname.startsWith(`${item.href}/`);
}

function hasMenu(item: NavItem) {
  return Boolean(item.children?.length || item.groups?.length);
}

function NavIcon({
  item,
  tone = "light",
}: {
  item: Pick<NavLink, "icon" | "iconColor" | "logo" | "label">;
  tone?: "light" | "dark";
}) {
  if (item.logo) {
    return (
      <span
        className={cn(
          "relative isolate flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white",
          tone === "dark" ? "border-white/15" : "border-brand-black/10",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.logo} alt="" className="h-[20px] w-[20px] object-contain" />
      </span>
    );
  }

  if (!item.icon) return null;

  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg",
        tone === "dark" ? "bg-white/10 text-white" : "bg-brand-red/10 text-brand-red",
      )}
      aria-hidden="true"
    >
      <span
        className="material-symbols-outlined block overflow-hidden text-[19px] leading-none"
        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400", width: 19, height: 19 }}
      >
        {item.icon}
      </span>
    </span>
  );
}

function DropdownLink({
  item,
  onClick,
  className,
  tone = "light",
}: {
  item: NavLink;
  onClick?: () => void;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn("inline-flex min-w-0 items-center gap-3 transition", className)}
    >
      <NavIcon item={item} tone={tone} />
      <span className="min-w-0 flex-1 truncate leading-snug">{item.label}</span>
    </Link>
  );
}

const WHATSAPP_PATH =
  "M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

/** Every link of a nav item's submenu (children first, then each group), flattened for the mobile panel. */
function submenuSections(item: NavItem): { label?: string; items: NavLink[] }[] {
  const sections: { label?: string; items: NavLink[] }[] = [];
  if (item.children?.length) sections.push({ items: item.children });
  item.groups?.forEach((group) => sections.push({ label: group.label, items: group.items }));
  return sections;
}

/** One-line description for a menu link, only where the site already has copy for it. */
function describe(item: NavLink) {
  if (item.href.startsWith("/categories/")) {
    const slug = item.href.split("/").pop();
    return fleetSections.find((section) => section.slug === slug)?.description;
  }
  return undefined;
}

const CITY_COLUMNS: { type: CityPage["type"]; label: string }[] = [
  { type: "primary", label: "Primary" },
  { type: "tourist", label: "Tourist" },
  { type: "local", label: "Local" },
];

const menuLinkClass =
  "group/link flex w-full min-w-0 items-center gap-3 rounded-xl px-2.5 py-2 text-brand-black transition hover:bg-brand-black/[0.05] focus-visible:bg-brand-black/[0.05]";

function MenuLink({ item, onClick, onActive }: { item: NavLink; onClick?: () => void; onActive?: () => void }) {
  const description = describe(item);
  return (
    <Link href={item.href} onClick={onClick} onMouseEnter={onActive} onFocus={onActive} className={menuLinkClass}>
      <NavIcon item={item} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight !text-brand-black">{item.label}</span>
        {description ? <span className="mt-0.5 block truncate text-xs leading-tight text-brand-black/60">{description}</span> : null}
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverCategory, setHoverCategory] = useState<string>(fleetSections[0]?.slug ?? "");
  const [tipLeft, setTipLeft] = useState<Record<string, number>>({});
  const pathname = usePathname();
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressFocus = useRef(false);
  const phone = brand.phones[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobilePanel(null);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    };
  }, []);

  // The info bar collapses and the main bar tightens once the visitor scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDesktopMenu = (href: string, wide?: { center: number; container: number }) => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
    }
    if (wide) {
      // Arrow tip of a mega menu points at its nav item.
      const panel = Math.min(1024, window.innerWidth - 32);
      const left = Math.min(Math.max(wide.center - (wide.container - panel) / 2, 28), panel - 28);
      setTipLeft((prev) => (prev[href] === left ? prev : { ...prev, [href]: left }));
    }
    setDesktopMenu(href);
  };

  const scheduleCloseDesktopMenu = (href: string) => {
    if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    closeMenuTimer.current = setTimeout(() => {
      setDesktopMenu((current) => (current === href ? null : current));
      closeMenuTimer.current = null;
    }, 120);
  };

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobilePanel) setMobilePanel(null);
      else setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, mobilePanel]);

  const closeAll = () => {
    setOpen(false);
    setMobilePanel(null);
  };

  const panelItem = mobilePanel ? mainNav.find((item) => item.href === mobilePanel) : undefined;

  const mobileMenu =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-brand-black text-white xl:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
            <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-6">
              {panelItem ? (
                <button
                  type="button"
                  onClick={() => setMobilePanel(null)}
                  className="-ml-2 inline-flex h-11 items-center gap-1 rounded-full px-2 pr-4 text-sm font-semibold text-white"
                >
                  <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                    arrow_back
                  </span>
                  Menu
                </button>
              ) : (
                <Logo className="h-11 w-[88px]" />
              )}
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white"
                onClick={closeAll}
              >
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  close
                </span>
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <div className="mx-auto w-full max-w-2xl px-4 py-2 sm:px-6">
                {panelItem ? (
                  <div>
                    <p className="pb-1 pt-4 font-heading text-[28px] font-semibold leading-tight">{panelItem.label}</p>
                    <Link
                      href={panelItem.href}
                      onClick={closeAll}
                      className="flex min-h-[52px] items-center justify-between border-b border-white/10 text-base font-semibold !text-white"
                    >
                      <span>View all {panelItem.label}</span>
                      <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                        arrow_forward
                      </span>
                    </Link>
                    {submenuSections(panelItem).map((section, sectionIndex) => (
                      <div key={section.label ?? sectionIndex}>
                        {section.label ? (
                          <p className="pb-1 pt-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">{section.label}</p>
                        ) : null}
                        <ul>
                          {section.items.map((child) => (
                            <li key={`${child.href}-${child.label}`} className="border-b border-white/10">
                              <DropdownLink
                                item={child}
                                onClick={closeAll}
                                tone="dark"
                                className="min-h-[52px] w-full py-1.5 text-[15px] font-medium !text-white"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul>
                    {mainNav.map((item) => {
                      const menu = hasMenu(item);
                      const active = isActive(pathname, item);
                      const rowClass = cn(
                        "flex min-h-[60px] w-full items-center justify-between gap-3 border-b border-white/10 py-2 text-left font-heading text-[24px] font-semibold",
                        active ? "!text-white" : "!text-white/75",
                      );
                      const marker = active ? <span className="mr-3 h-6 w-1 shrink-0 rounded-full bg-brand-red" aria-hidden="true" /> : null;
                      return (
                        <li key={item.href}>
                          {menu ? (
                            <button type="button" className={rowClass} onClick={() => setMobilePanel(item.href)} aria-haspopup="true">
                              <span className="flex min-w-0 items-center">
                                {marker}
                                <span className="truncate">{item.label}</span>
                              </span>
                              <span className="material-symbols-outlined shrink-0 text-[26px] text-white/60" aria-hidden="true">
                                chevron_right
                              </span>
                            </button>
                          ) : (
                            <Link href={item.href} className={rowClass} onClick={closeAll}>
                              <span className="flex min-w-0 items-center">
                                {marker}
                                <span className="truncate">{item.label}</span>
                              </span>
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-white/10 bg-brand-black px-4 pb-5 pt-4 sm:px-6">
              <div className="mx-auto flex w-full max-w-2xl flex-col gap-2.5">
                <a
                  href={telLink(phone.number)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 text-[15px] font-semibold !text-white"
                >
                  <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                    call
                  </span>
                  Call {formatPhone(phone.number)}
                </a>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-semibold"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    onClick={closeAll}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red text-[15px] font-semibold !text-white"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  const navLinkClass = (active: boolean, menuOpen = false) =>
    cn(
      "inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[15px] transition-colors min-[1440px]:px-2.5",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black",
      active
        ? "bg-brand-black/[0.07] font-semibold !text-brand-black"
        : cn("font-medium !text-brand-black/75 hover:bg-brand-black/[0.04] hover:!text-brand-black", menuOpen && "bg-brand-black/[0.04] !text-brand-black"),
    );

  const panelBase =
    "rounded-2xl border border-brand-black/[0.06] bg-white text-brand-black shadow-[0_20px_60px_rgba(21,24,29,0.16)]";
  const arrowTip =
    "pointer-events-none absolute top-1 z-10 h-3 w-3 -translate-x-1/2 rotate-45 rounded-[2px] border-l border-t border-brand-black/[0.06] bg-white";

  const activeCategoryCars = getCarsForCategory(hoverCategory).slice(0, 3);
  const activeCategory = fleetSections.find((section) => section.slug === hoverCategory);

  return (
    <>
      <header
        className={cn(
          "site-header sticky top-0 z-50 text-brand-black transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled ? "bg-white/92 shadow-[0_6px_24px_rgba(21,24,29,0.08)] backdrop-blur-xl" : "bg-white shadow-[0_1px_0_rgba(21,24,29,0.08)]",
        )}
      >
        <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]")}>
          <div className="overflow-hidden" aria-hidden={scrolled ? true : undefined}>
            <TopInfoBar />
          </div>
        </div>

        <Container
          className={cn(
            "relative flex items-center justify-between gap-3 transition-[height] duration-300 xl:grid xl:grid-cols-[auto_1fr_auto] xl:gap-4",
            scrolled ? "h-14 xl:h-16" : "h-16 xl:h-[76px]",
          )}
        >
          <Logo
            priority
            className={cn(
              "transition-[height,width] duration-300",
              scrolled ? "h-11 w-[88px] xl:h-12 xl:w-[96px]" : "h-12 w-[96px] xl:h-14 xl:w-[112px]",
            )}
          />

          <nav className="hidden h-full items-center justify-self-center xl:flex" aria-label="Main">
            {mainNav.map((item) => {
              const active = isActive(pathname, item);
              const menu = hasMenu(item);

              if (!menu) {
                return (
                  <Link key={item.href} href={item.href} className={navLinkClass(active)}>
                    {active ? <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden="true" /> : null}
                    {item.label}
                  </Link>
                );
              }

              const wide = item.href === "/cars" || item.href === "/city-services";
              const isOpen = desktopMenu === item.href;

              return (
                <div
                  key={item.href}
                  className={cn("flex h-full items-center", !wide && "relative")}
                  onMouseEnter={(e) =>
                    openDesktopMenu(
                      item.href,
                      wide
                        ? {
                            center: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2,
                            container: (e.currentTarget.offsetParent as HTMLElement | null)?.clientWidth ?? window.innerWidth,
                          }
                        : undefined,
                    )
                  }
                  onMouseLeave={() => scheduleCloseDesktopMenu(item.href)}
                  onFocus={(e) => {
                    if (suppressFocus.current) return;
                    openDesktopMenu(
                      item.href,
                      wide
                        ? {
                            center: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth / 2,
                            container: (e.currentTarget.offsetParent as HTMLElement | null)?.clientWidth ?? window.innerWidth,
                          }
                        : undefined,
                    );
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setDesktopMenu((current) => (current === item.href ? null : current));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "Escape" || !isOpen) return;
                    e.stopPropagation();
                    suppressFocus.current = true;
                    setDesktopMenu(null);
                    (e.currentTarget.querySelector("a") as HTMLElement | null)?.focus();
                    setTimeout(() => {
                      suppressFocus.current = false;
                    }, 0);
                  }}
                >
                  <Link href={item.href} className={navLinkClass(active, isOpen)} aria-expanded={isOpen} aria-haspopup="true">
                    {active ? <span className="h-1.5 w-1.5 rounded-full bg-brand-red" aria-hidden="true" /> : null}
                    {item.label}
                    <span
                      className={cn("material-symbols-outlined -ml-0.5 text-[15px] font-light opacity-60 transition-transform duration-200", isOpen && "rotate-180")}
                      style={{ fontVariationSettings: "'wght' 300" }}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </Link>

                  <div
                    className={cn(
                      "absolute top-full z-50 pt-2.5 transition duration-200",
                      isOpen ? "visible translate-y-0 opacity-100 pointer-events-auto" : "invisible -translate-y-1 opacity-0 pointer-events-none",
                      wide ? "left-1/2 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2" : "left-1/2 -translate-x-1/2",
                    )}
                  >
                    {item.href === "/cars" ? (
                      <div className={cn(panelBase, "relative grid max-h-[min(78vh,600px)] grid-cols-[320px_minmax(0,1fr)] overflow-hidden")}>
                        <div className="overflow-y-auto border-r border-brand-black/[0.06] p-4">
                          <p className="mb-2 px-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-black/55">
                            {item.groups?.[0]?.label}
                          </p>
                          <ul>
                            {item.groups?.[0]?.items.map((child) => (
                              <li key={child.href}>
                                <MenuLink
                                  item={child}
                                  onActive={() => setHoverCategory(child.href.split("/").pop() ?? "")}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="min-w-0 bg-brand-black/[0.025] p-5">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <p className="truncate font-heading text-base font-bold text-brand-black">{activeCategory?.name}</p>
                            <Link href="/cars" className="shrink-0 text-xs font-semibold !text-brand-red hover:underline">
                              View all
                            </Link>
                          </div>
                          <ul className="grid grid-cols-3 gap-3">
                            {activeCategoryCars.map((car) => (
                              <li key={car.slug} className="min-w-0">
                                <Link
                                  href={`/cars/${car.slug}`}
                                  className="group/car block overflow-hidden rounded-xl bg-white shadow-[0_2px_10px_rgba(21,24,29,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(21,24,29,0.12)]"
                                >
                                  <span className="relative block aspect-[4/3] overflow-hidden bg-background">
                                    <Image src={car.image} alt={car.name} fill unoptimized sizes="200px" className="object-cover transition duration-300 group-hover/car:scale-105" />
                                  </span>
                                  <span className="block p-3">
                                    <span className="block truncate text-[13px] font-semibold !text-brand-black">{car.name}</span>
                                    <span className="mt-0.5 block text-xs font-bold text-brand-red">
                                      {formatPrice(car.priceDay)}
                                      <span className="font-medium text-brand-black/55"> / day</span>
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : item.href === "/city-services" ? (
                      <div className={cn(panelBase, "relative max-h-[min(78vh,600px)] overflow-y-auto p-5")}>
                        <div className="grid grid-cols-4 gap-6">
                          {CITY_COLUMNS.map((column) => (
                            <div key={column.type} className={cn("min-w-0", column.type === "local" && "col-span-2")}>
                              <p className="mb-2 px-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-black/55">{column.label}</p>
                              <ul className={column.type === "local" ? "grid grid-cols-2" : undefined}>
                                {cities
                                  .filter((city) => city.type === column.type)
                                  .map((city) => (
                                    <li key={city.slug}>
                                      <Link
                                        href={`/rent-a-car/${city.slug}`}
                                        className="flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-[14px] font-medium !text-brand-black/80 transition hover:bg-brand-black/[0.05] hover:!text-brand-black focus-visible:bg-brand-black/[0.05]"
                                      >
                                        <span className="h-1 w-1 shrink-0 rounded-full bg-brand-red" aria-hidden="true" />
                                        <span className="truncate">{city.name}</span>
                                      </Link>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-brand-black/[0.06] pt-4">
                          {[...(item.children ?? []), ...(item.groups?.[0]?.items ?? [])].map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="inline-flex h-9 items-center rounded-full bg-brand-black/[0.05] px-4 text-[13px] font-semibold !text-brand-black transition hover:bg-brand-black hover:!text-white"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={cn(panelBase, "relative w-[340px] p-2.5")}>
                        <ul>
                          {[...(item.children ?? []), ...(item.groups?.flatMap((group) => group.items) ?? [])].map((child) => (
                            <li key={`${child.href}-${child.label}`}>
                              <MenuLink item={child} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <span className={arrowTip} style={{ left: wide ? (tipLeft[item.href] ?? 160) : "50%" }} aria-hidden="true" />
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Action group (desktop): divider, call block, WhatsApp, Book Now. */}
          <div className="hidden items-center gap-2.5 justify-self-end xl:flex">
            <span className="h-8 w-px bg-brand-black/15" aria-hidden="true" />
            <a
              href={telLink(phone.number)}
              aria-label={`Call ${formatPhone(phone.number)}`}
              className="group/call flex items-center gap-2.5 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-red text-white transition group-hover/call:bg-brand-red-dark">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  call
                </span>
              </span>
              <span className="hidden leading-tight min-[1440px]:block">
                <span className="block whitespace-nowrap text-[11px] font-medium text-brand-black/60">Call 24/7</span>
                <span className="block whitespace-nowrap text-[15px] font-bold !text-brand-black">{formatPhone(phone.number)}</span>
              </span>
            </a>
            <span className="group/wa relative">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <span
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-black px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition group-focus-within/wa:opacity-100 group-hover/wa:opacity-100"
              >
                Chat on WhatsApp
              </span>
            </span>
            <Link
              href="/contact"
              className="group/book inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-brand-red pl-5 pr-4 text-sm font-semibold !text-white transition hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
            >
              Book Now
              <span
                className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover/book:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/book:translate-x-0"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Tablet / mobile: phone icon + menu button only. */}
          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={telLink(phone.number)}
              aria-label={`Call ${formatPhone(phone.number)}`}
              className="grid h-11 w-11 place-items-center rounded-full bg-brand-red text-white"
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                call
              </span>
            </a>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-black text-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                {open ? "close" : "menu"}
              </span>
            </button>
          </div>
        </Container>
      </header>

      {mobileMenu}
    </>
  );
}
