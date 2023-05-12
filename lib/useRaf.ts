import { useState } from "react"
import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

function useRaf(ms: number = 1e12, delay: number = 0): number {
  const [elapsed, setElapsed] = useState(0)

  useIsomorphicLayoutEffect(() => {
    let raf: number
    let timerStop: string | number | NodeJS.Timeout
    let start: number = Date.now()

    const onFrame: FrameRequestCallback = () => {
      const time = Math.min(1, (Date.now() - start) / ms)
      setElapsed(time)
      loop()
    }

    function loop() {
      raf = requestAnimationFrame(onFrame)
    }

    function onStart() {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(raf)
        setElapsed(1)
      }, ms)
      start = Date.now()
      loop()
    }

    const timerDelay = setTimeout(onStart, delay)

    return () => {
      clearTimeout(timerStop)
      clearTimeout(timerDelay)
      cancelAnimationFrame(raf)
    }
  }, [ms, delay])

  return elapsed
}

export default useRaf
