import { FC } from "react"
import { asText, asDate, Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import Heading2 from "@/components/Heading2"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import { formatDateWithOrdinal } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

/**
 * Props for `EventDetailsHighlight`.
 */
export type EventDetailsHighlightProps =
  SliceComponentProps<Content.EventDetailsHighlightSlice>

/**
 * Component for "EventDetailsHighlight" Slices.
 */
const EventDetailsHighlight: FC<EventDetailsHighlightProps> = ({
  slice: {
    slice_type,
    variation,
    primary: {
      heading,
      image,
      subtitle,
      title,
      date,
      venue,
      entry_time,
      show_time,
      cta_button,
    },
  },
}) => {
  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="col-span-full my-8 grid grid-cols-subgrid space-y-8 md:my-16 md:space-y-12"
    >
      <Heading2 className="col-span-full">{asText(heading)}</Heading2>

      <div className="bg-light/8 border-light col-span-full flex grid-cols-subgrid flex-col overflow-hidden rounded border md:grid md:overflow-visible">
        <div className="relative col-span-6 hidden h-full md:block">
          <div className="border-light absolute inset-y-4 right-0 -left-4 overflow-hidden rounded border lg:inset-y-8 lg:-left-8">
            <div className="relative h-full w-full">
              <PrismicNextImage
                field={image}
                fill
                className="absolute inset-0 object-cover"
              />
            </div>
          </div>
        </div>

        <PrismicNextImage field={image} className="block md:hidden" />

        <div className="col-span-6 space-y-4 p-6 md:py-4 md:pr-4 md:pl-0 lg:space-y-6 lg:py-8 lg:pr-8">
          <div className="space-y-2 lg:space-y-4">
            <h3 className="font-heading text-2xl font-medium lg:text-3xl xl:text-4xl">
              {asText(subtitle)}
            </h3>
            <p className="font-heading text-3xl font-bold lg:text-4xl xl:text-5xl">
              {asText(title)}
            </p>
          </div>

          <div className="space-y-2 text-base lg:text-lg">
            <div>
              <p className="font-semibold">Date:</p>
              <p>{formatDateWithOrdinal(asDate(date)!)}</p>
            </div>

            <div>
              <p className="font-semibold">Venue:</p>
              <PrismicNextLink field={venue} />
            </div>

            <div className="flex gap-6">
              <div>
                <p className="font-semibold">Entry:</p>
                <p>{entry_time}</p>
              </div>
              <div>
                <p className="font-semibold">Show:</p>
                <p>{show_time}</p>
              </div>
            </div>
          </div>

          <Button asChild variant="secondary">
            <PrismicNextLink field={cta_button}>
              <span>{cta_button.text}</span>
              <ArrowUpRight className="size-6" />
            </PrismicNextLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
export default EventDetailsHighlight
