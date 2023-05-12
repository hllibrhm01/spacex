import type { QueryFunction } from "@tanstack/react-query"
import type { LaunchPads as ILaunchPads } from "types/launch-pads"

const allLaunchPadsKey = ["launchPads"] as const

export const launchPadKeys = {
  all: allLaunchPadsKey,
} as const

export const getAllLaunchPads: QueryFunction<ILaunchPads> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/launchpads")
  const data: ILaunchPads = await res.json()
  return data
}
