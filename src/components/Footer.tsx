import { client } from "@/lib/prismic"

import { PrismicNextImage } from "@prismicio/next"
import Section from "./Section"

import { Instagram, Phone } from "lucide-react"

export default async function Footer() {
  const {
    data: { nupura_logo, address, instagram, number },
  } = await client.getSingle("settings")

  return (
    <Section
      as="footer"
      className="relative flex flex-col items-center gap-4 pt-12 pb-24 md:gap-6"
    >
      <PrismicNextImage field={nupura_logo} className="w-24 md:w-32" />
      <p className="max-w-[25ch] text-center text-lg font-light md:text-xl">
        {address}
      </p>
      <div className="flex flex-col items-center gap-2 text-base font-medium sm:flex-row sm:gap-6 md:gap-8 md:text-lg">
        <a
          href={`https://instagram.com/${instagram}`}
          className="group/insta flex items-center gap-2"
        >
          <Instagram className="size-4 md:size-5" />
          <p className="group-hover/insta:underline">{instagram}</p>
        </a>
        <a
          href={`tel:${number}`}
          className="group/phone flex items-center gap-2"
        >
          <Phone className="size-4 md:size-5" />
          <p className="group-hover/phone:underline">{number}</p>
        </a>
      </div>
    </Section>
  )
}
