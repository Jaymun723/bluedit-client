import React, { useEffect } from "react"
import { SortTabs } from "../components/SortTabs"
import { usePersonalFeedQuery } from "../generated/graphql"
import { useAppState } from "../components/AppState"
import { PostPreview } from "../components/PostPreview"
import { useNavigate, RouteComponentProps } from "@reach/router"
import { BaseLayout } from "../components/BaseLayout"

const PersonalFeed: React.FC<RouteComponentProps> = () => {
  const [{ sort, user }] = useAppState()
  const { data, error } = usePersonalFeedQuery({ variables: { sort }, fetchPolicy: "cache-and-network" })
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate("/log-in", { replace: true })
    }
  }, [user])

  if (error) {
    console.log(error)
  }

  return (
    <BaseLayout title="Personal feed">
      <SortTabs />
      {data && data.personalFeed.map(({ id }) => <PostPreview id={id} key={id} />)}
    </BaseLayout>
  )
}

export default PersonalFeed
