import React from "react"
import { useParams } from "react-router-dom"
import { BaseLayout } from "../components/BaseLayout"
import { CommentFeed } from "../components/Comment/CommentFeed"
import { PostPreview } from "../components/Post/PostPreview"

const PostPage: React.FC = (props) => {
  const { id } = useParams()

  return (
    <BaseLayout>
      <PostPreview id={id} isFullPage />
      <CommentFeed postId={id} />
    </BaseLayout>
  )
}

export default PostPage
