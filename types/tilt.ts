import type { MouseEvent, TouchEvent } from "react"

export type ElementSizePosition = {
  width: number | null
  height: number | null
  left: number | null
  top: number | null
}

export type ClientPosition = {
  x: number | null
  y: number | null
  xPercentage: number
  yPercentage: number
}

export type WrapperElement = {
  node: HTMLDivElement | null
  size: ElementSizePosition
  clientPosition: ClientPosition
  updateAnimationId: number | null
  scale: number
}

type DOMSupportedEvent =
  | Event
  | MouseEvent<HTMLDivElement>
  | TouchEvent<HTMLDivElement>
  | DeviceOrientationEvent

type DOMEventType = "touchmove" | "mousemove" | "deviceorientation"

export type SupportedEvent = DOMSupportedEvent | CustomEvent<CustomEventType>
export type CustomEventType = "autoreset" | "initial" | "propChange"
export type EventType = DOMEventType | CustomEventType

export interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<"granted" | "denied">
}
