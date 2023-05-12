import { useState, useCallback, useMemo } from "react"
// import type { DispatchWithoutAction, Reducer } from "react"

// function isBoolean(value?: unknown | boolean): value is boolean {
//   return typeof value === "boolean"
// }

// type ToggleAction = {
//   type: "toggle" | "true" | "false" | undefined | null
// }

// const toggleReducer: Reducer<boolean, ToggleAction> = (state, action) => {
//   // return isBoolean(action) ? nextValue : !state
//   if (action.type === "toggle") !state
//   if (action.type === "true") return true
//   if (action.type === "false") return false
//   return state
// }
// export type UseToggle = Readonly<[boolean, () => void]>
// const useToggle = (init: boolean): UseToggle => useReducer(toggleReducer, init)

type Noop = () => void

export type UseToggle = Readonly<{
  isToggled: boolean
  isNotToggled: boolean
  toggle: Noop
  toggleTrue: Noop
  toggleFalse: Noop
}>

const useToggle = (initState = false): UseToggle => {
  const [isToggled, setIsToggled] = useState(initState)

  const toggle = useCallback(() => setIsToggled(s => !s), [])

  // const [isToggled, dispatch] = useReducer(toggleReducer, initState)
  // const toggle = () => dispatch({ type: "toggle" })
  // const toggleTrue = () => dispatch({ type: "true" })
  // const toggleFalse = () => dispatch({ type: "false" })
  // return {
  //   isToggled,
  //   isNotToggled: !isToggled,
  //   toggle,
  //   toggleTrue,
  //   toggleFalse,
  // } as const

  const toggleTrue = () => setIsToggled(true)
  const toggleFalse = () => setIsToggled(false)

  return useMemo(
    () =>
      ({
        isToggled,
        isNotToggled: !isToggled,
        toggle,
        toggleTrue,
        toggleFalse,
      } as const),
    [isToggled, toggle]
  )

  // const toggleTrue = useCallback(() => setIsToggled(true), [])
  // const toggleFalse = useCallback(() => setIsToggled(false), [])
  // return [isToggled, toggle] as const
}

export default useToggle
