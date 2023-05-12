import { useMemo, useState, useCallback, ChangeEventHandler } from "react"

import { isLaunchSuccess, type LaunchData } from "lib/launches"
import useSearch from "lib/useQuery"
import { getYear } from "lib/date"

type LaunchStatus = "success" | "failed" | "both"

function useLaunchForm(data?: LaunchData[]) {
  const [year, setYear] = useState<number>()
  const [status, setStatus] = useState<LaunchStatus>("both")
  const { query, onChange } = useSearch()

  const shownLaunches = useMemo(() => {
    return (
      data?.filter(launch => {
        let res = launch.name.toLowerCase().includes(query.toLowerCase())
        if (year) res = res && new Date(launch.date_utc).getFullYear() === year
        if (status === "both") return res
        if (status === "success") return res && isLaunchSuccess(launch)
        if (status === "failed") return res && !isLaunchSuccess(launch)
        return res
      }) ?? []
    )
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

  const onChangeYear: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => setYear(e.target.valueAsNumber),
    []
  )

  return {
    shownLaunches,
    years,
    onChangeYear,
    minYear: years[0],
    maxYear: years[years.length - 1],
    year,
    names,
    query,
    onChangeName: onChange,
    status,
    setStatus,
  }
}

export default useLaunchForm
