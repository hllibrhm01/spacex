import cn from "classnames"
import Link from "next/link"
import type { ComponentProps, PropsWithChildren, PropsWithoutRef, FC } from "react"

type TimelineProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<"ol">> & { className?: string }
>

const TimelineComp: FC<TimelineProps> = ({ children, className, ...props }) => {
  return (
    <ol
      className={cn(
        "timeline relative mx-auto transition",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  )
}

type TimelineItemProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<"li">> & { className?: string }
>

const TimelineItem: FC<TimelineItemProps> = ({ children, className, ...props }) => {
  return (
    <li
      className={cn(
        "border-l border-t-gray-200 dark:border-t-gray-700 border-l-blue-300 dark:border-l-gray-700 last:border-0",
        "pb-10 pl-4 sm:pl-6 last:pb-0",
        "group",
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

type TimelinePointProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<"div">> & {
    className?: string
    innerClassName?: string
    icon?: FC<ComponentProps<"svg">>
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full"
    size?: "sm" | "md" | "lg" | "xl"
    color?: "red" | "green" | "blue" | "gray"
  }
>

const TimelinePoint: React.FC<TimelinePointProps> = ({
  children,
  className,
  innerClassName,
  icon: Icon,
  rounded = "full",
  size = "sm",
  color = "gray",
  ...props
}) => {
  return (
    <div className={cn("timeline-point", className)} {...props}>
      {children}
      {Icon ? (
        <span
          className={cn(
            "timeline-point-inner",
            "grid place-items-center",
            "absolute left-0 -translate-x-1/2",
            "ring-8 ring-gray-50 dark:ring-gray-900 transition-colors",
            {
              "rounded-none": rounded === "none",
              "rounded-sm": rounded === "sm",
              "rounded-md": rounded === "md",
              "rounded-lg": rounded === "lg",
              "rounded-xl": rounded === "xl",
              "rounded-2xl": rounded === "2xl",
              "rounded-3xl": rounded === "3xl",
              "rounded-full": rounded === "full",
              "bg-green-200 dark:bg-green-900 text-green-600 dark:text-green-300":
                color === "green",
              "bg-red-200 dark:bg-red-900 text-red-600 dark:text-red-300":
                color === "red",
              "bg-blue-200 first-line:dark:bg-blue-900 text-blue-600 dark:text-blue-300":
                color === "blue",
              "bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300":
                color === "gray",
            },
            innerClassName
          )}
        >
          <Icon
            aria-hidden
            strokeWidth={2.5}
            className={cn("text-current stroke-250", {
              "h-3 w-3": size === "sm",
              "h-4 w-4": size === "md",
              "h-5 w-5": size === "lg",
              "h-6 w-6": size === "xl",
            })}
          />
        </span>
      ) : (
        <div
          className={cn(
            "timeline-point-inner",
            "border absolute left-0 -translate-x-1/2",
            {
              "rounded-none": rounded === "none",
              "rounded-sm": rounded === "sm",
              "rounded-md": rounded === "md",
              "rounded-lg": rounded === "lg",
              "rounded-xl": rounded === "xl",
              "rounded-2xl": rounded === "2xl",
              "rounded-3xl": rounded === "3xl",
              "rounded-full": rounded === "full",
              "h-3 w-3": size === "sm",
              "h-4 w-4": size === "md",
              "h-5 w-5": size === "lg",
              "h-6 w-6": size === "xl",
              "bg-green-200 dark:bg-green-900 text-green-600 dark:text-green-300":
                color === "green",
              "bg-red-200 dark:bg-red-900 text-red-600 dark:text-red-300":
                color === "red",
              "bg-blue-200 first-line:dark:bg-blue-900 text-blue-600 dark:text-blue-300":
                color === "blue",
              "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-white dark:border-gray-900":
                color === "gray",
            },
            innerClassName
          )}
        />
      )}
    </div>
  )
}

type TimelineContentProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<"a">> & {
    className?: string
    href: string | URL
  }
>

const TimelineContent: FC<TimelineContentProps> = ({
  children,
  className,
  href,
  ...props
}) => {
  return (
    <Link
      href={href}
      passHref
      className={cn(
        "w-full prose dark:prose-invert flex flex-col",
        "bg-gray-200 dark:bg-gray-800 p-4 rounded shadow-lg",
        "transition hover:scale-100 group-hover:scale-95 group-focus-within:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

type TimelineTimeProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<"time">> & {
    className?: string
  }
>

const TimelineTime: FC<TimelineTimeProps> = ({ children, className, ...props }) => {
  return (
    <time
      className={cn(
        "mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </time>
  )
}

type HeadingLevel = `h${1 | 2 | 3 | 4 | 5 | 6}`

type TimelineTitleProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<HeadingLevel>> & {
    className?: string
    as?: HeadingLevel
  }
>

const TimelineTitle: FC<TimelineTitleProps> = ({
  children,
  className,
  as = "h3",
  ...props
}) => {
  const Tag = as
  return (
    <Tag
      className={cn(
        "text-xl font-semibold text-gray-900 dark:text-gray-100 my-0 text-center sm:text-start",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

type TimelineBodyProps = PropsWithChildren<
  PropsWithoutRef<ComponentProps<"p">> & {
    className?: string
  }
>

const TimelineBody: FC<TimelineBodyProps> = ({ children, className, ...props }) => {
  return (
    <p
      className={cn(
        "mb-4 text-base font-normal text-gray-500 dark:text-gray-400",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

TimelineComp.displayName = "Timeline"
TimelineItem.displayName = "Timeline.Item"
TimelinePoint.displayName = "Timeline.Point"
TimelineContent.displayName = "Timeline.Content"
TimelineTime.displayName = "Timeline.Time"
TimelineTitle.displayName = "Timeline.Title"
TimelineBody.displayName = "Timeline.Body"

const Timeline = Object.assign(TimelineComp, {
  Item: TimelineItem,
  Point: TimelinePoint,
  Content: TimelineContent,
  Time: TimelineTime,
  Title: TimelineTitle,
  Body: TimelineBody,
})

export default Timeline
