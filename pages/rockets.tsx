import type { GetServerSideProps, GetStaticProps, NextPage } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { Suspense } from "react"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Tilt from "react-parallax-tilt"

import Layout from "components/Layout"
import Loader from "components/LoadingSpinner"
import { getRockets, rocketKeys } from "lib/rockets"
import Link from "next/link"
import RocketCard from "components/RocketCard"

export const getStaticProps: GetStaticProps<RocketProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(rocketKeys.all, getRockets)

  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: 60 * 30,
  }
}

type RocketProps = { dehydratedState: DehydratedState }

const Rockets: NextPage<RocketProps> = () => {
  const { data, isLoading, isSuccess } = useQuery(rocketKeys.all, getRockets, {
    notifyOnChangeProps: ["data", "isLoading", "isSuccess"],
  })

  if (isSuccess) {
    const ogImages = data.flatMap(r =>
      r.flickr_images.map(url => ({ url, alt: r.name }))
    )

    return (
      <Suspense fallback={<Loader />}>
        <Layout title='Rockets' description='SpaceX Rockets.' ogImages={ogImages}>
          <ol
            className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,40ch),1fr))] gap-8 mx-auto container lg:max-w-5xl">
            {data.map(rocket => (
              <li key={rocket.id} className="w-full h-full">
                <RocketCard {...rocket} />
              </li>
            ))}
          </ol>
        </Layout>
      </Suspense>
    )
  }

  if (isLoading) {
    return (
      <Layout title='Rockets' description='Loading data for all rockets...'>
        <Loader />
      </Layout>
    )
  }

  return null
}

export default Rockets
