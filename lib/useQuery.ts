import type { ChangeEventHandler } from "react"
import { useState, useMemo, useCallback, useRef, useEffect } from "react"

function useQuery(initState = "") {
  const [query, setQuery] = useState(initState)

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setQuery(e.target.value)
  }, [])

  return useMemo(
    () => ({
      query,
      onChange,
    }),
    [query, onChange]
  )
}

export default useQuery
