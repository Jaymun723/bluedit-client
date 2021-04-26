import { RouteComponentProps } from "@reach/router"
import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { CommentFeed } from "../components/Comment/CommentFeed"
import { FullPagePost } from "../components/Post/FullPagePost"

interface PostPageProps extends RouteComponentProps {
  id?: string
}

const PostPage: React.FC<PostPageProps> = (props) => {
  return (
    <BaseLayout>
      <FullPagePost id={props.id!} />
      <CommentFeed postId={props.id!} />
    </BaseLayout>
  )
}

export default PostPage
