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
    <SliceSimulator>
      <div className="bg-dark">
        <SliceZone slices={slices} components={components} />
      </div>
    </SliceSimulator>
  )
}
