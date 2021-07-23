import React from "react"

import { c } from "../../utils"
import { AppNotificationType, useAppNotifications } from "../Notifications"

interface ShareButtonProps {
  url?: string
  disabled?: boolean
  small?: boolean
}

const createUrl = (part: string) => {
  const url = new URL(window.location.href)
  url.pathname = part
  return url.href
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
  const { pushNotification } = useAppNotifications()

  if (!props.url) {
    return <button className={c("button", "is-text", !props.small && "is-medium", "is-loading")} />
  }

  return (
    <button
      className={c("button", "is-text", !props.small && "is-medium")}
      title="Share"
      disabled={props.disabled}
      onClick={() => {
        if (props.url) {
          navigator.clipboard.writeText(createUrl(props.url))
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
    </button>
  )
}
