import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { useAllUsersQuery } from "../generated/graphql"
import { UserPreview } from "../components/UserPreview"
import { RouteComponentProps } from "@reach/router"

const User: React.FC<RouteComponentProps> = (props) => {
  const { data, error } = useAllUsersQuery({ fetchPolicy: "cache-and-network" })

  if (error) {
    console.log(error)
  }

  return (
    <BaseLayout title="List of Bluedit users">
      {data?.users.map((u) => (
        <UserPreview id={u.id} key={u.id} />
      ))}
    </BaseLayout>
  )
}

export default User
