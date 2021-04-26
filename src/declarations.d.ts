import { CSSProperties } from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon": IonIconElement
    }

    interface IonIconElement {
      name: string
      size?: string
      style?: CSSProperties
    }
  }
}

export {}
