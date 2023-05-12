import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

import Layout from "components/Layout"
import Launches from "components/Launches"
import Loader from "components/LoadingSpinner"
import { getUpcomingLaunches, launchesKeys } from "lib/launches"
// import LaunchCard from "components/LaunchCard"

type LaunchesProps = { dehydratedState: DehydratedState }

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.upcoming, getUpcomingLaunches)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

const UpcomingLaunches: NextPage<LaunchesProps> = () => {
  const { data, isSuccess, isLoading } = useQuery(
    launchesKeys.upcoming,
    getUpcomingLaunches
  )

  if (isSuccess) {
    return (
      <Layout title='Upcoming Launches' description='List of all upcoming launches.'>
        <Launches data={data} />
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Upcoming Launches' description='List of upcoming launches.'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default UpcomingLaunches
