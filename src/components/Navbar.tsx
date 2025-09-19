import { client } from "@/lib/prismic"
import { PrismicNextImage } from "@prismicio/next"
import LanguageSwitcher from "./LanguageSwitcher"
import { getRepositoryLocalesSimple } from "@/lib/internationalization"
import Section from "./Section"

export default async function Navbar() {
  const {
    data: { sbdc_logo, nupura_logo, banner },
  } = await client.getSingle("settings")

  const locales = await getRepositoryLocalesSimple(client)

  return (
    <Section as="nav">
      <div className="flex items-center justify-between col-span-full">
        <div className="flex items-center gap-x-4">
          <PrismicNextImage field={sbdc_logo} className="aspect-square w-12" />
          <div className="w-0.5 h-14 bg-light rounded-full" />
          <PrismicNextImage field={nupura_logo} className="w-24 h-8" />
        </div>

        <p className="font-medium">{banner}</p>

        <LanguageSwitcher locales={locales} />
      </div>
    </Section>
  )
}
