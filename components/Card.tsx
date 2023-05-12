import type {
  PropsWithChildren,
  ComponentPropsWithoutRef,
  FC,
  ReactNode,
} from "react"
import { memo } from "react"
import Image, { type ImageProps } from "next/image"
import cn from "classnames"

import { is } from "lib/utils"

type ContainProps = Partial<{
  contain: "content" | "strict" | "layout" | "paint" | "size" | "style" | "none"
  contentVisibility: "auto" | "hidden"
}>

type CardProps = Omit<ComponentPropsWithoutRef<"section">, "title"> &
  PropsWithChildren<{
    image?: string
    title: NonNullable<ReactNode>
    className?: string
    containProps?: ContainProps
    imageProps?: Partial<Omit<ImageProps, "src">>
  }>

const Card: FC<CardProps> = memo(
  ({
    children,
    image,
    title,
    className,
    containProps,
    imageProps = {
      fill: true,
      sizes: "50vw",
      loading: "lazy",
      decoding: "async",
    } as Partial<ImageProps>,
    ...props
  }) => {
    const { priority, ...imgProps } = imageProps

    return (
      <section
        {...props}
        aria-label={is.string(title) ? title : props["aria-label"]}
        className={cn(
          className,
          "@container/card card shadow-xl w-full h-full flex-1 rounded-box overflow-hidden group/card isolate",
          {
            [`[contain:${containProps?.contain}] [contain-intrinsic-size:auto_theme(spacing.96)]`]:
              containProps?.contain,
            [`[content-visibility:${containProps?.contentVisibility}] [contain-intrinsic-size:auto_theme(spacing.96)]`]:
              containProps?.contentVisibility,
            "image-full bg-base-100": image,
          }
        )}
      >
        {image ? (
          <figure className='items-stretch object-cover rounded-none relative'>
            <Image
              src={image}
              alt={is.string(title) ? title : ""}
              className='w-full object-cover rounded-none'
              priority={priority}
              {...imgProps}
            />
          </figure>
        ) : null}
        <div className='card-body w-full @md/card:gap-3 @lg/card:gap-4'>
          <header className='flex items-center text-center flex-wrap'>
            <h2 className='card-title text-2xl @md/card:text-3xl mx-auto'>
              {title}
            </h2>
          </header>
          {children}
        </div>
      </section>
    )
  }
)

Card.displayName = "Card"

export default Card
