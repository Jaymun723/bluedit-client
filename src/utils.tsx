import { useEffect, useState } from "react"

export const c = (...args: Array<string | null | boolean | undefined>) => {
  return args
    .filter(Boolean)
    .filter((el) => typeof el === "string")
    .join(" ")
}

export const LOAD_BATCH_SIZE = 5

export const useDelay = <T,>(delayedValue: T, time: number) => {
  const [value, setValue] = useState(undefined as T | undefined)

  useEffect(() => {
    setTimeout(() => {
      setValue(delayedValue)
    }, time)
  })

  return value
}
