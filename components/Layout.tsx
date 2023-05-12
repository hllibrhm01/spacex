import type { FC, PropsWithChildren } from "react"
import type { OpenGraphMedia } from "next-seo/lib/types"
import { useRouter } from "next/router"
import cn from "classnames"
import { NextSeo } from "next-seo"

import Header from "components/Header"
import { defaultOgImages } from "next-seo.config"

type LayoutProps = PropsWithChildren<{
  date?: string
  title?: string
  description?: string
  image?: string
  ogImages?: OpenGraphMedia[]
  type?: string
  className?: string
  containerClassName?: string
  headerTag?: "h1" | "h2" | null
}>

const Layout: FC<LayoutProps> = ({
  headerTag = "h1",
  title = "SpaceX",
  className,
  containerClassName = "my-14",
  ogImages,
  children,
  ...props
}) => {
  const router = useRouter()

  const url = `https://spacex-one.vercel.app${router.asPath}`

  const description =
    props.description ??
    "Information on everything related with SpaceX: launches, rockets, missions, capsules, payloads, Elon Musk's tesla roadster, company info, and more."

  const imageType =
    props.image?.substring(props.image.lastIndexOf(".") + 1) === "jpg"
      ? "image/jpeg"
      : undefined

  const images: OpenGraphMedia[] = props.image
    ? [
        {
          url: props.image,
          width: 800,
          height: 600,
          type: imageType,
        },
        ...(ogImages ?? []),
      ]
    : ogImages ?? defaultOgImages

  return (
    <div
      className={cn(
        containerClassName,
        "transition-colors w-full bg-base-100 text-base-content relative space-y-14"
      )}
    >
      <NextSeo
        title={title === "SpaceX" ? undefined : title}
        description={description}
        canonical={url}
        openGraph={{
          title: title === "SpaceX" ? undefined : title,
          url,
          description,
          images,
        }}
      />
      {/* <Seo {...meta} /> */}
      {headerTag ? <Header title={title} tag={headerTag} /> : null}
      <main
        id='skip'
        className={cn(
          className,
          "flex gap-y-14 flex-col justify-start items-start px-8 h-full min-h-[70vh] bg-inherit text-inherit"
        )}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
