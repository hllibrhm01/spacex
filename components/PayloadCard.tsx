import type { FC } from "react"
import { memo } from "react"
import cn from "classnames"

import type { Payload as IPayload } from "types/payloads"
import { is } from "lib/utils"
import { SlimPayload } from "pages/payloads"
import Card from "./Card"

type Key = keyof SlimPayload

const filterStats = ([k, v]: [Key, unknown]): boolean => {
  if (v == null || k === "id" || k === "name") {
    return false
  }
  return is.array(v) ? v.length > 0 : true
}

const mapStats = ([k, v]: [Key, IPayload[Key]]) => {
  const value = is.boolean(v)
    ? v
      ? "Yes"
      : "No"
    : is.array(v)
    ? v.join(", ")
    : v?.toString() ?? ""
  return [k.replaceAll("_", " "), value.replaceAll("-", " ")] as const
}

type PayloadProps = { payload: SlimPayload }

const Payload: FC<PayloadProps> = memo(({ payload }) => {
  const specs = (Object.entries(payload) as Array<[Key, IPayload[Key]]>)
    .filter(filterStats)
    .map(mapStats)
  const nspecs = specs.length

  return (
    <li
      className={cn("list-none w-full", {
        "row-span-1": nspecs >= 0 && nspecs <= 8,
        "row-span-2": nspecs > 8 && nspecs <= 14,
        "row-span-3": nspecs > 14 && nspecs <= 20,
        "row-span-4": nspecs > 20 && nspecs <= 26,
        "row-span-5": nspecs > 26 && nspecs <= 30,
        "row-span-6": nspecs > 30,
      })}
    >
      <Card
        title={payload.name}
        className='border-neutral border-4 w-full bg-primary text-primary-content'
        containProps={{
          contentVisibility: "auto",
        }}
      >
        <ul className='flex flex-col justify-center'>
          {specs.map(([k, v]) => (
            <li
              key={`${payload.name}-${k}`}
              className='flex gap-2 justify-between border-neutral border-b pt-2 items-center leading-tight'
            >
              <strong className='capitalize text-sm'>{k}:</strong>
              <span className='flex-grow break-words text-primary-content'>{v}</span>
            </li>
          ))}
        </ul>
      </Card>
    </li>
  )
})

Payload.displayName = "PayloadCard"

export default Payload
