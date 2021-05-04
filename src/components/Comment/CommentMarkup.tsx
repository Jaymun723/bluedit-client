import React from "react"
import { Link } from "react-router-dom"

import { c } from "../../utils"
import { useAppState } from "../AppState"
import { CommentButton, ShareButton, UpVoteButtons } from "../Buttons"

interface CommentMarkupProps {
  commentId: string

  commenting: boolean
  onClickComment: () => void

  editing: boolean
  onEditStateChange: (state: "START" | "CANCEL" | "SUBMIT") => void
  editValue: string
  onEditValueChange: (editValue: string) => void

  onClickDelete: () => void

  author?: { id: string; name: string }
  content?: string
  removed?: boolean

  voteCount?: number
  userVote?: { up: boolean }
  vote?: (up: boolean) => Promise<any>

  last: boolean
}
export const CommentMarkup: React.FC<CommentMarkupProps> = (props) => {
  const [{ user }] = useAppState()

  if (!props.author || !props.content) {
    return (
      <div className="box comment is-flex is-justify-content-center">
        <button className="button is-text is-loading" />
      </div>
    )
  }

  if (props.removed) {
    return (
      <div className="box comment">
        <div className="content">
          <strong>REMOVED</strong>
        </div>
        {props.children}
      </div>
    )
  }

  return (
    <div className={c("box", "comment", props.last && "last-comment")}>
      <h4 className="title is-5 mb-1">
        <Link to={`/u/${props.author.name}`}>/u/{props.author.name}</Link>
      </h4>
      {props.editing ? (
        <div className="field">
          <div className="control">
            <textarea
              rows={1}
              className="textarea"
              autoFocus
              value={props.editValue}
              onChange={(e) => props.onEditValueChange(e.target.value)}
              placeholder={"Your comment."}
            />
          </div>
        </div>
      ) : (
        <div className="content mb-0">{props.content}</div>
      )}
      <div className="level mb-0">
        <div className="level-left">
          <div className="level-item">
            <UpVoteButtons
              voteCount={props.voteCount}
              small
              targetId={props.commentId}
              userVote={props.userVote}
              vote={props.vote}
            />
          </div>
          <div className="level-item">
            <CommentButton onClick={props.onClickComment} small active={props.commenting} />
          </div>
          <div className="level-item">
            <ShareButton small url="#" />
          </div>
          {user?.id === props.author.id && (
            <>
              {props.editing && (
                <div className="level-item">
                  <button
                    className={c("button", "is-text", "has-text-warning")}
                    onClick={() => props.onEditStateChange("CANCEL")}
                  >
                    <span className="icon">
                      <ion-icon name="close" />
                    </span>
                  </button>
                </div>
              )}
              <div className="level-item">
                <button
                  className={c("button", "is-text", props.editing && "has-text-success")}
                  onClick={() => {
                    if (props.editing) {
                      props.onEditStateChange("SUBMIT")
                    } else {
                      props.onEditStateChange("START")
                    }
                  }}
                >
                  <span className="icon">
                    <ion-icon name={props.editing ? "checkmark" : "construct-outline"} />
                  </span>
                </button>
              </div>
              <div className="level-item">
                <button className="button is-text is-medium" onClick={props.onClickDelete}>
                  <span className="icon">
                    <ion-icon name="trash-outline" />
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {props.children}
    </div>
  )
}
