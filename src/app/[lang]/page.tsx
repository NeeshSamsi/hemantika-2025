import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { asImageSrc } from "@prismicio/client"
import { SliceZone } from "@prismicio/react"

import { createClient } from "@/prismicio"
import { components } from "@/slices"

type Props = {
  params: { lang: string }
}

export default async function Page({ params: { lang } }: Props) {
  const client = createClient()
  const page = await client.getSingle("home", { lang }).catch(() => notFound())

  return (
    <>{/* <SliceZone slices={page.data.slices} components={components} /> */}</>
  )
}

export async function generateMetadata({
  params: { lang },
}: Props): Promise<Metadata> {
  const client = createClient()
  const page = await client.getSingle("home", { lang }).catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  }
}
