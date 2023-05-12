import { type RefObject, useEffect } from "react"
import useRafState from "./useRafState"
import { off, on } from "./utils"

export interface Pos {
  x: number
  y: number
}

const defaultPos = { x: 0, y: 0 }

function useScroll(ref: RefObject<HTMLElement>): Pos {
  if (process.env.NODE_ENV === "development") {
    if (typeof ref !== "object" || typeof ref.current === "undefined") {
      console.error("`useScroll` expects a single ref argument.")
    }
  }

  const [state, setState] = useRafState(defaultPos)

  useEffect(() => {
    let current = ref.current

    const handler = () => {
      if (current) setState({ x: current.scrollLeft, y: current.scrollTop })
    }

    if (current) {
      on(current, "scroll", handler, { capture: false, passive: true })

      return () => off(current, "scroll", handler)
    }

  }, [ref, setState])

  return state
}

export default useScroll
