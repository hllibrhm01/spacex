import type { FC, PropsWithChildren } from "react"
import Image from "next/image"

import bg from "public/static/image/launch.jpg"

type HeroProps = PropsWithChildren<{
  title: string
  summary: string
}>

const Hero: FC<HeroProps> = ({ title, summary, children }) => {
  return (
    <div className='hero min-h-screen bg-cover bg-center pt-5 md:pt-12'>
      <figure className='w-full h-full object-cover'>
        <Image
          src={bg}
          priority
          placeholder='blur'
          alt='rocket ship launching during daytime'
          className='w-full h-full max-h-screen object-cover [object-position:25%_25%]'
        />
      </figure>
      <div className='bg-primary bg-opacity-40 hero-overlay mix-blend-color' /> 
      <div className='bg-neutral bg-opacity-30 backdrop-blur hero-content text-center text-neutral-content rounded-box flex-col p-8 shadow-2xl w-screen'>
        <h1 className='text-5xl font-bold flex-1 w-full'>{title}</h1>
        <p className='flex-1 w-full mt-2'>{summary}</p>
        {children}
      </div>
    </div>
  )
}

export default Hero
