import React from "react"
import { useParams } from "react-router"

import { BaseLayout } from "../components/BaseLayout"
import { Feed, useFeedState } from "../components/Feed"
import { PostPreview } from "../components/Post"
import { UserPreview, UserPostsFeed } from "../components/User"
import { UserPostsDocument } from "../generated/graphql"

const User: React.FC = (props) => {
  const { name } = useParams()
  const [_, dispatch] = useFeedState()

  return (
    <BaseLayout>
      <UserPreview name={name} />
      <p className="title">His posts:</p>
      <Feed
        query={UserPostsDocument}
        getElements={(data) => data.user.posts}
        baseVariables={{ name }}
        renderElement={(id) => (
          <PostPreview
            id={id}
            onLoaded={() => dispatch({ type: "SET_ELEMENT_LOADED_ACTION", id })}
          />
        )}
      />
    </BaseLayout>
  )
}

export default User
