import type { Locale } from "../config";
import {
  tr,
  type Dictionary,
  type ServiceFaq,
  type ServiceItem,
  type SourceLink,
} from "./tr";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { tr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Sözlükteki "{ad}" yer tutucularını doldurur: fill("{service} alanında…",
 * { service: "Web Sitesi" }). Cümlenin geri kalanı iki dilde farklı
 * kurulduğu için birleştirme sözlükte değil, burada yapılıyor.
 */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

export type { Dictionary, ServiceFaq, ServiceItem, SourceLink };
