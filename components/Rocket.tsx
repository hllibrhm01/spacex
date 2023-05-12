import Link from "next/link"
import cn from "classnames"
import { useRef } from "react"

import type { Rocket as IRocket } from "types/rockets"
import TiltCard from "components/TiltCard"

type RocketProps = { data: IRocket }

const Rocket: React.FC<RocketProps> = ({ data }) => {
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <Link
      href={`/rocket/${encodeURIComponent(data.id)}`}
      className='no-underline block'
      ref={ref}
    >
      <TiltCard
        imgSrc={data.flickr_images[1]}
        className='smol-card-component rounded-box overflow-hidden'
      >
        <header
          className={cn(
            "py-3 rounded-t-box",
            "focus-visible:outline-none",
            "bg-gradient-to-b from-neutral/40 to-neutral/60 text-neutral-content",
            "mix-blend-hard-light backdrop-blur-sm",
            "w-full mx-auto text-center"
          )}
        >
          <h3 className='m-0 p-0 font-bold uppercase text-center text-3xl text-neutral-content'>
            {data.name}
          </h3>
        </header>

        <p
          className={cn(
            "m-0 pb-6 pt-3 px-6 overflow-hidden rounded-b-box",
            "bg-gradient-to-b from-neutral/60 to-neutral/80 text-neutral-content",
            "mix-blend-hard-light backdrop-blur-sm"
          )}
        >
          {data.description}
        </p>
      </TiltCard>
    </Link>
  )
}

export default Rocket
