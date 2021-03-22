import React from "react"
import { RouteComponentProps, Redirect } from "@reach/router"
import { BaseLayout } from "../components/BaseLayout"
import { UserPreview } from "../components/UserPreview"
import { useUserPostsQuery } from "../generated/graphql"
import { PostPreview } from "../components/PostPreview"

interface UserProps extends RouteComponentProps {
  name?: string
}
const User: React.FC<UserProps> = (props) => {
  const { data, error } = useUserPostsQuery({ variables: { name: props.name! }, fetchPolicy: "cache-and-network" })

  if (error) {
    console.log(error)
    return <Redirect to="/u/" />
  }

  return (
    <BaseLayout>
      <UserPreview name={props.name!} inHead />
      {data && data.user.posts.map((p) => <PostPreview id={p.id} key={p.id} />)}
    </BaseLayout>
  )
}

export default User
