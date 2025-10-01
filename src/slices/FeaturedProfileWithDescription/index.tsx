import { FC } from "react"
import { asText, Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import Image from "next/image"

import profileBg from "@/../public/bg-assets/feature-profile.png"
import bgAsset from "@/../public/bg-assets/feature.png"

/**
 * Props for `FeaturedProfileWithDescription`.
 */
export type FeaturedProfileWithDescriptionProps =
  SliceComponentProps<Content.FeaturedProfileWithDescriptionSlice>

/**
 * Component for "FeaturedProfileWithDescription" Slices.
 */
const FeaturedProfileWithDescription: FC<
  FeaturedProfileWithDescriptionProps
> = ({
  slice: {
    slice_type,
    variation,
    primary: { image, title, description },
  },
}) => {
  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="border-light bg-light/8 relative col-span-full mt-8 grid grid-cols-1 rounded border backdrop-blur-xl sm:mt-16 md:mt-32 xl:grid-cols-2"
    >
      <div className="relative hidden xl:block">
        <PrismicNextImage
          field={image}
          className="bottom-0 left-0 w-116 max-w-xl origin-bottom px-8 xl:absolute xl:w-full"
        />
        <Image
          src={profileBg}
          alt=""
          className="absolute bottom-0 left-0 -z-10 aspect-square size-220"
        />
      </div>

      <div className="space-y-6 p-4 md:px-8 md:py-6">
        <h2 className="font-heading text-3xl font-bold text-balance lg:text-4xl xl:text-5xl">
          {asText(title)}
        </h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-0 xl:block">
          <div className="prose-base text-light prose-p:leading-normal max-w-none">
            <PrismicRichText field={description} />
          </div>
          <div className="relative block xl:hidden">
            <PrismicNextImage
              field={image}
              className="-bottom-6 left-0 block w-full translate-y-4 sm:w-2/3 md:translate-y-6 lg:absolute lg:w-full lg:translate-y-0 lg:pl-6"
            />
            <Image
              src={profileBg}
              alt=""
              className="absolute -right-12 bottom-6 -z-10 hidden aspect-square size-160 lg:block"
            />
          </div>
        </div>
      </div>

      <Image
        src={bgAsset}
        alt=""
        className="absolute -right-50 -bottom-48 -z-10 w-120 sm:-right-80 sm:-bottom-64 xl:-right-96 xl:-bottom-72 xl:w-180"
      />
    </section>
  )
}

export default FeaturedProfileWithDescription
