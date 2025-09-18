"use client"

import { useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { usePathname, useRouter } from "next/navigation"
import {
  localeMapping,
  getUrlSegment,
  getDisplayName,
  type PrismicLocale,
  getCurrentLocaleFromPathname,
  buildLocaleUrl,
} from "@/lib/internationalization"

type Props = {
  locales: {
    lang: string
    lang_name: string
  }[]
}

export default function LanguageSwitcher({ locales }: Props) {
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = useMemo(() => {
    return getCurrentLocaleFromPathname(pathname, locales)
  }, [pathname, locales])

  function switchTo(lang: string) {
    if (!pathname) return
    const newPath = buildLocaleUrl(lang, pathname)
    router.push(newPath)
  }

  return (
    <Select value={currentLang} onValueChange={switchTo}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            getDisplayName(currentLang as PrismicLocale) ||
            currentLang.toUpperCase()
          }
        />
      </SelectTrigger>
      <SelectContent>
        {locales.map(({ lang, lang_name }) => {
          const displayName = getDisplayName(lang as PrismicLocale) || lang_name
          return (
            <SelectItem key={lang} value={lang}>
              {displayName}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
