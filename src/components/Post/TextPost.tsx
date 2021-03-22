import React from "react"
import { css } from "linaria"
import { Link } from "@reach/router"
import { UpVoteButtons } from "../UpVoteButtons"
import { formatDistance } from "date-fns"

const getExcerpt = (content: string) => {
  const l = content.length

  if (l >= 300) {
    return {
      cut: true,
      excerpt: content.slice(0, 196).concat("... "),
    }
  } else {
    return {
      cut: false,
      excerpt: content,
    }
  }
}

const maxWidth = css`
  max-width: 600px;
  width: 100%;
`

// const excerpt = css`
//   max-height: 3.75rem;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
// `

interface PostPreviewProps {
  title?: string
  url?: string
  content?: string
  userVote?: { up: boolean } | null
  voteCount?: number
  bluedit?: { name: string }
  author?: { name: string }
  createdAt?: string
}

const TextContent: React.FC<{ content: string; url: string }> = (props) => {
  const excerpt = getExcerpt(props.content)

  if (excerpt.cut) {
    return (
      <div className="content is-medium">
        {excerpt.excerpt}
        <Link to={props.url}>Read</Link>
      </div>
    )
  } else {
    return <div className="content is-medium">{props.content}</div>
  }
}

export const TextPostPreview: React.FC<PostPreviewProps> = (props) => {
  return (
    <div className={`card ${maxWidth} is-align-self-center`}>
      <div className="card-content">
        {props.content && props.bluedit && props.author && props.title && props.url && props.createdAt ? (
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
            <TextContent content={props.content} url={props.url} />
          </>
        ) : (
          <div className="is-flex is-justify-content-center is-align-items-center my-4">
            <button className="button is-white is-large is-loading"></button>
          </div>
        )}
      </div>
      <footer className="card-footer">
        <div className="card-footer-item">
          <UpVoteButtons voteCount={props.voteCount} userVote={props.userVote} />
        </div>
      </footer>
    </div>
  )
}
