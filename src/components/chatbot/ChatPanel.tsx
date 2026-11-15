"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../../public/images/best-carz-logo.webp";
import { brand } from "@/lib/brand";
import { respond, welcome } from "@/lib/chatbot";
import type { ChatMessage, Chip } from "@/lib/chatbot";
import { BlockView, ChipRow } from "./MessageBlocks";

const STORAGE_KEY = "bc-chat-v1";
const MAX_STORED = 60;
const TYPING_MS = 500;

function loadMessages(): ChatMessage[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : null;
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // storage unavailable or corrupted: start fresh
  }
  return [{ id: "welcome", role: "bot", blocks: welcome() }];
}

function saveMessages(messages: ChatMessage[]) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
  } catch {
    // ignore: the chat still works without persistence
  }
}

let counter = 0;
const nextId = () => `m${Date.now()}-${counter++}`;

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => saveMessages(messages), [messages]);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
    const timerList = timers.current;
    return () => timerList.forEach((id) => window.clearTimeout(id));
  }, []);

  // Full-screen sheet on small screens: keep the page behind it from scrolling.
  useEffect(() => {
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    endRef.current?.scrollIntoView({ block: "end", behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing]);

  const send = useCallback((display: string, payload: string = display) => {
    const clean = display.trim();
    if (!clean) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", text: clean }]);
    setTyping(true);
    const id = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", blocks: respond(payload.trim()) }]);
      setTyping(false);
    }, TYPING_MS);
    timers.current.push(id);
  }, []);

  const onChip = (chip: Chip) => send(chip.label, chip.payload);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    // Focus trap: Tab and Shift+Tab cycle inside the panel.
    const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const closeOnSmallScreens = () => {
    if (window.matchMedia("(max-width: 639px)").matches) onClose();
  };

  const lastBotIndex = messages.map((m) => m.role).lastIndexOf("bot");

  return (
    <div
      ref={panelRef}
      id="bc-chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label={`${brand.shortName} Assistant chat`}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[70] flex h-dvh flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-13rem))] sm:w-[380px] sm:rounded-2xl sm:shadow-[0_24px_70px_rgba(21,24,29,0.32)]"
    >
      <header className="flex shrink-0 items-center gap-3 bg-brand-black px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white">
        <Image src={logo} alt="" className="site-brand-logo" style={{ height: 36, width: "auto" }} />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-[15px] font-semibold leading-tight">{brand.shortName} Assistant</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/85">
            <span className="h-2 w-2 rounded-full bg-[#25D366]" aria-hidden="true" />
            Online 24/7
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close chat"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            close
          </span>
        </button>
      </header>

      <div role="log" aria-live="polite" aria-label="Conversation" className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain bg-white px-4 py-4">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <div key={message.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-black px-4 py-3 text-sm leading-relaxed text-white">{message.text}</div>
            </div>
          ) : (
            <div key={message.id} className="flex flex-col items-start gap-2.5">
              {message.blocks?.map((block, blockIndex) =>
                block.type === "chips" ? (
                  index === lastBotIndex && !typing ? <ChipRow key={blockIndex} chips={block.chips} onChip={onChip} /> : null
                ) : (
                  <BlockView key={blockIndex} block={block} handlers={{ onChip, onNavigate: closeOnSmallScreens }} />
                ),
              )}
            </div>
          ),
        )}
        {typing ? (
          <div className="flex items-start" role="status" aria-label="Assistant is typing">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-[#f3f4f5] px-4 py-3.5" aria-hidden="true">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="h-2 w-2 rounded-full bg-brand-black/50 motion-safe:animate-bounce" style={{ animationDelay: `${dot * 120}ms` }} />
              ))}
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </div>

      <form
        className="flex shrink-0 items-center gap-2 border-t border-brand-black/10 bg-white px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
          setDraft("");
        }}
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          aria-label="Type your message"
          placeholder="Type your message…"
          autoComplete="off"
          enterKeyHint="send"
          maxLength={200}
          className="h-12 min-w-0 flex-1 rounded-full border border-brand-black/20 bg-white px-4 text-base text-brand-black outline-none placeholder:text-brand-black/60 focus:border-brand-black"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-red text-white transition hover:bg-brand-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-black"
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            send
          </span>
        </button>
      </form>
    </div>
  );
}
