import { useRef, useEffect } from "react"

function useUnmount(fn: () => any) {
  const ref = useRef(fn)
  ref.current = fn

  // useEffect(() => {
  //   return () => ref.current()
  // }, [])

  // TODO: make sure this is the same as above ⬆️
  useEffect(() => ref.current, [])
}

export default useUnmount
