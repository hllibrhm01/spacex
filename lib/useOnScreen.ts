import { MutableRefObject } from "react"
import { useState, useEffect } from "react"

function useOnScreen<T extends Element>(
  ref: MutableRefObject<T>,
  rootMargin: string = "0px"
): boolean {
  const [isIntersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    let currentRef = ref.current
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => setIntersecting(isIntersecting),
      { rootMargin }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observer.unobserve(currentRef)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin])

  return isIntersecting
}

export default useOnScreen
