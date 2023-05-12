import type { Dispatch, SetStateAction } from "react"
import { useCallback, useRef, useState } from "react"

import useUnmount from "./useUnmount"

type MaybeFunc<T> = T | (() => T)

type Option<T> = T | undefined

function useRafState<S extends unknown = unknown>(
  initialState: MaybeFunc<S>
): [S, Dispatch<SetStateAction<S>>]

function useRafState<S extends unknown = undefined>(
  initialState: MaybeFunc<Option<S>>
): [Option<S>, Dispatch<SetStateAction<Option<S>>>] {
  const frame = useRef(0)
  const [state, _setState] = useState<Option<S>>(initialState)

  const setState: Dispatch<SetStateAction<Option<S>>> = useCallback(value => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => _setState(value))
  }, [])

  useUnmount(() => cancelAnimationFrame(frame.current))

  return [state, setState]
}

export default useRafState
