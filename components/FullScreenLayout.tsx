import type { FC, ReactNode } from "react"
import type { OpenGraphMedia } from "next-seo/lib/types"
import cn from "classnames"
import { NextSeo } from "next-seo"

import { defaultOgImages } from "../next-seo.config"

type FullScreenLayoutProps = {
  children: NonNullable<ReactNode>
  className?: string
  image?: string
  description?: string
}

const FullScreenLayout: FC<FullScreenLayoutProps> = ({
  children,
  image,
  className,
  description,
}) => {
  const imageType =
    image?.substring(image.lastIndexOf(".") + 1) === "jpg" ? "image/jpeg" : undefined

  const images: OpenGraphMedia[] = image
    ? [
        {
          url: image,
          width: 800,
          height: 600,
          type: imageType,
        },
      ]
    : defaultOgImages

  return (
    <>
      <NextSeo openGraph={{ images }} description={description} />
      <main id='skip' className={cn(className, "min-h-full w-screen p-0 m-0")}>
        {children}
      </main>
    </>
  )
}

export default FullScreenLayout
