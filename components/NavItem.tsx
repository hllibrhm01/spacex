import type { ReactNode } from "react"
import { forwardRef } from "react"
import Link from "next/link"
import cn from "classnames"

type NavItemProps = {
  href: string
  children: ReactNode
  className?: string
  isCurrent: boolean
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ href, children, className, isCurrent }, ref) => {
    return (
      <Link
        href={href}
        ref={ref}
        className={cn(className, "underlined", { active: isCurrent })}
        aria-current={isCurrent ? "page" : "false"}
      >
        {href === "/" ? <h1>{children}</h1> : children}
      </Link>
    )
  }
)

NavItem.displayName = "NavItem"

export default NavItem
