"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand } from "@/lib/brand";

// The panel (and the car data it renders) is only downloaded when the chat is first opened.
const ChatPanel = dynamic(() => import("./ChatPanel"), { ssr: false });

const TIP_KEY = "bc-chat-tip";
const TIP_DELAY_MS = 5000;
const PULSE_MS = 8000;

function tipAlreadyShown() {
  try {
    return window.sessionStorage.getItem(TIP_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberTip() {
  try {
    window.sessionStorage.setItem(TIP_KEY, "1");
  } catch {
    // ignore
  }
}

/** Floating chat button, "Need help?" bubble and the lazily loaded chat panel. Mounted once in SiteShell. */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [tip, setTip] = useState(false);
  const [pulse, setPulse] = useState(true);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const pulseTimer = window.setTimeout(() => setPulse(false), PULSE_MS);
    let tipTimer = 0;
    if (!tipAlreadyShown()) {
      tipTimer = window.setTimeout(() => {
        setTip(true);
        rememberTip();
      }, TIP_DELAY_MS);
    }
    return () => {
      window.clearTimeout(pulseTimer);
      window.clearTimeout(tipTimer);
    };
  }, []);

  const openChat = useCallback(() => {
    setEverOpened(true);
    setOpen(true);
    setTip(false);
    rememberTip();
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="print:hidden">
      {everOpened && open ? <ChatPanel onClose={closeChat} /> : null}

      <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-[60]">
        {tip && !open ? (
          <div className="absolute bottom-[calc(100%+0.75rem)] right-0 flex items-center rounded-2xl bg-white pl-4 shadow-[0_12px_32px_rgba(21,24,29,0.22)] ring-1 ring-brand-black/10">
            <button
              type="button"
              onClick={openChat}
              className="min-h-11 whitespace-nowrap text-sm font-semibold text-brand-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
            >
              Need help?
            </button>
            <button
              type="button"
              onClick={() => setTip(false)}
              aria-label="Dismiss"
              className="grid h-11 w-11 place-items-center text-brand-black/70 hover:text-brand-black focus-visible:outline-2 focus-visible:outline-brand-black"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                close
              </span>
            </button>
            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-white ring-1 ring-brand-black/10 [clip-path:polygon(100%_0,100%_100%,0_100%)]" aria-hidden="true" />
          </div>
        ) : null}

        <button
          ref={launcherRef}
          type="button"
          onClick={open ? closeChat : openChat}
          onMouseEnter={() => import("./ChatPanel")}
          onFocus={() => import("./ChatPanel")}
          aria-label={open ? "Close chat assistant" : `Open ${brand.shortName} chat assistant`}
          aria-expanded={open}
          aria-controls="bc-chat-panel"
          className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-red text-white shadow-[0_10px_28px_rgba(21,24,29,0.35)] ring-[3px] ring-white transition hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-black"
        >
          {pulse && !open ? (
            <span className="absolute inset-0 -z-10 rounded-full bg-brand-red/50 motion-safe:animate-ping" aria-hidden="true" />
          ) : null}
          {open ? (
            <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
              close
            </span>
          ) : (
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.55 1.26 4.84 3.27 6.44-.13 1.4-.62 2.72-1.42 3.84a.6.6 0 0 0 .66.93c1.9-.4 3.55-1.2 4.79-2.1.85.18 1.74.28 2.7.28 5.52 0 10-3.92 10-8.75S17.52 2 12 2Zm-4 9.9a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Zm4 0a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Zm4 0a1.15 1.15 0 1 1 0-2.3 1.15 1.15 0 0 1 0 2.3Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
