import type { FC } from "react"
import { useMemo, useState } from "react"
import { RadioGroup } from "@headlessui/react"
import cn from "classnames"

import { isLaunchSuccess, type LaunchData } from "lib/launches"
import useSearch from "lib/useQuery"
import { getYear, isFuture } from "lib/date"
import LaunchCard from "./LaunchCard"

type LaunchStatus = "success" | "failed" | "upcoming" | "all"

type LaunchesProps = {
  data: LaunchData[]
  showStatus?: LaunchStatus[]
}

const Launches: FC<LaunchesProps> = ({
  data,
  showStatus = ["all", "success", "failed", "upcoming"],
}) => {
  const [year, setYear] = useState<number>()
  const [status, setStatus] = useState<typeof showStatus[number]>("all")
  const { query, onChange } = useSearch()

  const shownLaunches = useMemo(() => {
    return data.filter(launch => {
      let res = launch.name.toLowerCase().includes(query.toLowerCase())
      if (year) res = res && getYear(launch.date_utc) === year
      return status === "all"
        ? res
        : status === "upcoming"
        ? res && isFuture(launch.date_utc)
        : status === "success"
        ? res && isLaunchSuccess(launch)
        : status === "failed"
        ? res && !isLaunchSuccess(launch)
        : res
    })
  }, [data, query, year, status])

  const years = useMemo(() => {
    return Array.from(
      new Set(shownLaunches.map(launch => getYear(launch.date_utc)).sort())
    )
  }, [shownLaunches])

  const names = useMemo(
    () => shownLaunches.map(launch => launch.name),
    [shownLaunches]
  )

  return (
    <div className='mx-auto container lg:max-w-6xl flex flex-col gap-8 min-h-full'>
      <form className='w-full flex gap-4 flex-wrap items-center justify-center rounded-box p-4 border-2 border-primary shadow bg-base-200'>
        <div className='form-control items-center justify-center w-full max-w-sm flex-1 md:basis-1/3'>
          <label className='input-group'>
            <span className='bg-neutral text-neutral-content'>Name</span>
            <input
              value={query}
              onChange={onChange}
              type='search'
              list='names'
              autoComplete='on'
              className='input w-full max-w-sm'
            />
            <datalist id='names'>
              {names.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </datalist>
          </label>
        </div>

        <div className='form-control items-center justify-center w-full max-w-xs flex-1 md:basis-1/3'>
          <label className='input-group'>
            <span className='bg-neutral text-neutral-content'>Year</span>
            <input
              type='number'
              value={year || undefined}
              onChange={e => setYear(e.target.valueAsNumber)}
              list='years'
              className='input w-full'
              min={years[0]}
              max={years[years.length - 1]}
            />
            <datalist id='years'>
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </datalist>
          </label>
        </div>

        <RadioGroup
          value={status}
          onChange={setStatus}
          name='status'
          className='w-full max-w-sm flex flex-col items-start justify-center gap-3 md:basis-1/3'
        >
          <RadioGroup.Label className='label-text'>Launch Status</RadioGroup.Label>
          <div className='form-control items-center justify-center flex-row'>
            {showStatus.map(status => (
              <RadioGroup.Option
                key={status}
                value={status}
                className='form-control justify-center w-full'
              >
                {({ checked }) => (
                  <RadioGroup.Label className='label justify-center gap-1 cursor-pointer'>
                    <span className='label-text capitalize'>{status}</span>
                    <input
                      type='radio'
                      name='status'
                      aria-checked={checked}
                      className={cn("radio", {
                        "radio-success": checked && status === "success",
                        "radio-error": checked && status === "failed",
                        "radio-secondary": checked && status === "all",
                        "radio-primary": checked && status === "upcoming",
                      })}
                    />
                  </RadioGroup.Label>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </form>

      <ol
        aria-label='Launches'
        className={cn(
          "group w-full h-full flex-grow overflow-x-hidden overflow-y-auto list-none",
          "grid [grid-template-columns:repeat(auto-fit,minmax(35ch,1fr))] gap-6 auto-rows-max"
        )}
      >
        {shownLaunches.map((launch, i) => (
          <li key={launch.id}>
            <LaunchCard
              index={i}
              {...launch}
            />
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Launches
