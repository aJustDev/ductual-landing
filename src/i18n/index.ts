import { es } from "./es";
import { ca } from "./ca";
import type { Dict, Locale } from "./types";

const dicts: Record<Locale, Dict> = { es, ca };

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}

export function resolveLocale(value: string | undefined): Locale {
  return value === "ca" ? "ca" : "es";
}

export type { Dict, Locale };
