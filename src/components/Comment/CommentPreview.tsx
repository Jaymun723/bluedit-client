import { Link } from "@reach/router"
import React, { useState } from "react"
import {
  useCommentPreviewQuery,
  useCommentVoteMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} from "../../generated/graphql"
import { c } from "../../utils"
import { useAppState } from "../AppState"
import { UpVoteButtons } from "../Buttons/UpVoteButtons"
import { usePopup } from "../Modals"
import { useConfirmDelete } from "../Modals/ConfirmDelete"
import { CommentInput } from "./CommentInput"

interface CommentEditorProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}
const CommentEditor: React.FC<CommentEditorProps> = (props) => {
  return (
    <div className="field">
      <div className="control">
        <textarea
          rows={1}
          className="textarea"
          autoFocus
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}

interface CommentPreviewProps {
  id: string
  postId: string
}

export const CommentPreview: React.FC<CommentPreviewProps> = (props) => {
  const [{ user }] = useAppState()
  const { data, loading, error } = useCommentPreviewQuery({
    variables: { id: props.id },
  })
  const [vote] = useCommentVoteMutation()
  const [edit] = useEditCommentMutation()
  const [remove] = useRemoveCommentMutation()

  const [editing, setEditing] = useState(false)
  const [editContent, setEditingContent] = useState("")
  const [commenting, setCommenting] = useState(false)

  const { startPopup } = useConfirmDelete({
    entity: "comment",
    onConfirm: () => {
      remove({
        variables: { id: props.id },
      })
    },
  })

  if (loading) {
    return (
      <div className="box is-flex is-justify-content-center">
        <button className="button is-white is-loading" />
        {/* {props.children} */}
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1px solid red" }}>{JSON.stringify(error)}</div>
    } else {
      return null
    }
  }

  if (data.comment.deleted) {
    return (
      <div className="media box">
        <div className="media-content">
          <div className="content">
            REMOVED
            {props.children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="media box">
      <div className="media-content">
        <div className="content mb-0">
          <strong>
            <Link to={`/u/${data.comment.author.name}`}>{data.comment.author.name}</Link>
          </strong>
          <br />
          {editing ? (
            <CommentEditor
              onChange={setEditingContent}
              value={editContent}
              placeholder={data.comment.content}
            />
          ) : (
            data.comment.content
          )}
        </div>
        <div className="level mb-0">
          <div className="level-right">
            <div className="level-item">
              <UpVoteButtons
                targetId={props.id}
                userVote={data.comment.userVote}
                voteCount={data.comment.voteCount}
                vote={(up) =>
                  vote({
                    variables: { commentId: props.id, postId: props.postId, up },
                  })
                }
              />
            </div>
            {user && (
              <div className="level-item">
                <button
                  className={c("button", "is-medium", "is-white", commenting && "has-text-primary")}
                  onClick={() => setCommenting(!commenting)}
                >
                  <span className="icon">
                    <ion-icon name="chatbubble-outline"></ion-icon>
                  </span>
                </button>
              </div>
            )}
            {user?.id === data.comment.author.id && (
              <>
                <div className="level-item">
                  <button
                    className={c("button", "is-medium", "is-white", editing && "has-text-primary")}
                    onClick={() => {
                      if (editing === false) {
                        setEditingContent(data.comment.content)
                      } else {
                        edit({ variables: { content: editContent, id: props.id } })
                      }
                      setEditing(!editing)
                    }}
                  >
                    <span className="icon">
                      <ion-icon name="construct-outline"></ion-icon>
                    </span>
                  </button>
                </div>
                <div className="level-item">
                  <button className="button is-white is-medium" onClick={startPopup}>
                    <span className="icon">
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {commenting && (
          <CommentInput
            postId={props.postId}
            commentId={props.id}
            onFinishedComment={() => setCommenting(false)}
          />
        )}
        {props.children}
      </div>
    </div>
  )
}
