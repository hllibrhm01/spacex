import type { FC } from "react"
import cn from "classnames"

import type { LaunchData } from "lib/launches"
import { formatDate, isFuture } from "lib/date"
import Card from "./Card"

type LaunchCardProps = LaunchData & { index: number }

const LaunchCard: FC<LaunchCardProps> = ({
  id,
  index,
  name,
  details,
  date_utc,
  links,
  ...props
}) => {
  const futureLaunch = isFuture(date_utc)
  const success = !futureLaunch && (props.success ?? props.failures.length === 0)
  const patchSrc = links?.patch ?? links?.patch

  return (
    <Card
      title={name}
      image={patchSrc}
      className={cn("border-4", {
        "border-error": !success && !futureLaunch,
        "border-success": success,
        "border-primary": futureLaunch,
      })}
      imageProps={{
        loading: index <= 5 ? "eager" : "lazy",
        priority: index <= 5,
        sizes: "40vw",
        fill: true,
      }}
      containProps={{
        contentVisibility: "auto",
      }}>
      <dl
        className={cn(
          "w-full self-start justify-self-start block font-semibold text-base leading-none space-y-2",
          {
            "text-error": !success && !futureLaunch,
            "text-success": success,
            "text-primary": futureLaunch,
            "flex-grow": !details,
            "flex-grow-0": details,
          }
        )}
      >
        <div className='w-full flex gap-2'>
          <dt className='launch-stat-term'>Date</dt>
          <dd className='flex-1'>
            <time dateTime={date_utc} aria-label='launch date'>
              {formatDate(date_utc, {
                month: "long",
                year: "numeric",
                day: "numeric",
              })}
            </time>
          </dd>
        </div>

        <div className='w-full flex gap-2'>
          <dt className='flex-initial capitalize launch-stat-term'>Status</dt>
          <dd className='flex-1'>
            {futureLaunch ? "Upcoming" : success ? "Successfull" : "Failure"}
          </dd>
        </div>
      </dl>

      {details ? <p className='w-fit line-clamp-6'>{details}</p> : null}
    </Card>
  )
}


export default LaunchCard
