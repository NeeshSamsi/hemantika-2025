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
    if (!pathname) return locales[0]?.lang || ""
    const first = pathname.split("/").filter(Boolean)[0]
    return locales.find((l) => l.lang === first)?.lang || locales[0]?.lang || ""
  }, [pathname, locales])

  function switchTo(lang: string) {
    if (!pathname) return
    const segments = pathname.split("/")
    // segments: ["", lang, ...rest] or ["", ...]
    if (segments.length > 1) {
      // replace first non-empty segment with new lang
      const rest = segments.filter(Boolean).slice(1)
      const newPath = `/${lang}${rest.length ? "/" + rest.join("/") : ""}`
      router.push(newPath)
    } else {
      router.push(`/${lang}`)
    }
  }

  return (
    <Select value={currentLang} onValueChange={switchTo}>
      <SelectTrigger>
        <SelectValue placeholder={currentLang.toUpperCase()} />
      </SelectTrigger>
      <SelectContent>
        {locales.map(({ lang, lang_name }) => (
          <SelectItem key={lang} value={lang}>
            {lang_name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
