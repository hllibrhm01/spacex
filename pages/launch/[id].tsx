import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"

import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import Launch from "components/Launch"
import { getLaunch, getAllLaunches, launchesKeys } from "lib/launches"

export const getStaticPaths: GetStaticPaths = async () => {
  const queryClient = new QueryClient()
  const data = await queryClient.fetchQuery(launchesKeys.all, getAllLaunches)
  return {
    paths: data.map(({ id }) => ({ params: { id } })),
    fallback: false, // can also be true or 'blocking'
  }
}

export const getStaticProps: GetStaticProps<LaunchProps> = async ({ params }) => {
  const id = params!.id as string
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(launchesKeys.launch(id), getLaunch)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      launchID: id,
    },
    revalidate: 60 * 30,
  }
}

type LaunchProps = {
  dehydratedState: DehydratedState
  launchID: string
}

const LaunchPage: NextPage<LaunchProps> = props => {
  const { data, isLoading, isSuccess } = useQuery(
    launchesKeys.launch(props.launchID),
    getLaunch
  )

  if (isSuccess) {
    const ogImages = data.links.flickr.original.map(url => ({ url, alt: data.name }))
    if (data.links.patch.large) {
      ogImages.unshift({
        url: data.links.patch.large,
        alt: `${data.name} mission patch`,
      })
    }

    return (
      <Layout title={data.name} description={data.details} ogImages={ogImages}>
        <Launch data={data} />
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout title='' description='Loading launch data...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default LaunchPage
