import React from "react"
import { c } from "../../utils"

interface SubmitButtonProps {
  isLoading: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <button
      className={c(
        "button",
        "is-info",
        "is-expanded",
        "is-fullwidth",
        props.isLoading && "is-loading"
      )}
    >
      Post !
    </button>
  )
}
