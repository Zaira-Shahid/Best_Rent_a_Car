"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { mainNav } from "@/data/navigation";
import { whatsappLink } from "@/lib/brand";
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

export function Header() {
  const [open, setOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const closeMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileSection(null);
    setDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeMenuTimer.current) clearTimeout(closeMenuTimer.current);
    };
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
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const mobileMenu =
    open && mounted
      ? createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-[#06264b] text-white xl:hidden" role="dialog" aria-modal="true">
            <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-[#06264b] px-4 sm:h-16 sm:px-6">
              <Logo className="h-9 w-[72px] sm:h-10 sm:w-[80px]" />
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/20 text-accent"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
                  </svg>
                </a>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/20 text-white"
                  onClick={() => setOpen(false)}
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#06264b]">
              <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 pb-10 sm:px-6">
                {mainNav.map((item) => {
                  const menu = hasMenu(item);
                  const expanded = mobileSection === item.href;
                  const active = isActive(pathname, item);

                  if (!menu) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "inline-flex items-center gap-2.5 rounded-[10px] px-3 py-3 text-sm text-white",
                          active ? "bg-white/10 font-semibold text-accent" : "hover:bg-white/5",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <NavIcon item={item} tone="dark" />
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <div key={item.href} className="overflow-hidden rounded-[12px]">
                      <button
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between gap-2 rounded-[12px] px-3 py-3 text-left text-sm text-white",
                          active || expanded ? "bg-white/10 text-accent" : "hover:bg-white/5",
                        )}
                        aria-expanded={expanded}
                        onClick={() => setMobileSection(expanded ? null : item.href)}
                      >
                        <span className={cn("inline-flex min-w-0 items-center gap-2.5", expanded && "font-semibold")}>
                          <NavIcon item={item} tone="dark" />
                          <span className="truncate">{item.label}</span>
                        </span>
                        <span
                          className={cn(
                            "material-symbols-outlined shrink-0 text-[20px] text-white/70 transition",
                            expanded && "rotate-180 text-accent",
                          )}
                        >
                          expand_more
                        </span>
                      </button>

                      {expanded ? (
                        <div className="mt-1 space-y-3 rounded-[12px] border border-white/10 bg-[#0b345e] px-3 py-3">
                          <Link
                            href={item.href}
                            className="col-span-2 inline-flex items-center gap-2 py-1.5 text-sm font-semibold text-accent"
                            onClick={() => setOpen(false)}
                          >
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                            View all {item.label}
                          </Link>

                          {item.children?.length ? (
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                              {item.children.map((child) => (
                                <DropdownLink
                                  key={`${child.href}-${child.label}`}
                                  item={child}
                                  onClick={() => setOpen(false)}
                                  tone="dark"
                                  className="w-full rounded-[10px] border border-white/10 bg-white/5 px-2.5 py-2.5 text-xs font-medium text-white hover:bg-white/10 sm:text-sm"
                                />
                              ))}
                            </div>
                          ) : null}

                          {item.groups?.length && (item.href === "/cars" || item.href === "/city-services") ? (
                            <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
                              {item.groups.map((group) => {
                                const isWideList = group.label === "All Cars" || group.label === "All Cities";
                                return (
                                  <div
                                    key={group.label}
                                    className={cn(
                                      isWideList
                                        ? "min-w-0 flex-1 sm:pl-4"
                                        : "w-full shrink-0 sm:w-[200px] sm:border-r sm:border-white/10 sm:pr-4",
                                    )}
                                  >
                                    <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                                      {group.label}
                                    </p>
                                    <div className={cn(isWideList ? "grid grid-cols-1 gap-2 sm:grid-cols-2" : "space-y-2")}>
                                      {group.items.map((child) => (
                                        <DropdownLink
                                          key={`${child.href}-${child.label}`}
                                          item={child}
                                          onClick={() => setOpen(false)}
                                          tone="dark"
                                          className="w-full rounded-[10px] border border-white/10 bg-white/5 px-2.5 py-2.5 text-xs font-medium text-white hover:bg-white/10 sm:text-sm"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            item.groups?.map((group) => (
                              <div key={group.label}>
                                <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
                                  {group.label}
                                </p>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                  {group.items.map((child) => (
                                    <DropdownLink
                                      key={`${child.href}-${child.label}`}
                                      item={child}
                                      onClick={() => setOpen(false)}
                                      tone="dark"
                                      className="w-full rounded-[10px] border border-white/10 bg-white/5 px-2.5 py-2.5 text-xs font-medium text-white hover:bg-white/10 sm:text-sm"
                                    />
                                  ))}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}

                <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5">
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/20 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="rounded-full bg-accent px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider !text-white"
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

  return (
    <>
      <header className={cn("sticky top-0 z-50 border-b border-white/10 bg-navy text-white backdrop-blur-xl", "ride-header")}>
        <Container className="flex h-14 items-center justify-between gap-3 sm:h-16 xl:h-[72px]">
          <div className="flex min-w-0 flex-1 items-center xl:flex-none">
            <Logo priority className="h-9 w-[72px] sm:h-10 sm:w-[80px] xl:h-12 xl:w-[96px]" />
          </div>

          <nav className="hidden h-full items-stretch gap-1 xl:flex xl:gap-2">
            {mainNav.map((item) => {
              const active = isActive(pathname, item);
              const menu = hasMenu(item);

              if (!menu) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center whitespace-nowrap px-2 py-2 text-sm transition-colors xl:px-3",
                      active
                        ? "border-b-2 border-accent pb-[6px] font-semibold text-white"
                        : "text-white/70 hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative flex items-center"
                  onMouseEnter={() => openDesktopMenu(item.href)}
                  onMouseLeave={() => scheduleCloseDesktopMenu(item.href)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-0.5 whitespace-nowrap px-2 py-2 text-sm transition-colors xl:px-3",
                      active
                        ? "border-b-2 border-accent pb-[6px] font-semibold text-white"
                        : "text-white/70 hover:text-accent",
                    )}
                    aria-expanded={desktopMenu === item.href}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "material-symbols-outlined text-[16px] opacity-70 transition",
                        desktopMenu === item.href && "rotate-180",
                      )}
                    >
                      expand_more
                    </span>
                  </Link>

                  <div
                    className={cn(
                      "z-50 pt-3 transition",
                      desktopMenu === item.href
                        ? "visible opacity-100 pointer-events-auto"
                        : "invisible opacity-0 pointer-events-none",
                      item.groups?.length
                        ? "fixed left-1/2 top-[52px] w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 sm:top-[60px] xl:top-[68px]"
                        : "absolute left-1/2 top-full -translate-x-1/2",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-[14px] border border-primary/10 bg-white p-5 text-primary shadow-[0_18px_50px_rgba(0,11,29,0.12)]",
                        !item.groups?.length ? "min-w-[280px]" : undefined,
                        item.groups?.length ? "max-h-[min(70vh,560px)] overflow-y-auto p-6" : undefined,
                      )}
                    >
                      {item.children?.length ? (
                        <ul
                          className={cn(
                            "space-y-1",
                            item.groups?.length ? "mb-5 border-b border-primary/8 pb-4" : undefined,
                          )}
                        >
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
                                    isWideList
                                      ? "min-w-0 flex-1 xl:pl-8"
                                      : "w-full shrink-0 xl:w-[250px] xl:border-r xl:border-primary/10 xl:pr-8",
                                  )}
                                >
                                  <div className="mb-3 flex items-center justify-between gap-3 px-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                                      {group.label}
                                    </p>
                                    {group.label === "All Cars" ? (
                                      <Link
                                        href="/cars"
                                        className="text-[11px] font-semibold text-secondary hover:underline"
                                      >
                                        View all
                                      </Link>
                                    ) : null}
                                  </div>
                                  <ul
                                    className={cn(
                                      isWideList
                                        ? "grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-3"
                                        : "space-y-1",
                                    )}
                                  >
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
                                <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                                  {group.label}
                                </p>
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

          <div className="hidden items-center gap-3 xl:flex">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white/85 transition hover:border-accent hover:text-accent"
            >
              WhatsApp
            </a>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-wider !text-white transition hover:brightness-110"
            >
              Book Now
            </Link>
          </div>

          <div className="mobile-header-actions flex shrink-0 items-center gap-2 xl:hidden">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/20 text-accent"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.97.55 3.8 1.5 5.38L2 22l4.95-1.6a9.86 9.86 0 0 0 5.09 1.4h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.98c-.24.68-1.4 1.25-1.93 1.33-.5.07-1.13.1-1.83-.12-.42-.13-.97-.32-1.67-.62-2.94-1.27-4.85-4.23-5-4.42-.14-.19-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.45.27-.29.59-.36.79-.36h.57c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.29.15.46.12.63-.07.17-.2.73-.85.93-1.14.2-.29.4-.24.66-.14.27.1 1.7.8 1.99.95.29.15.48.22.55.34.07.13.07.73-.17 1.41Z" />
              </svg>
              <span className="mobile-whatsapp-label">WhatsApp</span>
            </a>
            <Link href="/contact" className="mobile-book-button">Book Now</Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/20 text-white"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="material-symbols-outlined text-[22px]">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </Container>
      </header>

      {mobileMenu}
    </>
  );
}
