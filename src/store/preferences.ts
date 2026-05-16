"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Currency } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

type State = {
  currency: Currency;
  locale: Locale;
  setCurrency: (c: Currency) => void;
  setLocale: (l: Locale) => void;
};

export const usePreferences = create<State>()(
  persist(
    (set) => ({
      currency: "MNT",
      locale: "mn",
      setCurrency: (currency) => set({ currency }),
      setLocale: (locale) => set({ locale }),
    }),
    { name: "luxe-prefs" },
  ),
);
