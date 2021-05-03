import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { UserPreview } from "../components/User/UserPreview"
import { UserPostsFeed } from "../components/User/UserPostsFeed"
import { useParams } from "react-router"

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
