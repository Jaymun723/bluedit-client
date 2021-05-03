import React from "react"
import { MainFeedDocument } from "../generated/graphql"
import { BaseLayout } from "../components/BaseLayout"
import { Feed } from "../components/Feed"

const Index: React.FC = () => {
  return (
    <BaseLayout>
      <Feed query={MainFeedDocument} getPosts={(data) => data.mainFeed} />
    </BaseLayout>
  )
}

export default Index
