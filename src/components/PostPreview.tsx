import React from "react"
import { Link, useLocation, useNavigate } from "@reach/router"
import { ContentType, usePostPreviewQuery, usePostVoteMutation, useRemovePostMutation } from "../generated/graphql"
import { formatDistance } from "date-fns"
import { LinkPreview } from "./LinkPreview"
import { hideLink } from "./utils"
import { useAppState } from "./AppState"
import { Helmet } from "react-helmet"

interface UpVoteButtonsProps {
  userVote: { up: boolean } | undefined | null
  voteCount: number
  vote: (up: boolean) => void
}
export const UpVoteButtons: React.FC<UpVoteButtonsProps> = (props) => {
  return (
    <>
      <button
        className={`button is-white is-medium${props.userVote?.up ? " has-text-primary" : ""}`}
        onClick={() => props.vote(true)}
        title="Up Vote"
      >
        <span className="icon is-large">
          <ion-icon name="arrow-up-outline"></ion-icon>
        </span>
      </button>
      <p>{props.voteCount}</p>
      <button
        className={`button is-white is-medium${
          props.userVote && props.userVote.up === false ? " has-text-danger" : ""
        }`}
        onClick={() => props.vote(false)}
        title="Down Vote"
      >
        <span className="icon is-large">
          <ion-icon name="arrow-down-outline"></ion-icon>
        </span>
      </button>
    </>
  )
}

interface PostPreviewProps {
  id: string
  inHead?: boolean
}
export const PostPreview: React.FC<PostPreviewProps> = (props) => {
  const [{ user }] = useAppState()
  const location = useLocation()
  const navigate = useNavigate()
  const postPath = `/p/${props.id}`
  const { data, error } = usePostPreviewQuery({ variables: { id: props.id } })
  const [mutate] = usePostVoteMutation()
  const [removePost] = useRemovePostMutation({ variables: { id: props.id } })

  if (error) {
    console.log(error)
    return null
  }

  let Content: React.ComponentType

  if (!data) {
    Content = () => (
      <div className="card-image">
        <figure className="image is-4by3" />
      </div>
    )
  } else if (data.post.contentType === ContentType.Image) {
    Content = () => (
      <div className="card-image">
        {props.inHead && (
          <Helmet>
            <title>
              "{data.post.title}" by {data.post.author.name} | Bluedit
            </title>
            <meta property="og:title" content={`"${data.post.title}" by ${data.post.author.name} | Bluedit`} />
            <meta
              property="og:description"
              content={`Image posted by ${data.post.author.name} on /b/${data.post.bluedit.name}.`}
            />
            <meta property="og:image" content={data.post.content} />
          </Helmet>
        )}
        <a href={data.post.content}>
          <figure className="image is-4by3">
            <img src={data.post.content} alt={data.post.title} />
          </figure>
        </a>
      </div>
    )
  } else if (data.post.contentType === ContentType.Link) {
    Content = () => (
      <LinkPreview
        content={data.post.content}
        inHead={props.inHead}
        authorName={data.post.author.name}
        blueditName={data.post.bluedit.name}
      />
    )
  } else {
    const headDescription = data.post.content.length > 30 ? `${data.post.content.slice(0, 30)}...` : data.post.content
    Content = () => (
      <div className="card-content">
        {props.inHead && (
          <Helmet>
            <title>
              "{data.post.title}" by {data.post.author.name} | Bluedit
            </title>
            <meta property="og:title" content={`"${data.post.title}" by ${data.post.author.name} | Bluedit`} />
            <meta property="og:description" content={headDescription} />
          </Helmet>
        )}
        <div style={{ whiteSpace: "pre-line", fontSize: "1.25em" }}>{data.post.content}</div>
      </div>
    )
  }

  return (
    <div className="card my-2">
      <div className="card-content mb-2">
        <p className="title" style={{ cursor: "pointer" }}>
          <Link to={postPath} className={hideLink}>
            {data?.post.title || "Loading"}
          </Link>
        </p>
        {data && (
          <p className="subtitle">
            <Link to={`/b/${data.post.bluedit.name}`}>/b/{data.post.bluedit.name}</Link> - Posted by{" "}
            <Link to={`/u/${data.post.author.name}`}>{data.post.author.name}</Link>,{" "}
            {formatDistance(new Date(data.post.createdAt), new Date())} ago
          </p>
        )}
      </div>
      <Content />
      <footer className="card-footer">
        <div className="card-footer-item is-size-5">
          <UpVoteButtons
            userVote={data?.post.userVote}
            voteCount={data?.post.voteCount || 0}
            vote={(up) => mutate({ variables: { postId: props.id, up } })}
          />
        </div>
        <div className="card-footer-item is-size-5">
          <Link className="button is-white is-medium" to={postPath} title="Comment">
            <span className="icon">
              <ion-icon name="chatbubble-outline"></ion-icon>
            </span>
          </Link>
          <p>{data?.post.commentCount}</p>
        </div>
        <div className="card-footer-item is-size-5">
          <button className="button is-white is-medium" title="Share">
            <span className="icon">
              <ion-icon name="share-social-outline"></ion-icon>
            </span>
          </button>
        </div>
        {user?.id === data?.post.author.id && postPath === location.pathname && (
          <div className="card-footer-item is-size-5">
            <button
              className="button is-white is-medium"
              title="Delete"
              onClick={() => {
                removePost().then(() => {
                  navigate("/")
                })
              }}
            >
              <span className="icon">
                <ion-icon name="trash-outline"></ion-icon>
              </span>
            </button>
          </div>
        )}
      </footer>
    </div>
  )
}
