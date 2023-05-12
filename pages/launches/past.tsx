import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
// import { useMemo, useState } from "react"
// import { RadioGroup, Listbox } from "@headlessui/react"
// import cn from "classnames"

import Layout from "components/Layout"
import Launches from "components/Launches"
import Loader from "components/LoadingSpinner"
import { getPastLaunches, launchesKeys } from "lib/launches"
// import LaunchCard from "components/LaunchCard"
// import useSearch from "lib/useQuery"
// import { getYear } from "lib/date"
// import useLaunchForm from "lib/useLaunchForm"

type LaunchesProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.past, getPastLaunches)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

const PastLaunches: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(launchesKeys.past, getPastLaunches)
  // const {
  //   shownLaunches,
  //   years,
  //   onChangeYear,
  //   minYear,
  //   maxYear,
  //   year,
  //   names,
  //   query,
  //   onChangeName,
  //   status,
  //   setStatus,
  // } = useLaunchForm(data)
  // const [year, setYear] = useState<number>()
  // const [status, setStatus] = useState<"success" | "failed" | "both">("both")
  // const { query, onChange } = useSearch()

  // const shownLaunches = useMemo(() => {
  //   return (
  //     data?.filter(launch => {
  //       let res = launch.name.toLowerCase().includes(query.toLowerCase())
  //       if (year) res = res && new Date(launch.date_utc).getFullYear() === year
  //       if (status === "both") return res
  //       if (status === "success") return res && isLaunchSuccess(launch)
  //       if (status === "failed") return res && !isLaunchSuccess(launch)
  //       return res
  //     }) ?? []
  //   )
  // }, [data, query, year, status])

  // const years = useMemo(
  //   () =>
  //     Array.from(
  //       new Set(shownLaunches.map(launch => getYear(launch.date_utc)).sort())
  //     ),
  //   [shownLaunches]
  // )

  // const names = useMemo(
  //   () => shownLaunches.map(launch => launch.name),
  //   [shownLaunches]
  // )

  if (isSuccess) {
    return (
      <Layout
        title='Past Launches'
        description='List of past launches, successes and failures.'
      >
        <Launches data={data} showStatus={["all", "success", "failed"]} />
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Past Launches' description='List of past launches.'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default PastLaunches
