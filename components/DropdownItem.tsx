import type {
  ComponentProps,
  FC,
  PropsWithChildren,
  ComponentPropsWithoutRef,
} from "react"
import cn from "classnames"

export type DropdownItemProps = ComponentPropsWithoutRef<"li"> &
  PropsWithChildren<{
    onClick?: () => void
    icon?: FC<ComponentProps<"svg">>
    className?: string
    iconClassName?: string
  }>

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  onClick,
  icon: Icon,
  className,
  iconClassName,
  ...props
}) => {

  return (
    <li className={cn(className)} onClick={onClick} {...props}>
      {Icon && <Icon className={cn(iconClassName)} />}
      {children}
    </li>
  )
}
