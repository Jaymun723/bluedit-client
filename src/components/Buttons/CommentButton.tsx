import { Link } from "react-router-dom"
import React from "react"

interface CommentButtonProps {
  url?: string
  commentCount?: number
  disabled?: boolean
}

export const CommentButton: React.FC<CommentButtonProps> = (props) => {
  if (!props.url) {
    return <button className="button is-text is-medium is-loading" />
  }

  if (props.disabled) {
    return (
      <button disabled className="button is-text is-medium">
        <span className="icon">
          <ion-icon name="chatbubble-outline" />
        </span>
      </button>
    )
  }

  return (
    <>
      <Link className="button is-text is-medium" to={props.url} title="Comment">
        <span className="icon">
          <ion-icon name="chatbubble-outline" />
        </span>
      </Link>
      <p>{props.commentCount}</p>
    </>
  )
}
