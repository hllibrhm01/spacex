import type {
  PropsWithChildren,
  ComponentPropsWithoutRef,
} from "react"
import { useEffect } from "react"

import type {
  WrapperElement,
} from "types/tilt"
import { setTransition, constrainToRange } from "lib/tilt"

export type OnMoveParams = {
  tiltAngleX: number
  tiltAngleY: number
  tiltAngleXPercentage: number
  tiltAngleYPercentage: number
  glareAngle: number
  glareOpacity: number
  eventType: string
}

type OnMove = (onMoveParams: OnMoveParams) => void

type HtmlDivTilt = Pick<ComponentPropsWithoutRef<"div">, "className" | "style">

type ParallaxTiltProps = PropsWithChildren<
  HtmlDivTilt &
    Partial<{
      scale: number
      perspective: number
      flipVertically: boolean
      flipHorizontally: boolean
      reset: boolean
      transitionEasing: string
      transitionSpeed: number
      trackOnWindow: boolean
      gyroscope: boolean
      onMove: OnMove
      onEnter: (eventType: string) => void
      onLeave: (eventType: string) => void
    }>
>

const defaultProps: ParallaxTiltProps = {
  scale: 1,
  perspective: 1000,
  flipVertically: false,
  flipHorizontally: false,
  reset: true,
  transitionEasing: "cubic-bezier(.03,.98,.52,.99)",
  transitionSpeed: 400,
  trackOnWindow: false,
  gyroscope: false,
}

const ParallaxTilt: React.FC<ParallaxTiltProps> = ({
  scale = 1,
  perspective = 1000,
  flipVertically = false,
  flipHorizontally = false,
  reset = true,
  transitionEasing = "cubic-bezier(.03,.98,.52,.99)",
  transitionSpeed = 400,
  trackOnWindow = false,
  gyroscope = false,
  ...props
}) => {
  const wrapperEl: WrapperElement = {
    node: null,
    size: {
      width: 0,
      height: 0,
      left: 0,
      top: 0,
    },
    clientPosition: {
      x: null,
      y: null,
      xPercentage: 0,
      yPercentage: 0,
    },
    updateAnimationId: null,
    scale: 1,
  }

  useEffect(() => {
    return () => {}
  }, [])

  return <div>Hello Tilt World</div>
}

export default ParallaxTilt
