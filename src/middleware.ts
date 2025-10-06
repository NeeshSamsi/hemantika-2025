// ./src/middleware.ts

import { NextRequest, NextResponse } from "next/server"
import { client } from "@/lib/prismic"
import {
  getPrismicLocale,
  getDefaultLocale,
  isPathnameMissingLocale,
} from "@/lib/internationalization"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if pathname starts with a mapped URL segment
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  const mappedPrismicLocale = getPrismicLocale(firstSegment)

  if (mappedPrismicLocale) {
    // Rewrite the URL internally to use the Prismic locale ID
    const rest = pathname.split("/").filter(Boolean).slice(1).join("/")
    const newPath = `/${mappedPrismicLocale}${rest ? "/" + rest : ""}`
    const url = new URL(newPath, request.url)
    return NextResponse.rewrite(url)
  }

  const pathnameIsMissingLocale = await isPathnameMissingLocale(
    client,
    pathname,
  )

  if (pathnameIsMissingLocale) {
    const defaultLocale = await getDefaultLocale(client)
    const url = new URL(`/${defaultLocale}${pathname}`, request.url)
    return NextResponse.redirect(url)
  }
}

export const config = {
  // Don't change the URL of Next.js assets starting with _next, API routes, or slice-simulator
  matcher: ["/((?!_next|api|slice-simulator).*)"],
}
