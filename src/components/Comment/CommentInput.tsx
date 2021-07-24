import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import {
  PostCommentsDocument,
  PostCommentsQuery,
  useCommentMutation,
} from "../../generated/graphql"
import { c } from "../../utils"
import { useAppState } from "../AppState"
import { AppNotificationType, useAppNotifications } from "../Notifications"

interface CommentInputProps {
  postId: string
  commentId?: string
  onFinishedComment?: () => void
}

export const CommentInput: React.FC<CommentInputProps> = (props) => {
  const [{ user }] = useAppState()
  const [content, setContent] = useState("")
  const [comment, { error }] = useCommentMutation()
  const [loading, setLoading] = useState(false)
  const { pushNotification } = useAppNotifications()

  useEffect(() => {
    if (error) {
      pushNotification({
        text: error.message,
        baseOpacity: 1,
        timing: 3000,
        type: AppNotificationType.DANGER,
      })
    }
  }, [error])

  return (
    <div className="card block">
      <div className="card-content">
        <div className="field">
          <p className="control">
            <textarea
              className={c("textarea", loading && "is-loading")}
              placeholder="Add a comment..."
              rows={1}
              value={content}
              onChange={(e) => {
                setContent(e.target.value)
              }}
              autoFocus
              readOnly={loading}
            />
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              {user && (
                <p>
                  Commenting as <Link to={`/u/${user.name}`}>/u/{user.name}</Link>
                </p>
              )}
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <button
                className={c("button", "is-info", loading && "is-loading")}
                disabled={typeof user === "undefined"}
                onClick={() => {
                  if (!content) return
                  setLoading(true)
                  comment({
                    variables: {
                      content,
                      postId: props.postId,
                      commentId: props.commentId,
                    },
                    update: (proxy, { data }) => {
                      if (data) {
                        const cachedData = proxy.readQuery<PostCommentsQuery>({
                          query: PostCommentsDocument,
                        })
                        if (cachedData) {
                          proxy.writeQuery<PostCommentsQuery>({
                            query: PostCommentsDocument,
                            data: {
                              ...cachedData,
                              post: {
                                ...cachedData.post,
                                comments: [
                                  ...cachedData.post.comments,
                                  {
                                    childComments: [],
                                    id: data.comment.id,
                                    comment: props.commentId ? { id: props.commentId } : null,
                                  },
                                ],
                              },
                            },
                          })
                        }
                      }
                    },
                  }).then(() => {
                    setContent("")
                    setLoading(false)
                    if (props.onFinishedComment) {
                      props.onFinishedComment()
                    }
                  })
                }}
              >
                Comment
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
