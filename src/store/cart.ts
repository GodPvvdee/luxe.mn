"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

type CartState = {
  items: CartItem[];
  open: boolean;
  promo: { code: string; percent: number } | null;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "id" | "quantity">, qty?: number) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  subtotal: () => number;
  count: () => number;
};

const PROMOS: Record<string, number> = {
  LUXE10: 10,
  WELCOME15: 15,
  SUMMER25: 25,
};

const lineKey = (i: Omit<CartItem, "id" | "quantity">) =>
  `${i.productId}-${i.size ?? ""}-${i.color ?? ""}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      promo: null,
      setOpen: (open) => set({ open }),
      add: (item, qty = 1) => {
        const key = lineKey(item);
        const existing = get().items.find(
          (x) => lineKey(x) === key,
        );
        if (existing) {
          set({
            items: get().items.map((x) =>
              x.id === existing.id
                ? { ...x, quantity: Math.min(x.quantity + qty, x.maxStock) }
                : x,
            ),
          });
        } else {
          set({
            items: [
              ...get().items,
              { ...item, id: crypto.randomUUID(), quantity: qty },
            ],
          });
        }
      },
      remove: (lineId) =>
        set({ items: get().items.filter((x) => x.id !== lineId) }),
      setQty: (lineId, qty) =>
        set({
          items: get().items.map((x) =>
            x.id === lineId
              ? { ...x, quantity: Math.max(1, Math.min(qty, x.maxStock)) }
              : x,
          ),
        }),
      clear: () => set({ items: [], promo: null }),
      applyPromo: (code) => {
        const percent = PROMOS[code.toUpperCase()];
        if (!percent) return false;
        set({ promo: { code: code.toUpperCase(), percent } });
        return true;
      },
      removePromo: () => set({ promo: null }),
      subtotal: () =>
        get().items.reduce((s, x) => s + x.price * x.quantity, 0),
      count: () => get().items.reduce((s, x) => s + x.quantity, 0),
    }),
    { name: "luxe-cart" },
  ),
);
