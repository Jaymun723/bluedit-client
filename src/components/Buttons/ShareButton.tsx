import React from "react"

import { c } from "../../utils"
import { AppNotificationType, useAppNotifications } from "../Notifications"

interface ShareButtonProps {
  url?: string
  disabled?: boolean
  small?: boolean
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
  const { pushNotification } = useAppNotifications()

  if (!props.url) {
    return <button className={c("button", "is-text", !props.small && "is-medium", "is-loading")} />
  }

  if (props.disabled) {
    return (
      <button
        className={c("button", "is-text", !props.small && "is-medium")}
        title="Share"
        disabled
      >
        <span className="icon">
          <ion-icon name="share-social-outline"></ion-icon>
        </span>
      </button>
    )
  }

  return (
    <a
      className={c("button", "is-text", !props.small && "is-medium")}
      title="Share"
      href={window.location.origin + props.url}
      // disabled={props.disabled}
      onClick={(e) => {
        e.preventDefault()
        if (props.url) {
          navigator.clipboard.writeText(window.location.origin + props.url)
          pushNotification({
            text: "Link successfully copied !",
            type: AppNotificationType.SUCCESS,
            baseOpacity: 1,
            timing: 2000,
          })
        }
      }}
    >
      <span className="icon">
        <ion-icon name="share-social-outline"></ion-icon>
      </span>
    </a>
  )
}
