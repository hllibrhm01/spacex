import type { Roadster as IRoadster } from "types/roadster"
import type { QueryFunction } from "@tanstack/react-query"

export const roadsterKey = ["roadster"] as const

export const getRoadster: QueryFunction<IRoadster> = async () => {
  const res = await fetch("https://api.spacexdata.com/v4/roadster")
  const data: IRoadster = await res.json()
  return data
}
