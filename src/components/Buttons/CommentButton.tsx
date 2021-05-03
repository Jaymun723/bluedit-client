import { useNavigate } from "react-router-dom"
import React from "react"
import { c } from "../../utils"

interface CommentButtonProps {
  url?: string
  onClick?: () => void
  commentCount?: number

  disabled?: boolean
  small?: boolean

  active?: boolean

  className?: string
}

export const CommentButton: React.FC<CommentButtonProps> = (props) => {
  const navigate = useNavigate()

  if (props.disabled) {
    return (
      <button
        disabled
        className={c(
          "button",
          "is-text",
          !props.small && "is-medium",
          props.active && "has-text-primary",
          props.className
        )}
      >
        <span className="icon">
          <ion-icon name={"chatbubble-outline"} />
        </span>
      </button>
    )
  }

  return (
    <>
      <a
        className={c(
          "button",
          "is-text",
          !props.small && "is-medium",
          props.active && "has-text-primary",
          props.className
        )}
        href={props.url || "#"}
        onClick={(e) => {
          e.preventDefault()
          if (props.url) {
            navigate(props.url)
          } else if (props.onClick) {
            props.onClick()
          }
        }}
        title="Comment"
      >
        <span className="icon">
          <ion-icon name={props.active ? "chatbubble" : "chatbubble-outline"} />
        </span>
      </a>
      {props.commentCount && <p>{props.commentCount}</p>}
    </>
  )
}
