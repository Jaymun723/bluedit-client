import React, { useEffect, useState } from "react"

import { CommentPreview } from "./CommentPreview"

interface CommentData {
  id: string
  /**
   * Parent comment
   */
  comment?: {
    id: string
  } | null
  childComments: {
    id: string
  }[]
}

interface CommentTreeProps {
  comments: CommentData[]
  isRoot?: boolean
  parentId?: string
  postId: string
}

const getRootComment = (comments: CommentData[]) => {
  return comments.filter((c) => c.comment === null || c.comment === undefined)
}

const getChildOf = (id: string, comments: CommentData[]) => {
  return comments.filter((comment) => comment.comment && comment.comment.id === id)
}

export const CommentTree: React.FC<CommentTreeProps> = (props) => {
  const [comments, setComments] = useState([] as CommentData[])

  useEffect(() => {
    if (props.isRoot) {
      setComments(getRootComment(props.comments))
    } else if (props.parentId) {
      setComments(getChildOf(props.parentId, props.comments))
    }
  }, [props.comments])

  return (
    <>
      {comments.map((comment) => (
        <CommentPreview id={comment.id} key={comment.id} postId={props.postId}>
          {getChildOf(comment.id, props.comments).length > 0 ? (
            <CommentTree comments={props.comments} postId={props.postId} parentId={comment.id} />
          ) : null}
        </CommentPreview>
      ))}
    </>
  )
}
