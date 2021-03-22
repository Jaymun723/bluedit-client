import React, { useState } from "react"
import { RouteComponentProps, Redirect, Link } from "@reach/router"
import { BaseLayout } from "../components/BaseLayout"
import {
  usePostCommentsQuery,
  PostCommentsQuery,
  useCommentMutation,
  useCommentPreviewQuery,
  useCommentVoteMutation,
  useRemoveCommentMutation,
  useEditCommentMutation,
} from "../generated/graphql"
import { PostPreview, UpVoteButtons } from "../components/PostPreview"
import { hideLink } from "../components/utils"
import { useAppState } from "../components/AppState"

interface InputCommentProps {
  postId: string
  commentId?: string
  isRoot?: boolean
}
const InputComment: React.FC<InputCommentProps> = (props) => {
  const [content, setContent] = useState("")
  const [comment, { error }] = useCommentMutation()

  if (error) {
    console.log(error)
  }

  return (
    <article className="media">
      <div className="media-content">
        <div className="field">
          <div className="control" style={{ position: "relative" }}>
            <textarea
              className="textarea"
              placeholder="Add a comment..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              rows={1}
              autoFocus
              id={props.isRoot ? "comment" : undefined}
            />
            <div style={{ position: "absolute", bottom: 0, right: 0, marginBottom: "0.5em", marginRight: "0.5em" }}>
              <span
                className="icon"
                style={{ cursor: "pointer", fontSize: "24px" }}
                onClick={() => {
                  comment({ variables: { content, commentId: props.commentId, postId: props.postId } })
                  setContent("")
                }}
              >
                <ion-icon name="send-outline"></ion-icon>
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

const Comment: React.FC<{ id: string; postId: string }> = (props) => {
  const [{ user }] = useAppState()
  const { data, error } = useCommentPreviewQuery({
    variables: { id: props.id },
  })

  if (error) {
    console.log(error)
    return null
  }

  const [voteMutate] = useCommentVoteMutation()
  const [removeMutate] = useRemoveCommentMutation({ variables: { id: props.id } })
  const [editMutate] = useEditCommentMutation()
  const vote = (up: boolean) => {
    voteMutate({
      variables: { commentId: props.id, postId: props.postId, up },
    })
  }

  const [commenting, setCommenting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState("")

  if (data?.comment.deleted) {
    return (
      <div className="media box">
        <div className="media-content">
          <div className="content">REMOVED</div>
          {props.children}
        </div>
      </div>
    )
  }

  return (
    <div className="media box">
      <div className="media-content">
        <p className="content mb-0">
          <strong>
            <Link className={hideLink} to={`/u/${data?.comment.author.name}`}>
              {data?.comment.author.name}
            </Link>
          </strong>
          <br />
          {isEditing ? (
            <div className="field">
              <div className="control" style={{ position: "relative" }}>
                <textarea
                  className="textarea"
                  placeholder={data?.comment.content}
                  onChange={(e) => setEditContent(e.target.value)}
                  value={editContent}
                  rows={1}
                  autoFocus
                />
                <div style={{ position: "absolute", bottom: 0, right: 0, marginBottom: "0.5em", marginRight: "0.5em" }}>
                  <span
                    className="icon"
                    style={{ cursor: "pointer", fontSize: "24px" }}
                    onClick={() => {
                      setIsEditing(false)
                      editMutate({ variables: { content: editContent, id: props.id } })
                    }}
                  >
                    <ion-icon name="checkmark-outline"></ion-icon>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            data?.comment.content
          )}
        </p>
        <div className="level mb-0">
          <div className="level-right">
            <div className="level-item">
              <UpVoteButtons userVote={data?.comment.userVote} vote={vote} voteCount={data?.comment.voteCount || 0} />
            </div>
            <div className="level-item">
              <button
                className={`button is-medium ${commenting ? "is-primary is-inverted" : "is-white "}`}
                onClick={() => setCommenting(!commenting)}
              >
                <span className="icon">
                  <ion-icon name="chatbubble-outline"></ion-icon>
                </span>
              </button>
            </div>
            {user?.id === data?.comment.author.id && (
              <>
                <div className="level-item">
                  <button
                    className="button is-white is-medium"
                    onClick={() => {
                      if (isEditing === false) {
                        setEditContent(data?.comment.content || "")
                      }
                      setIsEditing(!isEditing)
                    }}
                  >
                    <span className="icon">
                      <ion-icon name="construct-outline"></ion-icon>
                    </span>
                  </button>
                </div>
                <div className="level-item">
                  <button className="button is-white is-medium" onClick={() => removeMutate()}>
                    <span className="icon">
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {commenting && <InputComment postId={props.postId} commentId={props.id} />}
        {props.children}
      </div>
    </div>
  )
}

const CommentTree: React.FC<{ map: { [x: string]: string[] }; startIds: string[]; postId: string }> = (props) => {
  return (
    <>
      {props.startIds.map((id) => (
        <Comment id={id} postId={props.postId} key={id}>
          <CommentTree map={props.map} startIds={props.map[id]} postId={props.postId} />
        </Comment>
      ))}
    </>
  )
}

const commentOrganizer = (query?: PostCommentsQuery): [string[], { [x: string]: string[] }] => {
  if (!query) {
    return [[], {}]
  }

  let map: { [x: string]: string[] } = {}
  let startIds: string[] = []
  for (const comment of query.post.comments) {
    if (comment.childComments) {
      map[comment.id] = comment.childComments.map(({ id }) => id)
    }
    if (!comment.comment) {
      startIds.push(comment.id)
    }
  }
  return [startIds, map]
}

interface PostProps extends RouteComponentProps {
  id?: string
}
const Post: React.FC<PostProps> = (props) => {
  const { data, error } = usePostCommentsQuery({ variables: { id: props.id! }, fetchPolicy: "cache-and-network" })
  const [startIds, map] = commentOrganizer(data)

  if (error) {
    console.log(error)
    return <Redirect to="/" />
  }

  return (
    <BaseLayout>
      <PostPreview id={props.id!} inHead />
      <InputComment postId={props.id!} isRoot />
      <CommentTree startIds={startIds} map={map} postId={props.id!} />
    </BaseLayout>
  )
}

export default Post
