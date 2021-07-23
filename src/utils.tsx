import { useEffect, useState } from "react"
import { AppNotificationType } from "./components/Notifications"
import { SortType } from "./generated/graphql"

export const c = (...args: Array<string | null | boolean | undefined>) => {
  return args
    .filter(Boolean)
    .filter((el) => typeof el === "string")
    .join(" ")
}

export const LOAD_BATCH_SIZE = 5
export const DEFAULT_SORT_TYPE = SortType.New

export const useDelay = <T,>(delayedValue: T, time: number) => {
  const [value, setValue] = useState(undefined as T | undefined)

  useEffect(() => {
    setTimeout(() => {
      setValue(delayedValue)
    }, time)
  })

  return value
}

export const fileToImageUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onabort = reject
    reader.onerror = console.error
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        resolve(e.target.result as string)
      } else {
        reject(new Error("Reader returned nothing."))
      }
    }
    reader.readAsDataURL(file)
  })

export const debounce = <Args extends any[]>(fn: (...args: Args) => any, timeout = 1000) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, timeout)
  }
}

export const isValidHttpUrl = (url: string) => {
  try {
    let res = new URL(url)
    return res.protocol === "http:" || res.protocol === "https:"
  } catch (_) {
    return false
  }
}

const htmlEscapes: { [x: string]: string } = {
  "&": "&amp",
  "<": "&lt",
  ">": "&gt",
  '"': "&quot",
  "'": "&#39",
}

export const simpleMarkdownParser = (text: string) => {
  const toHTML = text
    .replace(/[&<>"']/g, (chr) => htmlEscapes[chr]) // escape html
    .replace(/\*\*(.*)\*\*/gim, "<b>$1</b>") // bold text
    .replace(/\*(.*)\*/gim, "<i>$1</i>") // italic text
    .replace(/\n/g, "<br />") // new line
    .replace(
      /\[(.*?)\]\(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\)/gim,
      "<a href='$2' target='_blank'>$1</a>"
    ) // links

  return toHTML.trim() // using trim method to remove whitespace
}

export const pureText = (text: string) => {
  const toHTML = text
    .replace(/[&<>"']/g, (chr) => htmlEscapes[chr]) // escape html
    .replace(/\*\*(.*)\*\*/gim, "$1") // bold text
    .replace(/\*(.*)\*/gim, "$1") // italic text
    .replace(/\n/g, " ") // new line
    .replace(
      /\[(.*?)\]\(((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)\)/gim,
      "$2"
    ) // links

  return toHTML.trim() // using trim method to remove whitespace
}

export const networkError = {
  baseOpacity: 1,
  text:
    "An error occurred while fetching data. Try to reload the page. If the problem still occurs please contact an admin.",
  timing: 10_000,
  type: AppNotificationType.DANGER,
}
