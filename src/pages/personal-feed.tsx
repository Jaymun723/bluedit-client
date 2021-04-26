import React, { useEffect } from "react"
import { PersonalFeedDocument } from "../generated/graphql"
import { useAppState } from "../components/AppState"
import { RouteComponentProps, navigate } from "@reach/router"
import { BaseLayout } from "../components/BaseLayout"
import { Feed } from "../components/Feed"

const PersonalFeed: React.FC<RouteComponentProps> = () => {
  const [{ user }] = useAppState()

  useEffect(() => {
    if (!user) {
      navigate("/log-in", { replace: true })
    }
  }, [user])

  return (
    <BaseLayout title="Personal Feed">
      <Feed query={PersonalFeedDocument} getPosts={(data) => data.personalFeed} />
    </BaseLayout>
  )
}

export default PersonalFeed
