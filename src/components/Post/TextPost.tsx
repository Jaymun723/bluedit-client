import React from "react"
import { Link } from "@reach/router"
import { BasePostPreview, BasePostPreviewProps } from "./BasePost"

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

interface TextPostPreviewProps extends BasePostPreviewProps {
  content?: string
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

export const TextPostPreview: React.FC<TextPostPreviewProps> = (props) => {
  return (
    <BasePostPreview {...props}>
      {props.isFullPage ? (
        <div className="content is-medium">{props.content}</div>
      ) : (
        <TextContent content={props.content!} url={props.url!} />
      )}
    </BasePostPreview>
  )
}
