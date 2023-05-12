import type { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"

import bgUrl from "public/static/image/starship_ship24-3840x2160.jpg"

const FourZeroFour: NextPage = () => {
  return (
    <div className='object-cover w-full h-full'>
      <picture className='block w-full h-screen brightness-75 saturate-150 filter bg-bottom'>
        <Image
          src={bgUrl}
          width={3840}
          height={2160}
          loading='lazy'
          placeholder='blur'
          alt='starship at starbase'
          className='block w-full h-full object-cover'
        />
      </picture>

      <div className='absolute inset-0 w-full h-full flex items-center justify-center'>
        <div className='relative self-center text-center p-6 md:p-8 mx-auto bg-base-300/75 text-base-content rounded-box'>
          <h1 className='relative text-9xl tracking-tighter [text-shadow:-8px_0_0_theme(colors.indigo.600)] text-shadow font-sans font-bold'>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
          <p className='absolute top-2 md:top-4 translate-x-1/2 transform -ml-12 font-semibold text-lg'>
            Oops!
          </p>
          {/* </div> */}
          <h2 className='font-semibold -mt-3 capitalize'>Page not found</h2>
          <p className='mt-2 mb-6'>
            Sorry, but the page you requested was not found.
          </p>
          <Link
            href='/'
            className='btn btn-primary rounded-btn'>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FourZeroFour
