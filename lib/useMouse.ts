import type { RefObject, MouseEventHandler } from "react"
import { useEffect } from "react"
import useRafState from "./useRafState"
import { off, on } from "./utils"

export interface UseMouse {
  width: number    
  height: number   
  left: number     
  top: number       
  page: Vec         
  pos: Vec         
  elemPos: Vec    
}

type Vec = [x: number, y: number]

export type MouseState = Pick<DOMRect, "width" | "height" | "left" | "top"> & {
  page: Vec
  pos: Vec
  elemPos: Vec
}

const defaultVec: Vec = [0, 0]

const defaultState: MouseState = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  pos: defaultVec,
  elemPos: defaultVec,
  page: defaultVec,
}

function useMouse(ref: RefObject<Element>): MouseState {
  if (process.env.NODE_ENV === "development") {
    if (typeof ref !== "object" || typeof ref.current === "undefined") {
      console.error("useMouse expects a single ref argument.")
    }
  }
  const [state, setState] = useRafState(defaultState)

  useEffect(() => {
    const moveHandler: MouseEventHandler = ({ pageX, pageY }) => {
      if (ref?.current) {
        const { left, top, width, height } = ref.current.getBoundingClientRect()
        const { scrollX, scrollY } = window
        const pos: Vec = [left + scrollX, top + scrollY]
        const elemPos: Vec = [pageX - pos[0], pageY - pos[1]]
        setState({
          width,
          height,
          left,
          top,
          pos,
          elemPos,
          page: [pageX, pageY],
        })
      }
    }

    on(document, "mousemove", moveHandler)

    return () => off(document, "mousemove", moveHandler)
  }, [ref, setState])

  return state
}

export default useMouse
