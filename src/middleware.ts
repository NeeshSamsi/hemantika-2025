// ./src/middleware.ts

import { NextRequest, NextResponse } from "next/server"
import { client } from "@/lib/prismic"

export async function middleware(request: NextRequest) {
  const repository = await client.getRepository()

  const locales = repository.languages.map((lang) => lang.id)
  const defaultLocale = locales[0]

  const { pathname } = request.nextUrl

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, request.url)
    return NextResponse.redirect(url)
  }
}

export const config = {
  // Don’t change the URL of Next.js assets starting with _next or API routes
  matcher: ["/((?!_next|api).*)"],
}
