"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { TopInfoBar } from "@/components/layout/TopInfoBar";
import { brand, formatPhone, telLink, whatsappLink } from "@/lib/brand";
import { cn } from "@/lib/utils";
import type { NavItem, NavLink } from "@/types";

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

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = Number.parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
          "relative isolate flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white",
          tone === "dark" ? "border-white/15" : "border-primary/10",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.logo} alt="" className="h-[18px] w-[18px] object-contain" />
      </span>
    );
  }

  if (!item.icon) return null;

  const color = item.iconColor ?? "#278a08";

  return (
    <span
      className={cn(
        "inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md",
        tone === "dark" && "ring-1 ring-white/10",
      )}
      style={{
        color,
        backgroundColor: tone === "dark" ? hexToRgba(color, 0.22) : hexToRgba(color, 0.14),
      }}
      aria-hidden="true"
    >
      <span
        className="material-symbols-outlined block overflow-hidden text-[18px] leading-none"
        style={{
          fontFamily: '"Material Symbols Outlined", sans-serif',
          fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
          width: 18,
          height: 18,
        }}
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

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<string | null>(null);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  // The info bar collapses once the visitor scrolls away from the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDesktopMenu = (href: string) => {
    if (closeMenuTimer.current) {
      clearTimeout(closeMenuTimer.current);
      closeMenuTimer.current = null;
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
                    className="inline-flex h-12 items-center justify-center rounded-full bg-accent text-[15px] font-semibold !text-white"
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

  const navLinkClass = (active: boolean) =>
    cn(
      "relative inline-flex h-full items-center whitespace-nowrap px-3 text-[15px] font-medium transition-colors",
      "after:absolute after:inset-x-3 after:bottom-3 after:h-0.5 after:origin-left after:rounded-full after:bg-brand-red after:transition-transform",
      active
        ? "!text-brand-black after:scale-x-100"
        : "!text-brand-black/70 hover:!text-brand-black after:scale-x-0 hover:after:scale-x-100",
    );

  return (
    <>
      <header className="site-header sticky top-0 z-50 bg-white text-brand-black shadow-[0_1px_0_rgba(21,24,29,0.08)]">
        <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]")}>
          <div className="overflow-hidden" aria-hidden={scrolled ? true : undefined}>
            <TopInfoBar />
          </div>
        </div>

        <Container className="relative flex h-16 items-center justify-between gap-3 xl:grid xl:h-[76px] xl:grid-cols-[auto_1fr_auto] xl:gap-6">
          <Logo priority className="h-11 w-[88px] xl:h-12 xl:w-[96px]" />

          <nav className="hidden h-full items-stretch justify-self-center xl:flex" aria-label="Main">
            {mainNav.map((item) => {
              const active = isActive(pathname, item);
              const menu = hasMenu(item);

              if (!menu) {
                return (
                  <Link key={item.href} href={item.href} className={navLinkClass(active)}>
                    {item.label}
                  </Link>
                );
              }

              const wide = Boolean(item.groups?.length);

              return (
                <div
                  key={item.href}
                  className={cn("flex items-stretch", !wide && "relative")}
                  onMouseEnter={() => openDesktopMenu(item.href)}
                  onMouseLeave={() => scheduleCloseDesktopMenu(item.href)}
                >
                  <Link href={item.href} className={cn(navLinkClass(active), "gap-0.5")} aria-expanded={desktopMenu === item.href}>
                    {item.label}
                    <span
                      className={cn("material-symbols-outlined text-[16px] opacity-70 transition", desktopMenu === item.href && "rotate-180")}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </Link>

                  <div
                    className={cn(
                      "absolute top-full z-50 transition",
                      desktopMenu === item.href ? "visible opacity-100 pointer-events-auto" : "invisible opacity-0 pointer-events-none",
                      wide
                        ? "left-1/2 w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 pt-0"
                        : "left-1/2 -translate-x-1/2",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-[14px] border border-primary/10 bg-white p-5 text-primary shadow-[0_18px_50px_rgba(0,11,29,0.12)]",
                        !wide ? "min-w-[280px]" : undefined,
                        wide ? "max-h-[min(70vh,560px)] overflow-y-auto p-6" : undefined,
                      )}
                    >
                      {item.children?.length ? (
                        <ul className={cn("space-y-1", wide ? "mb-5 border-b border-primary/8 pb-4" : undefined)}>
                          {item.children.map((child) => (
                            <li key={`${child.href}-${child.label}`}>
                              <DropdownLink
                                item={child}
                                className="w-full rounded-lg px-3 py-2.5 text-sm text-primary/80 hover:bg-background hover:text-primary"
                              />
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      {item.groups?.length ? (
                        item.href === "/cars" || item.href === "/city-services" ? (
                          <div className="flex flex-col gap-8 xl:flex-row xl:gap-0">
                            {item.groups.map((group) => {
                              const isWideList = group.label === "All Cars" || group.label === "All Cities";
                              return (
                                <div
                                  key={group.label}
                                  className={cn(
                                    isWideList ? "min-w-0 flex-1 xl:pl-8" : "w-full shrink-0 xl:w-[250px] xl:border-r xl:border-primary/10 xl:pr-8",
                                  )}
                                >
                                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{group.label}</p>
                                    {group.label === "All Cars" ? (
                                      <Link href="/cars" className="text-[11px] font-semibold text-secondary hover:underline">
                                        View all
                                      </Link>
                                    ) : null}
                                  </div>
                                  <ul className={cn(isWideList ? "grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-3" : "space-y-1")}>
                                    {group.items.map((child) => (
                                      <li key={`${child.href}-${child.label}`} className="min-w-0">
                                        <DropdownLink
                                          item={child}
                                          className="w-full min-w-0 rounded-lg px-3 py-2.5 text-sm text-primary/80 hover:bg-background hover:text-primary"
                                        />
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "grid gap-6",
                              item.groups.length === 2 && "grid-cols-[240px_minmax(0,1fr)]",
                              item.groups.length >= 3 ? "grid-cols-2 xl:grid-cols-3" : undefined,
                            )}
                          >
                            {item.groups.map((group) => (
                              <div key={group.label} className="min-w-0">
                                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">{group.label}</p>
                                <ul className="space-y-1">
                                  {group.items.map((child) => (
                                    <li key={`${child.href}-${child.label}`} className="min-w-0">
                                      <DropdownLink
                                        item={child}
                                        className="w-full min-w-0 rounded-lg px-3 py-2.5 text-sm text-primary/80 hover:bg-background hover:text-primary"
                                      />
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* One combined call-to-action group (desktop). */}
          <div className="hidden items-center gap-1 justify-self-end rounded-full border border-brand-black/12 p-1 xl:flex">
            <a
              href={telLink(phone.number)}
              aria-label={`Call ${formatPhone(phone.number)}`}
              className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-semibold !text-brand-black transition hover:bg-brand-black/5 min-[1400px]:pr-4"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                call
              </span>
              <span className="hidden min-[1400px]:inline">{formatPhone(phone.number)}</span>
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-semibold !text-white transition hover:brightness-110"
            >
              Book Now
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <a
              href={telLink(phone.number)}
              aria-label={`Call ${formatPhone(phone.number)}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-black/15 !text-brand-black"
            >
              <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                call
              </span>
            </a>
            <Link href="/contact" className="inline-flex h-11 items-center rounded-full bg-accent px-4 text-sm font-semibold !text-white">
              Book Now
            </Link>
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
