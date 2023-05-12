import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

import Layout from "components/Layout"
import Launches from "components/Launches"
import Loader from "components/LoadingSpinner"
import { getAllLaunches, launchesKeys } from "lib/launches"

export const getStaticProps: GetStaticProps<LaunchesProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.all, getAllLaunches)
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

type LaunchesProps = { dehydratedState: DehydratedState }

const AllLaunches: NextPage<LaunchesProps> = () => {
  const { data, isLoading, isSuccess } = useQuery(launchesKeys.all, getAllLaunches)

  if (isSuccess) {
    return (
      <Layout
        title='All Launches'
        description='List of all launches, past and upcoming, successes and failures.'
      >
        <Launches data={data} />
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout
        title='All Launches'
        description='List of all launches, past and upcoming, successes and failures.'
      >
        <Loader />
      </Layout>
    )
  }

  return null
}

export default AllLaunches
