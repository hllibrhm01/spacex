import type { QueryFunction } from "@tanstack/react-query"
import type { Rockets as IRockets, Rocket as IRocket } from "types/rockets"

const allRocketsKey = ["rockets"] as const

export const rocketKeys = {
  all: allRocketsKey,
  rocket: (id: string) => [...allRocketsKey, id] as const,
} as const

export const getRockets: QueryFunction<IRockets> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/rockets")
  if (!res.ok) {
    throw new Error(`Failed to fetch rockets, received status ${res.status}`)
  }
  const data: IRockets = await res.json()
  return data
}

export const getRocket: QueryFunction<
  IRocket,
  ReturnType<typeof rocketKeys["rocket"]>
> = async ({ queryKey }) => {
  const [_, id] = queryKey
  const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch rocket (id: ${id}), received status ${res.status}`
    )
  }
  const data: IRocket = await res.json()
  return data
}
