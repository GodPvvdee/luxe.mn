import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Тэмдэгтийг гараар тодорхойлсон — Intl.NumberFormat нь Node/Browser хооронд
// MNT-г өөр өөрөөр format-дог (Node: "MNT", browser: "₮") бөгөөд hydration
// mismatch үүсгэдэг. "en-US" grouping deterministic тул түүн дээр найдна.
const SYMBOLS: Record<string, string> = {
  MNT: "₮",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
};

const SYMBOL_AFTER = new Set(["MNT"]);

export function formatPrice(value: number | string, currency = "MNT") {
  const n = typeof value === "string" ? parseFloat(value) : value;
  const symbol = SYMBOLS[currency] ?? currency;
  const rounded = Math.round(n);
  const grouped = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(rounded);
  return SYMBOL_AFTER.has(currency)
    ? `${grouped} ${symbol}`
    : `${symbol}${grouped}`;
}

const MN_MONTHS = [
  "1-р сар",
  "2-р сар",
  "3-р сар",
  "4-р сар",
  "5-р сар",
  "6-р сар",
  "7-р сар",
  "8-р сар",
  "9-р сар",
  "10-р сар",
  "11-р сар",
  "12-р сар",
];

export function formatDate(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return `${d.getFullYear()} оны ${MN_MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function debounce<T extends (...args: never[]) => unknown>(
  fn: T,
  delay = 300,
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function truncate(s: string, len = 80) {
  if (s.length <= len) return s;
  return s.slice(0, len - 1).trimEnd() + "…";
}

export function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}
