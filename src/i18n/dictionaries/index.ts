import { serviceSlugs, type Locale, type ServiceSlug } from "../config";
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

/**
 * Hizmet adları, slug'a göre. İstemci bileşenlerine bütün sözlük yerine bu
 * gidiyor: istemci bileşeninin prop'ları sayfanın HTML'ine gömülüyor;
 * sözlüğün tamamı (KVKK metni dahil) ana sayfa ve İletişim'e ~21 KB
 * ekliyordu. Sunucu tarafında çağrılmalı: istemci bileşeni bu dosyadan
 * değer içe aktarırsa iki sözlük de tarayıcı paketine giriyor.
 */
export function serviceTitles(dict: Dictionary): Record<ServiceSlug, string> {
  return Object.fromEntries(
    serviceSlugs.map((slug) => [slug, dict.services.items[slug].title]),
  ) as Record<ServiceSlug, string>;
}

export type { Dictionary, ServiceFaq, ServiceItem, SourceLink };
