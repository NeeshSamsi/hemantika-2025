import { FC } from "react"
import { asText, Content } from "@prismicio/client"
import { PrismicRichText, SliceComponentProps } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import Image from "next/image"

import bgAsset1 from "@/../public/bg-assets/timeline-1.png"
import bgAsset2 from "@/../public/bg-assets/timeline-2.png"
import bgAsset3 from "@/../public/bg-assets/timeline-3.png"

/**
 * Props for `TimelineMilestones`.
 */
export type TimelineMilestonesProps =
  SliceComponentProps<Content.TimelineMilestonesSlice>

/**
 * Component for "TimelineMilestones" Slices.
 */
const TimelineMilestones: FC<TimelineMilestonesProps> = ({
  slice: {
    slice_type,
    variation,
    primary: { heading, timeline },
  },
}) => {
  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="col-span-full my-8 grid grid-cols-subgrid space-y-8 md:my-16 md:space-y-12"
    >
      <h2 className="font-heading col-span-full text-3xl font-bold lg:text-4xl xl:text-5xl">
        {asText(heading)}
      </h2>

      <div className="col-span-full grid grid-cols-subgrid space-y-8 md:space-y-12">
        {timeline.map(({ year, image, description }, i) => (
          <div
            key={i}
            className={`relative col-span-full col-start-1 flex flex-col gap-4 sm:col-span-8 md:gap-6 ${i % 2 === 0 ? "sm:col-start-1" : "sm:col-start-3"}`}
          >
            <div className="flex gap-2 md:gap-6">
              <div className="flex flex-shrink-0 flex-col items-center gap-2 md:gap-4">
                <div className="bg-light h-full w-0.5 rounded" />
                <h3 className="vertical font-heading text-4xl font-light italic sm:text-5xl md:text-6xl">
                  {year}
                </h3>
              </div>

              <div className="min-w-0 flex-1">
                <PrismicNextImage
                  field={image}
                  className="border-light h-auto w-full rounded border object-cover"
                />
              </div>
            </div>
            <div className="prose-base text-light prose-p:leading-normal">
              <PrismicRichText field={description} />
            </div>

            {i === 0 && (
              <Image
                src={bgAsset1}
                alt=""
                className="absolute -top-40 -left-64 -z-10 w-120 sm:-top-48 sm:-left-72 md:-top-64 md:-left-88 lg:-top-72 lg:-left-120 lg:w-180 xl:-top-72 xl:-left-148 xl:w-220"
              />
            )}
            {i === 1 && (
              <Image
                src={bgAsset2}
                alt=""
                className="absolute -top-32 -right-32 -z-10 w-160 sm:-top-48 sm:-right-48 sm:w-200 lg:-top-80 lg:-right-80"
              />
            )}
            {i === 2 && (
              <Image
                src={bgAsset3}
                alt=""
                className="absolute -top-40 -left-48 -z-10 w-100 sm:-top-56 sm:-left-64 md:-top-80 md:-left-72 md:w-120 lg:-top-88 lg:-left-104 lg:w-160"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TimelineMilestones
