import cn from "classnames"
import { Fragment } from "react"

type TiltCardProps = React.PropsWithChildren<{
  title?: string
  description?: string
  imgSrc: string
  trackerClassName?: string
  className?: string
  trackerRows?: number
  trackerColumns?: number
}>

const TrackerCells: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
  return (
    <Fragment>
      {Array.from({ length: rows }, (_, i) => (
        <Fragment key={`mt-${i + 1}`}>
          {Array.from({ length: cols }, (_, j) => (
            <div
              key={`mt-${i}-${j}`}
              className={cn(`mouse-tracker c${j + 1} r${i + 1}`)}
              style={{
                gridArea: `${i + 1} / ${j + 1} / ${i + 2} / ${j + 2}`,
              }}
            />
          ))}
        </Fragment>
      ))}
    </Fragment>
  )
}

const TiltCard: React.FC<TiltCardProps> = ({
  title,
  description,
  imgSrc,
  trackerClassName,
  className,
  trackerRows = 6,
  trackerColumns = 6,
  children,
}) => {
  return (
    <section
      className={cn(
        trackerClassName,
        "grid relative duration-300 transition",
        "prose-invert prose w-full p-0 mx-auto",
        "max-w-lg group"
      )}
      style={{
        gridTemplateColumns: `repeat(${trackerColumns}, 1fr)`,
        gridTemplateRows: `repeat(${trackerRows}, 1fr)`,
        aspectRatio: "3 / 4",
        transformStyle: "preserve-3d",
      }}
    >
      <TrackerCells rows={trackerRows} cols={trackerColumns} />

      <div
        className={cn(
          className,
          "tilt-content origin-center",
          "col-span-full row-span-full grid place-content-center rounded-lg shadow-lg"
        )}
        style={{
          backgroundImage: `url('${imgSrc}')`,
          transformStyle: "preserve-3d",
        }}
      >
        {title && (
          <header className='p-0 m-0'>
            <h3 className='m-0 p-0 text-3xl'>{title}</h3>
          </header>
        )}
        {description && <p className='m-0 p-0'>{description}</p>}
        {children}
      </div>
    </section>
  )
}

export default TiltCard
