import type { FC } from "react"
import Image from "next/image"
import { Carousel } from "flowbite-react"
import cn from "classnames"

import TimeBadge from "components/TimeBadge"
import YoutubePlayer from "components/YoutubePlayer"
import type { Launch as ILaunch } from "types/launches"

type LaunchProps = {
  data: ILaunch
}

const Launch: FC<LaunchProps> = ({ data }) => {
  const success = data.success ?? data.failures.length === 0
  const patchSrc = data.links.patch.small ?? data.links.patch.large

  return (
    <div className='mx-auto w-full prose dark:prose-invert max-w-6xl space-y-24'>
      <div className='flex gap-6 sm:flex-wrap flex-col sm:flex-row container mx-auto w-full items-center justify-between mb-20 max-w-prose'>
        <p className='w-full m-0 p-0 self-end'>
          Launch date:&nbsp;
          <TimeBadge time={data.date_utc} success={success} size='sm' />
        </p>

        {patchSrc || data.details ? (
          <div className='w-full m-0 p-0 block'>
            {patchSrc ? (
              <>
                <Image
                  src={patchSrc}
                  alt={`${data.name} patch`}
                  width={224}
                  height={224}
                  sizes='screen and (min-width: 40em) 400px, (min-width: 60em) 200px'
                  crossOrigin='anonymous'
                  referrerPolicy='same-origin'
                  loading='lazy'
                  placeholder='empty'
                  decoding='async'
                  quality={75}
                  style={{
                    shapeOutside: `url('/_next/image?url=${encodeURI(
                      patchSrc
                    )}&w=3840&q=75')`,
                    shapeImageThreshold: "0.8",
                    shapeMargin: "0.7rem",
                  }}
                  className={cn("mx-auto p-0 h-full max-w-sm", {
                    "sm:float-left sm:pr-2 mt-0 mb-4 sm:my-0 sm:mx-0": data.details,
                    "block my-0 w-full": !data.details,
                  })}
                />
                {data.details && <p className='m-0 block'>{data.details}</p>}
              </>
            ) : data.details ? (
              <p className='m-0 block'>{data.details}</p>
            ) : null}
          </div>
        ) : null}
      </div>

      <section className='w-full container mx-auto lg:max-w-5xl' aria-label='Media'>
        <header className='mb-6'>
          <h3 className='border-b-gray-300 dark:border-b-gray-700 border-b'>
            Media
          </h3>
        </header>

        {data.links.youtube_id ? (
          <div className='w-full h-auto object-cover container mx-auto lg:max-w-5xl rounded-lg overflow-hidden shadow-lg'>
            <YoutubePlayer
              videoId={data.links.youtube_id}
              title={`${data.name} launch video`}
              className='[aspect-ratio:16/9] w-full object-cover'
              iframeClassName='object-cover w-full h-full'
            />
          </div>
        ) : null}

        {data.links.flickr.original.length ? (
          <div className='mt-12 w-full container mx-auto lg:max-w-5xl [aspect-ratio:16/9] not-prose shadow-lg'>
            <Carousel slideInterval={5000} slide={false}>
              {data.links.flickr.original.map((src, i) => (
                <Image
                  key={`carousel-image-${i}`}
                  src={src}
                  alt=''
                  width={1200}
                  height={800}
                  loading='lazy'
                  decoding='async'
                  className='block m-0 w-full h-full object-cover object-center not-prose'
                />
              ))}
            </Carousel>
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default Launch
