import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { asImageSrc } from "@prismicio/client"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"
import { getPrismicLocale } from "@/lib/internationalization"

type Props = {
  params: Promise<{ lang: string }>
}

export default async function Page({ params }: Props) {
  const { lang } = await params
  const client = createClient()
  const prismicLocale = getPrismicLocale(lang) || lang
  const page = await client
    .getSingle("home", { lang: prismicLocale })
    .catch(() => notFound())

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const client = createClient()
  const prismicLocale = getPrismicLocale(lang) || lang
  const page = await client
    .getSingle("home", { lang: prismicLocale })
    .catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  }
}
