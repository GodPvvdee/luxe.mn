// Хялбар i18n scaffold. Production-д next-intl ашиглахыг зөвлөнө.
export type Locale = "mn" | "en";

export const dictionaries: Record<Locale, Record<string, string>> = {
  mn: {
    "nav.shop": "Дэлгүүр",
    "nav.categories": "Ангилал",
    "nav.bestsellers": "Шилдэг борлуулагч",
    "nav.sale": "Хямдрал",
    "cart.empty": "Сагс хоосон байна",
    "cart.title": "Сагс",
  },
  en: {
    "nav.shop": "Shop",
    "nav.categories": "Categories",
    "nav.bestsellers": "Bestsellers",
    "nav.sale": "Sale",
    "cart.empty": "Your cart is empty",
    "cart.title": "Shopping Cart",
  },
};

export function t(locale: Locale, key: string) {
  return dictionaries[locale]?.[key] ?? dictionaries.mn[key] ?? key;
}
