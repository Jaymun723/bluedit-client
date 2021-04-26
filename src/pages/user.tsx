import React from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { BaseLayout } from "../components/BaseLayout"
import { UserPreview } from "../components/User/UserPreview"
import { UserPostsFeed } from "../components/User/UserPostsFeed"

interface UserProps extends RouteComponentProps {
  name?: string
}
const User: React.FC<UserProps> = (props) => {
  return (
    <BaseLayout>
      <UserPreview name={props.name!} />
      <p className="title">His posts:</p>
      <UserPostsFeed userName={props.name!} />
    </BaseLayout>
  )
}

export default User
