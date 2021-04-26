import React, { useEffect, useState } from "react"
import { ContentType, usePostPreviewQuery } from "../../generated/graphql"
import { BasePostPreview } from "../Post/BasePost"
import { ImagePostPreview } from "../Post/ImagePost"
import { TextPostPreview } from "../Post/TextPost"
import { WebsitePostPreview } from "../Post/WebsitePost"
import { useFeedState } from "./FeedState"

export const FeedPost: React.FC<{ id: string }> = (props) => {
  const { data, error } = usePostPreviewQuery({
    variables: { id: props.id },
  })
  const [, dispatch] = useFeedState()

  useEffect(() => {
    if (error) {
      console.error(error)
    }

    if (data || error) {
      dispatch({
        type: "SET_POST_LOADED_ACTION",
        id: props.id,
      })
    }
  }, [data, error])

  if (error) {
    console.error(error)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1px solid red" }}>{JSON.stringify(error)}</div>
    } else {
      return null
    }
  }

  if (data) {
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
      />
    )
  } else {
    return <BasePostPreview id={props.id} />
  }
}
