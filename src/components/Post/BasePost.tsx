import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { UpVoteButtons } from "../Buttons/UpVoteButtons"
import { formatDistance } from "date-fns"
import { CommentButton } from "../Buttons/CommentButton"
import { ShareButton } from "../Buttons/ShareButton"
import { c } from "../../utils"
import { usePostVoteMutation, useRemovePostMutation } from "../../generated/graphql"
import { useAppState } from "../AppState"
import { useConfirmDelete } from "../Modals/ConfirmDelete"

export interface BasePostPreviewProps {
  id: string
  title?: string
  url?: string
  userVote?: { id: string; up: boolean } | null
  voteCount?: number
  bluedit?: { name: string }
  author?: { name: string; id: string }
  createdAt?: string
  commentCount?: number
  isFullPage?: boolean
  body?: React.ReactNode
  disableButtons?: boolean
  additionalButton?: React.ReactNode
}

export const BasePostPreview: React.FC<BasePostPreviewProps> = (props) => {
  const [vote] = usePostVoteMutation()
  const [remove] = useRemovePostMutation()
  const [{ user }] = useAppState()
  const navigate = useNavigate()
  const { startPopup } = useConfirmDelete({
    entity: "post",
    onConfirm: () => {
      remove({
        variables: { id: props.id },
      }).then(() => {
        navigate("/")
      })
    },
  })

  return (
    <div className={c("card", !props.isFullPage && "is-post-card", "is-align-self-center", "mb-3")}>
      {props.bluedit && props.author && props.title && props.url && props.createdAt ? (
        <>
          <div className="card-content">
            <p className="title">
              <Link to={props.url} className={c(`has-text-white`)}>
                {props.title}
              </Link>
            </p>
            <p className="subtitle is-size-6">
              Posted on <Link to={`/b/${props.bluedit.name}`}>/b/{props.bluedit.name}</Link> by{" "}
              <Link to={`/u/${props.author.name}`}>/u/{props.author.name}</Link>{" "}
              {formatDistance(new Date(props.createdAt), new Date())} ago
            </p>
            {props.children}
          </div>
          {props.body}
          <footer className="card-footer">
            <div className="card-footer-item">
              <UpVoteButtons
                voteCount={props.voteCount}
                userVote={props.userVote}
                targetId={props.id}
                vote={(up) => vote({ variables: { postId: props.id, up } })}
                disabled={props.disableButtons}
              />
            </div>
            <div className="card-footer-item">
              <CommentButton
                commentCount={props.commentCount}
                url={props.url}
                disabled={props.disableButtons}
              />
            </div>
            <div className="card-footer-item">
              <ShareButton url={props.url} disabled={props.disableButtons} />
            </div>
            {props.additionalButton}
            {user?.id === props.author.id && props.isFullPage && (
              <div className="card-footer-item">
                <button
                  className="button is-text is-medium"
                  title="Delete post"
                  onClick={() => {
                    if (!props.disableButtons) {
                      startPopup()
                    }
                  }}
                >
                  <span className="icon">
                    <ion-icon name="trash-outline" />
                  </span>
                </button>
              </div>
            )}
          </footer>
        </>
      ) : (
        <div className="card-content">
          <div className="is-flex is-justify-content-center is-align-items-center my-4">
            <button className="button is-text is-large is-loading"></button>
          </div>
        </div>
      )}
    </div>
  )
}
