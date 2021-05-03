import React, { useEffect } from "react"
import { PersonalFeedDocument } from "../generated/graphql"
import { useAppState } from "../components/AppState"
import { BaseLayout } from "../components/BaseLayout"
import { Feed } from "../components/Feed"
import { useNavigate } from "react-router-dom"

const PersonalFeed: React.FC = () => {
  const [{ user }] = useAppState()
  const navigate = useNavigate()

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
