import React from "react"

import { c } from "../../utils"

interface ShareButtonProps {
  url?: string
  disabled?: boolean
  small?: boolean
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
  if (!props.url) {
    return <button className={c("button", "is-text", !props.small && "is-medium", "is-loading")} />
  }

  return (
    <button
      className={c("button", "is-text", !props.small && "is-medium")}
      title="Share"
      disabled={props.disabled}
    >
      <span className="icon">
        <ion-icon name="share-social-outline"></ion-icon>
      </span>
    </button>
  )
}
