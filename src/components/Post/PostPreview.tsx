import React from "react"

import { ContentType, usePostPreviewQuery } from "../../generated/graphql"
import { BasePostPreview } from "./BasePost"
import { ImagePostPreview } from "./ImagePost"
import { TextPostPreview } from "./TextPost"
import { WebsitePostPreview } from "./WebsitePost"

interface PostPreviewProps {
  id: string
  isFullPage?: boolean
}

export const PostPreview: React.FC<PostPreviewProps> = (props) => {
  const { data, error, loading } = usePostPreviewQuery({
    variables: { id: props.id },
  })

  if (loading) {
    return <BasePostPreview id={props.id} isFullPage={props.isFullPage} />
  }

  if (error || !data) {
    console.error(error)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1px solid red" }}>{JSON.stringify(error)}</div>
    } else {
      return null
    }
  }

  let Component
  if (data.post.contentType === ContentType.Image) {
    Component = ImagePostPreview
  } else if (data.post.contentType === ContentType.Link) {
    Component = WebsitePostPreview
  } else {
    Component = TextPostPreview
  }

  return (
    <Component
      author={data.post.author}
      bluedit={{ name: data.post.bluedit.name }}
      commentCount={data.post.commentCount}
      content={data.post.content}
      createdAt={data.post.createdAt}
      title={data.post.title}
      url={`/p/${data.post.id}`}
      userVote={data.post.userVote}
      voteCount={data.post.voteCount}
      id={data.post.id}
      isFullPage={props.isFullPage}
    />
  )
}
