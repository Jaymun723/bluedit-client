import React from "react"

import { c } from "../../utils"

interface SubscribeButtonProps {
  userSubscribed: boolean
  subscribe: () => void
  unsubscribe: () => void
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = (props) => {
  return (
    <button
      className={c("button", props.userSubscribed ? "is-danger" : "is-primary")}
      onClick={() => {
        if (props.userSubscribed) {
          props.unsubscribe()
        } else {
          props.subscribe()
        }
      }}
    >
      <span className="icon">
        <ion-icon
          name={props.userSubscribed ? "close-circle-outline" : "add-circle-outline"}
          style={{ fontSize: "24px" }}
        />
      </span>
      <span>{props.userSubscribed ? "Unsubscribe" : "Subscribe"}</span>
    </button>
  )
}
