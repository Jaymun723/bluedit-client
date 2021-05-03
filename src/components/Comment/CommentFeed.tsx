import React, { useEffect } from "react"
import { usePostCommentsQuery } from "../../generated/graphql"
import { CommentInput } from "./CommentInput"
import { CommentPreview } from "./CommentPreview"
import { CommentTree } from "./CommentTree"

interface CommentFeedProps {
  postId: string
}

export const CommentFeed: React.FC<CommentFeedProps> = (props) => {
  const { data, error, loading } = usePostCommentsQuery({
    variables: { id: props.postId },
    // fetchPolicy: "cache-and-network",
    // fetchPolicy: ""
  })

  if (loading) {
    return (
      <div className="is-flex is-justify-content-center mt-5">
        <button className="button is-text is-large is-loading" />
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

  return (
    <>
      <CommentInput postId={props.postId} />
      <CommentTree comments={data.post.comments} isRoot postId={props.postId} />
      {/* {data.post.comments.map((comment) => (
        <CommentPreview id={comment.id} key={comment.id} postId={props.postId} />
      ))} */}
    </>
  )
}
