import type { Locale } from '@/lib/i18n';
import ko, { type Dictionary } from './ko';
import en from './en';
import zh from './zh';

const DICTS: Record<Locale, Dictionary> = { ko, en, zh };

export function getDictionary(locale: Locale): Dictionary {
  return DICTS[locale] ?? ko;
}

export type { Dictionary };
