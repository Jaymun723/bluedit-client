import React from "react"
import { useParams } from "react-router"

import { BaseLayout } from "../components/BaseLayout"
import { UserPreview, UserPostsFeed } from "../components/User"

const User: React.FC = (props) => {
  const { name } = useParams()

  return (
    <BaseLayout>
      <UserPreview name={name} />
      <p className="title">His posts:</p>
      <UserPostsFeed userName={name} />
    </BaseLayout>
  )
}

export default User
