import { Link, navigate } from "@reach/router"
import { formatDistance } from "date-fns"
import React, { useEffect, useRef, useState } from "react"
import { usePostVoteMutation, useRemovePostMutation } from "../../generated/graphql"
import { c } from "../../utils"
import { useAppState } from "../AppState"
import { CommentButton } from "../Buttons/CommentButton"
import { ShareButton } from "../Buttons/ShareButton"
import { UpVoteButtons } from "../Buttons/UpVoteButtons"
import { useConfirmDelete } from "../Modals/ConfirmDelete"
import { useImageViewer } from "../Modals/ImageViewer"
import { BasePostPreview, BasePostPreviewProps } from "./BasePost"

interface ImagePostPreviewProps extends BasePostPreviewProps {
  content?: string
}

const CardImage: React.FC<{ content: string; title: string }> = (props) => {
  const { startPopup } = useImageViewer({ url: props.content })
  const ref = useRef<HTMLImageElement>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const image = ref.current
      image.src = props.content!
      image.onerror = () => {
        setImageError(true)
      }
    }
  }, [ref])

  if (imageError) {
    return (
      <div className="card-content">
        <div className="content">
          <strong>There was an error when loading this image.</strong>
        </div>
      </div>
    )
  }

  return (
    <div className="card-image">
      <figure className="image" style={{ cursor: "pointer" }}>
        <img ref={ref} alt={props.title} onClick={startPopup} />
      </figure>
    </div>
  )
}

export const ImagePostPreview: React.FC<ImagePostPreviewProps> = (props) => {
  const [vote] = usePostVoteMutation()
  const [remove] = useRemovePostMutation()
  const [{ user }] = useAppState()
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
      <div className="card-content">
        {props.bluedit && props.author && props.title && props.url && props.createdAt && (
          <>
            <p className="title">
              <Link to={props.url} className={`has-text-black`}>
                {props.title}
              </Link>
            </p>
            <p className="subtitle is-size-6">
              Posted on <Link to={`/b/${props.bluedit.name}`}>/b/{props.bluedit.name}</Link> by{" "}
              <Link to={`/u/${props.author.name}`}>/u/{props.author.name}</Link>{" "}
              {formatDistance(new Date(props.createdAt), new Date())} ago
            </p>
          </>
        )}
      </div>
      {props.content && props.title ? (
        <CardImage content={props.content} title={props.title} />
      ) : (
        <div className="is-flex is-justify-content-center is-align-items-center my-4">
          <button className="button is-white is-large is-loading"></button>
        </div>
      )}
      <footer className="card-footer">
        <div className="card-footer-item">
          <UpVoteButtons
            voteCount={props.voteCount}
            userVote={props.userVote}
            targetId={props.id}
            vote={(up) => vote({ variables: { postId: props.id, up } })}
          />
        </div>
        <div className="card-footer-item">
          <CommentButton commentCount={props.commentCount} url={props.url} />
        </div>
        <div className="card-footer-item">
          <ShareButton url={props.url} />
        </div>
        {user?.id === props.author?.id && props.isFullPage && (
          <div className="card-footer-item">
            <button className="button is-white is-medium" title="Delete post" onClick={startPopup}>
              <span className="icon">
                <ion-icon name="trash-outline" />
              </span>
            </button>
          </div>
        )}
      </footer>
    </div>
  )
}
