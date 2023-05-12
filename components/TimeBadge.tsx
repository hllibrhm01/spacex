import cn from "classnames"
import { formatDate } from "lib/date"
import type { PropsWithoutRef, ComponentProps, FC } from "react"

type TimeBadgeProps = PropsWithoutRef<ComponentProps<"time">> & {
  className?: string
  time: string
  success: boolean
  size?: "sm" | "md" | "lg"
}

const TimeBadge: FC<TimeBadgeProps> = ({
  className,
  time,
  success,
  size = "lg",
  ...props
}) => (
  <time
    dateTime={time}
    className={cn(
      "rounded-lg font-semibold",
      {
        "px-2 py-1 w-fit text-sm leading-tight": size === "sm",
        "p-2 w-fit text-base leading-snug": size == "md",
        "px-4 py-2 w-fit text-base": size == "lg",
        "bg-emerald-500 dark:bg-emerald-300 text-emarld-100 dark:text-emerald-900":
          success,
        "bg-orange-500 dark:bg-orange-300 text-orange-100 dark:text-orange-900":
          !success,
      },
      className
    )}
    {...props}
  >
    {formatDate(time)}
  </time>
)

export default TimeBadge
