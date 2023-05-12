import { useEffect, useRef, useState } from "react"
export type ObserverInstanceCallback = (
  inView: boolean,
  entry: IntersectionObserverEntry
) => void

export type InViewRef = (node?: Element | null) => void

interface RenderProps {
  inView: boolean
  entry: IntersectionObserverEntry | undefined
  ref: React.RefObject<any> | InViewRef
}

export interface IntersectionOptions extends IntersectionObserverInit {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  triggerOnce?: boolean
  skip?: boolean
  initialInView?: boolean
  fallbackInView?: boolean
  trackVisibility?: boolean
  delay?: number
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

export interface IntersectionObserverProps extends IntersectionOptions {
  children: (fields: RenderProps) => React.ReactNode
}

export type PlainChildrenProps = React.PropsWithChildren<
  IntersectionOptions & {
    as?: React.ElementType
    onChange?: ObserverInstanceCallback
  } & Omit<React.HTMLProps<HTMLElement>, "onChange">
>

export type InViewResponse = [
  InViewRef,
  boolean,
  IntersectionObserverEntry | undefined
] & {
  ref: InViewRef
  inView: boolean
  entry?: IntersectionObserverEntry
}

type Observation = {
  id: string
  observer: IntersectionObserver
  elements: Map<Element, ObserverInstanceCallback[]>
}

const observers = new Map<string, Observation>()
const RootIds = new WeakMap<Element | Document, string>()
let rootId = 0

function getRootId(root: IntersectionObserverInit["root"]) {
  if (!root) return "0"
  if (RootIds.has(root)) {
    return RootIds.get(root) as string
  }
  rootId += 1
  RootIds.set(root, rootId.toString())
  return RootIds.get(root) as string
}

type IntersectionObserverInitKeys = keyof IntersectionObserverInit

export function optionsToId(options: IntersectionObserverInit) {
  return (Object.keys(options) as Array<IntersectionObserverInitKeys>)
    .sort()
    .filter(k => options[k] !== undefined)
    .map(k => {
      return `${k}_${k === "root" ? getRootId(options.root) : options[k]}`
    })
    .toString()
}

function createObserver(options: IntersectionObserverInit) {
  let id = optionsToId(options)
  let instance = observers.get(id)

  if (!instance) {
    const elements = new Map<Element, Array<ObserverInstanceCallback>>()
    let thresholds: number[] | readonly number[]

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const inView =
          entry.isIntersecting &&
          thresholds.some(threshold => entry.intersectionRatio >= threshold)

        // @ts-ignore
        if (options.trackVisibility && typeof entry.isVisible === "undefined") {
          // @ts-ignore
          entry.isVisible = inView
        }
        elements.get(entry.target)?.forEach(cb => cb(inView, entry))
      })
    }, options)

    thresholds =
      observer.thresholds ||
      (Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold || 0])

    instance = { id, observer, elements }

    observers.set(id, instance)
  }

  return instance
}

export function observe(
  element: Element,
  callback: ObserverInstanceCallback,
  options: IntersectionObserverInit = {},
  fallbackInView = true
) {
  if (
    typeof window?.IntersectionObserver === "undefined" &&
    fallbackInView !== undefined
  ) {
    const bounds = element.getBoundingClientRect()
    callback(fallbackInView, {
      isIntersecting: fallbackInView,
      target: element,
      intersectionRatio:
        typeof options.threshold === "number" ? options.threshold : 0,
      time: 0,
      boundingClientRect: bounds,
      intersectionRect: bounds,
      rootBounds: bounds,
    })
    return () => {}
  }

  const { id, observer, elements } = createObserver(options)

  let callbacks = elements.get(element) ?? []
  if (!elements.has(element)) elements.set(element, callbacks)

  callbacks.push(callback)
  observer.observe(element)

  return function unobserve() {
    // callbacks = callbacks.filter(cb => cb !== callback)
    callbacks.splice(callbacks.indexOf(callback), 1)

    if (callbacks.length === 0) {
      elements.delete(element)
      observer.unobserve(element)
    }
    if (elements.size === 0) {
      observer.disconnect()
      observers.delete(id)
    }
  }
}

export function useInView({
  threshold,
  delay,
  trackVisibility,
  rootMargin,
  root,
  triggerOnce,
  skip,
  initialInView,
  fallbackInView,
  onChange,
}: IntersectionOptions = {}): InViewResponse {
  const [ref, setRef] = useState<Element | null>(null)
  const callback = useRef<typeof onChange>()
  const [state, setState] = useState<{
    inView: boolean
    entry?: IntersectionObserverEntry
  }>({ inView: !!initialInView, entry: undefined })

  callback.current = onChange
  const thresh = Array.isArray(threshold) ? threshold.toString() : threshold

  useEffect(() => {
    if (skip || !ref) return
    let unobserve: (() => void) | undefined = observe(
      ref,
      (inView, entry) => {
        setState({ inView, entry })

        if (callback.current) callback.current(inView, entry)
        if (entry.isIntersecting && triggerOnce && unobserve) {
          unobserve()
          unobserve = undefined
        }
      },
      {
        root,
        rootMargin,
        threshold,
        // @ts-ignore
        trackVisibility,
        delay,
      },
      fallbackInView
    )

    return () => {
      if (unobserve) unobserve()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    thresh,
    ref,
    root,
    rootMargin,
    triggerOnce,
    skip,
    trackVisibility,
    fallbackInView,
    delay,
  ])

  const entryTarget = state.entry?.target

  useEffect(() => {
    if (!ref && entryTarget && !triggerOnce && !skip) {
      setState({ inView: !!initialInView, entry: undefined })
    }
  }, [ref, entryTarget, triggerOnce, initialInView, skip])

  const result = [setRef, state.inView, state.entry] as InViewResponse
  result.ref = result[0]
  result.inView = result[1]
  result.entry = result[2]
  return result
}
