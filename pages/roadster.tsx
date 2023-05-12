import type { NextPage, GetStaticProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query"
import Image from "next/image"

import Carousel from "nuka-carousel"
import Layout from "components/Layout"
import { getRoadster, roadsterKey } from "lib/roadster"
import Loader from "components/LoadingSpinner"
import Link from "next/link"
import { Suspense } from "react"

export const getStaticProps: GetStaticProps<RoadsterProps> = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(roadsterKey, getRoadster)
  return {
    props: {
      dehydrated: dehydrate(queryClient),
    },
  }
}

type RoadsterProps = { dehydrated: DehydratedState }

const Roadster: NextPage = () => {
  const { data } = useQuery(roadsterKey, getRoadster, {
    suspense: true,
  })

  return (
    <Suspense fallback={<Loader className='min-h-screen' />}>
      {data ? (
        <Layout
          title={data.name}
          description={data.details}
          ogImages={data.flickr_images.map(src => ({
            url: src,
            width: 1024,
            height: 576,
            alt: "Elon Musk's Telsa roadster in space",
          }))}
        >
          <div className='prose dark:prose-invert container lg:max-w-4xl mx-auto'>
            <p className='lg:max-w-prose mx-auto'>{data.details}</p>

            <section>
              <h2>Images</h2>

              <div className='not-prose carousel w-full carousel-center max-w-5xl p-4 space-x-4 bg-neutral rounded-box shadow'>
                {data.flickr_images.map((src, i) => (
                  <div
                    key={src}
                    id={`img-${i}`}
                    className='carousel-item w-full object-cover relative'
                  >
                    <Image
                      src={src}
                      alt=''
                      // fill
                      width={1024}
                      height={576}
                      loading='lazy'
                      className='w-full h-full object-cover rounded-box'
                    />
                  </div>
                ))}
              </div>
              <div className='py-2 flex justify-center'>
                <div className='btn-group shadow'>
                  {Array.from(
                    { length: data.flickr_images.length },
                    (_, i) => i
                  ).map(n => (
                    <Link
                      key={`link-${n}`}
                      href={`#img-${n}`}
                      className='btn btn-sm'
                    >
                      {n + 1}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </Layout>
      ) : null}
    </Suspense>
  )
}

export default Roadster
