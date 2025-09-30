import { client } from "@/lib/prismic"
import { getRepositoryLocalesSimple } from "@/lib/internationalization"

import { PrismicNextImage } from "@prismicio/next"
import Section from "./Section"
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"

import bgAsset from "@/../public/bg-assets/nav.png"

export default async function Navbar() {
  const {
    data: { sbdc_logo, nupura_logo, banner },
  } = await client.getSingle("settings")

  const locales = await getRepositoryLocalesSimple(client)

  return (
    <Section as="nav" className="relative gap-y-4 py-6">
      <p className="col-span-full text-center text-sm font-medium sm:text-base md:hidden">
        {banner}
      </p>

      <div className="col-span-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <PrismicNextImage
            field={sbdc_logo}
            className="aspect-square size-10 lg:size-12"
          />
          <div className="bg-light w-0.5 grow rounded-full lg:h-12" />
          <PrismicNextImage
            field={nupura_logo}
            className="h-7 w-20 lg:h-8 lg:w-24"
          />
        </div>

        <p className="hidden font-medium md:block">{banner}</p>

        <LanguageSwitcher locales={locales} />
      </div>

      <Image
        src={bgAsset}
        alt=""
        className="absolute -top-30 -right-32 -z-10 size-80 sm:-top-36 sm:-right-48 sm:size-96 lg:-top-44 lg:-right-64 lg:size-120 xl:-top-56 xl:-right-72 xl:size-150"
      />
    </Section>
  )
}
