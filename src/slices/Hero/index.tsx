import { FC } from "react"
import { asText, Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"

import { Button } from "@/components/ui/button"
import { PrismicNextLink } from "@prismicio/next"
import Image from "next/image"

import bgAsset from "@/../public/bg-assets/hero.png"

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({
  slice: {
    slice_type,
    variation,
    primary: { eyebrow, heading, description, ticket, workshops },
  },
}) => {
  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="relative col-span-full py-8"
    >
      <div className="font-heading mb-6 text-center font-bold lg:mb-10">
        <h1 className="mb-4 text-2xl lg:mb-8 lg:text-3xl">{eyebrow}</h1>
        <h2 className="mx-auto mb-4 max-w-[15ch] text-4xl lg:mb-6 lg:text-6xl">
          {asText(heading)}
        </h2>
        <p className="font-body mx-auto max-w-[45ch] text-center text-base font-normal lg:text-lg">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <Button asChild variant="primary">
          <PrismicNextLink field={ticket} />
        </Button>
        <Button asChild variant="outline">
          <PrismicNextLink field={workshops} />
        </Button>
      </div>

      <Image
        src={bgAsset}
        alt=""
        className="absolute top-0 -left-48 -z-10 w-96 sm:-left-72 sm:w-120 lg:w-144"
      />
    </section>
  )
}

export default Hero
