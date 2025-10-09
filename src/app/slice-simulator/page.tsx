import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator"
import { SliceZone } from "@prismicio/react"

import { components } from "../../slices"

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams
  const slices = getSlices(state)

  return (
    <SliceSimulator className="bg-dark">
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  )
}
