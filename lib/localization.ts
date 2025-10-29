import type { Locale } from '@/i18n';
import type { LocalizedString } from './types';

/**
 * Get localized string based on locale, falling back to other locales if needed
 */
export function getLocalizedString(
  value: string | LocalizedString | undefined,
  locale: Locale
): string {
  if (!value) return '';
  
  // If it's already a string, return it (backward compatibility)
  if (typeof value === 'string') {
    return value;
  }

  // Try to get the value for the requested locale
  // Fallback order: requested locale -> en -> first available
  
  if (value[locale]) {
    return value[locale]!;
  }
  
  if (value.en) {
    return value.en;
  }
  
  // Return first available value
  return value.ar || value.ckb || '';
}

/**
 * Get localized product name
 */
export function getProductName(product: { name: string | LocalizedString }, locale: Locale): string {
  return getLocalizedString(product.name, locale);
}

/**
 * Get localized product description
 */
export function getProductDescription(
  product: { description?: string | LocalizedString },
  locale: Locale
): string {
  return getLocalizedString(product.description, locale) || '';
}

