import { FC } from "react"
import { asText, Content } from "@prismicio/client"
import { SliceComponentProps } from "@prismicio/react"
import Heading2 from "@/components/Heading2"
import { PrismicNextLink } from "@prismicio/next"
import type { EventsSliceDefaultPrimaryEventsItem } from "@/../prismicio-types"
import { formatDateWithOrdinal } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

import bgAsset from "@/../public/bg-assets/events.png"

/**
 * Props for `Events`.
 */
export type EventsProps = SliceComponentProps<Content.EventsSlice>

/**
 * Grouped events structure
 */
type GroupedEventsByDate = {
  date: string | null
  events: EventsSliceDefaultPrimaryEventsItem[]
}[]

/**
 * Component for "Events" Slices.
 */
const Events: FC<EventsProps> = ({
  slice: {
    slice_type,
    variation,
    primary: { heading, venue, events },
  },
}) => {
  // Group events by date and sort by earliest first
  const groupedEvents = events.reduce(
    (
      groups: GroupedEventsByDate,
      event: EventsSliceDefaultPrimaryEventsItem,
    ) => {
      const eventDate = event.date
      const existingGroup = groups.find((group) => group.date === eventDate)

      if (existingGroup) {
        existingGroup.events.push(event)
      } else {
        groups.push({
          date: eventDate,
          events: [event],
        })
      }

      return groups
    },
    [] as GroupedEventsByDate,
  )

  // Sort groups by date (earliest first)
  groupedEvents.sort(
    (a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime(),
  )

  console.log(JSON.stringify(groupedEvents, null, 2))

  return (
    <section
      data-slice-type={slice_type}
      data-slice-variation={variation}
      className="relative col-span-full my-8 grid grid-cols-subgrid space-y-8 md:my-16 md:space-y-12"
    >
      <div className="col-span-full space-y-2">
        <Heading2>{asText(heading)}</Heading2>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-base lg:text-lg">
          <span className="font-semibold">Venue: </span>
          <PrismicNextLink field={venue} className="underline" />
        </div>
      </div>

      <div className="col-span-full grid grid-cols-subgrid space-y-8">
        {groupedEvents.map(({ date, events }, index) => (
          <div
            key={index}
            className="col-span-full grid grid-cols-subgrid space-y-4"
          >
            <h3 className="col-span-full text-xl font-semibold lg:text-2xl">
              {formatDateWithOrdinal(new Date(date!))}
            </h3>
            <div className="col-span-full grid grid-cols-subgrid gap-4">
              {events.map(
                ({ name, description, time, registrationLink }, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="border-light col-span-full flex flex-wrap justify-between gap-4 rounded border p-4 sm:col-span-6"
                  >
                    <div>
                      <h4 className="font-heading mb-0 text-2xl font-bold md:mb-2 lg:text-3xl">
                        {name}
                      </h4>
                      <div className="mb-2 text-lg font-medium md:mb-4 lg:text-xl">
                        {description}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0 text-base lg:text-lg">
                        <span className="font-semibold">Time:</span>
                        <span>{time}</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="secondary"
                      className="h-fit w-full sm:w-fit"
                    >
                      <PrismicNextLink field={registrationLink}>
                        <span>{registrationLink.text}</span>
                        <ArrowUpRight className="size-5 lg:size-6" />
                      </PrismicNextLink>
                    </Button>
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <Image
        src={bgAsset}
        alt=""
        className="absolute -bottom-40 -left-56 -z-10 w-160 sm:-bottom-64 sm:-left-80 md:-bottom-80 md:-left-112"
      />
    </section>
  )
}

export default Events
