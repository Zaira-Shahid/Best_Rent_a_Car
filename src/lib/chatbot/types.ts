/** Serializable chat model: messages hold plain data (slugs, labels) so they can live in sessionStorage. */

export type Chip = { label: string; payload: string };

export type ChatButton = {
  label: string;
  href: string;
  tone?: "whatsapp" | "dark" | "red";
  external?: boolean;
};

export type Block =
  | { type: "text"; text: string }
  | { type: "chips"; chips: Chip[] }
  | { type: "cars"; slugs: string[] }
  | { type: "links"; items: { label: string; href: string }[] }
  | { type: "buttons"; items: ChatButton[] }
  | { type: "contact" }
  | { type: "reviews" };

export type ChatMessage = {
  id: string;
  role: "bot" | "user";
  /** User messages carry plain text; bot messages carry blocks. */
  text?: string;
  blocks?: Block[];
};
