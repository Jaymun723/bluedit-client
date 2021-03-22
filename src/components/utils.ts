import { useState, useEffect } from "react"
import { css } from "linaria"

export function withActive(condition: boolean): string
export function withActive(className: string, condition: boolean): string
export function withActive(a: string | boolean, b?: boolean): string {
  if (typeof a === "string") {
    return `${a}${b ? " is-active" : ""}`
  } else {
    return a ? "is-active" : ""
  }
}

export const useDelay = <T>(delayedValue: T, time: number) => {
  const [value, setValue] = useState(undefined as T | undefined)

  useEffect(() => {
    setTimeout(() => {
      setValue(delayedValue)
    }, time)
  })

  return value
}

export const isClickable = css`
  cursor: pointer;
`

export const hideLink = css`
  color: #363636;
`
