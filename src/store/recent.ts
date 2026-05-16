"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RecentItem } from "@/lib/types";

type State = {
  items: RecentItem[];
  push: (item: Omit<RecentItem, "viewedAt">) => void;
  clear: () => void;
};

export const useRecent = create<State>()(
  persist(
    (set, get) => ({
      items: [],
      push: (item) => {
        const next = [
          { ...item, viewedAt: Date.now() },
          ...get().items.filter((x) => x.productId !== item.productId),
        ].slice(0, 10);
        set({ items: next });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "luxe-recent" },
  ),
);
