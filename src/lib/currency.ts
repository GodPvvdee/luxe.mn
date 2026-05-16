import type { Currency } from "./types";

// Үндсэн үнэ нь USD-аар хадгалагдана, харин default үзүүлэх валют нь MNT.
// Production-д хансыг ECB, Open Exchange Rates г.м. үйлчилгээнээс татна.
export const currencies: {
  code: Currency;
  label: string;
  symbol: string;
  rate: number;
  locale: string;
  decimals: number;
}[] = [
  { code: "MNT", label: "Монгол төгрөг", symbol: "₮", rate: 3500, locale: "mn-MN", decimals: 0 },
  { code: "USD", label: "Америк доллар", symbol: "$", rate: 1, locale: "en-US", decimals: 0 },
  { code: "EUR", label: "Евро", symbol: "€", rate: 0.92, locale: "en-IE", decimals: 0 },
  { code: "GBP", label: "Британийн фунт", symbol: "£", rate: 0.78, locale: "en-GB", decimals: 0 },
  { code: "JPY", label: "Японы иен", symbol: "¥", rate: 152, locale: "ja-JP", decimals: 0 },
];

export function convert(amountUSD: number, code: Currency) {
  const c = currencies.find((x) => x.code === code) ?? currencies[0];
  return amountUSD * c.rate;
}

export function currencyInfo(code: Currency) {
  return currencies.find((x) => x.code === code) ?? currencies[0];
}
