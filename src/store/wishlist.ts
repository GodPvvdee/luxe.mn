"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishItem } from "@/lib/types";

type WishlistState = {
  items: WishItem[];
  toggle: (item: WishItem) => void;
  remove: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => {
        const exists = get().items.some((x) => x.productId === item.productId);
        if (exists) {
          set({ items: get().items.filter((x) => x.productId !== item.productId) });
        } else {
          set({ items: [item, ...get().items] });
        }
      },
      remove: (productId) =>
        set({ items: get().items.filter((x) => x.productId !== productId) }),
      has: (productId) => get().items.some((x) => x.productId === productId),
      clear: () => set({ items: [] }),
    }),
    { name: "luxe-wishlist" },
  ),
);
