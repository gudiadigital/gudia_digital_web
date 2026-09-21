import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type PageContentProps = {
  locale: Locale;
  dict: Dictionary;
};
