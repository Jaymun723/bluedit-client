import { Link } from "@reach/router"
import React from "react"

interface CommentButtonProps {
  url?: string
  commentCount?: number
}

export const CommentButton: React.FC<CommentButtonProps> = (props) => {
  if (!props.url) {
    return <button className="button is-white is-medium is-loading" />
  }

  return (
    <>
      <Link className="button is-white is-medium" to={props.url} title="Comment">
        <span className="icon">
          <ion-icon name="chatbubble-outline"></ion-icon>
        </span>
      </Link>
      <p>{props.commentCount}</p>
    </>
  )
}
