import cn from "classnames"
import { VscLoading } from "react-icons/vsc"

const Loader: React.FC<{ className?: string; wrapperClassName?: string }> = ({
  className,
  wrapperClassName,
}) => (
  <div
    className={cn(
      wrapperClassName,
      "grid place-items-center w-full h-full"
    )}
  >
    <VscLoading
      title='loading spinner'
      className={cn(className, "text-base-300 w-1/2 h-1/2 animate-spin")}
    />
  </div>
)

export default Loader
