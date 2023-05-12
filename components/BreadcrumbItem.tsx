import type { PropsWithChildren, ComponentPropsWithoutRef } from "react"
import Link from "next/link"
import cn from "classnames"

type BreadcrumbItemProps = PropsWithChildren<{ href: string; isCurrent: boolean }> &
  ComponentPropsWithoutRef<"li">

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  isCurrent,
  ...props
}) => {
  return (
    <li {...props}>
      <Link
        href={href}
        passHref
        className={cn({ "text-blue-500": isCurrent })}
        aria-current={isCurrent ? "location" : "false"}>

        {children}

      </Link>
    </li>
  );
}

export default BreadcrumbItem
