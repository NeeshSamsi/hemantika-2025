// ./src/lib/internationalization.ts

import { Client, Content } from "@prismicio/client"

// Locale mapping configuration
export const localeMapping = {
  "en-in": { display: "EN", urlSegment: "en" },
  "es-es": { display: "ES", urlSegment: "es" },
} as const

export type PrismicLocale = keyof typeof localeMapping
export type UrlSegment = (typeof localeMapping)[PrismicLocale]["urlSegment"]

// Types for locale data
export interface LocaleForPath {
  lang: string
  url: string
  lang_name: string
}

// Helper functions for locale mapping
export function getUrlSegment(prismicLocale: PrismicLocale): string {
  return localeMapping[prismicLocale].urlSegment
}

export function getDisplayName(prismicLocale: PrismicLocale): string {
  return localeMapping[prismicLocale].display
}

export function getPrismicLocale(
  urlSegment: string
): PrismicLocale | undefined {
  const entry = Object.entries(localeMapping).find(
    ([_, config]) => config.urlSegment === urlSegment
  )
  return entry?.[0] as PrismicLocale | undefined
}

// Repository locale utilities - only keep the ones actually used
export async function getRepositoryLocalesSimple(
  client: Client<Content.AllDocumentTypes>
): Promise<{ lang: string; lang_name: string }[]> {
  const repository = await client.getRepository()
  return repository.languages.map((lang) => ({
    lang: lang.id,
    lang_name: lang.name,
  }))
}

// Path-based locale utilities
export async function getLocalesForPath(
  client: Client<Content.AllDocumentTypes>,
  pathname: string
): Promise<LocaleForPath[]> {
  const repository = await client.getRepository()
  const first = pathname.split("/").filter(Boolean)[0]

  return repository.languages.map((lang) => {
    const rest = pathname
      .split("/")
      .filter(Boolean)
      .slice(first ? 1 : 0)
      .join("/")
    const url = `/${lang.id}${rest ? "/" + rest : ""}`
    return {
      lang: lang.id,
      url,
      lang_name: lang.name,
    }
  })
}

// Utility to get default locale
export async function getDefaultLocale(
  client: Client<Content.AllDocumentTypes>
): Promise<string> {
  const repository = await client.getRepository()
  const defaultPrismicLocale = repository.languages[0]?.id || "en-in"
  return (
    getUrlSegment(defaultPrismicLocale as PrismicLocale) || defaultPrismicLocale
  )
}

// Utility to check if a pathname is missing a locale
export async function isPathnameMissingLocale(
  client: Client<Content.AllDocumentTypes>,
  pathname: string
): Promise<boolean> {
  const repository = await client.getRepository()
  const urlSegments = repository.languages.map(
    (lang) => getUrlSegment(lang.id as PrismicLocale) || lang.id
  )

  return urlSegments.every(
    (segment) =>
      !pathname.startsWith(`/${segment}/`) && pathname !== `/${segment}`
  )
}

// Utility to get current locale from pathname
export function getCurrentLocaleFromPathname(
  pathname: string,
  availableLocales: { lang: string; lang_name: string }[]
): string {
  if (!pathname) return availableLocales[0]?.lang || ""

  const first = pathname.split("/").filter(Boolean)[0]

  // Check if the URL segment matches any mapped locale
  const mappedLocale = Object.entries(localeMapping).find(
    ([_, config]) => config.urlSegment === first
  )?.[0] as PrismicLocale | undefined

  if (mappedLocale) return mappedLocale

  // Fallback to direct match
  return (
    availableLocales.find((l) => l.lang === first)?.lang ||
    availableLocales[0]?.lang ||
    ""
  )
}

// Utility to build locale URL
export function buildLocaleUrl(locale: string, pathname: string): string {
  if (!pathname) return `/${locale}`

  const segments = pathname.split("/")
  const urlSegment = getUrlSegment(locale as PrismicLocale) || locale

  if (segments.length > 1) {
    const rest = segments.filter(Boolean).slice(1)
    return `/${urlSegment}${rest.length ? "/" + rest.join("/") : ""}`
  }

  return `/${urlSegment}`
}
