import React from "react"
import { SortTabs } from "../components/SortTabs"
import { PostPreview } from "../components/PostPreview"
import { useAppState } from "../components/AppState"
import { useMainFeedQuery } from "../generated/graphql"
import { BaseLayout } from "../components/BaseLayout"
import { RouteComponentProps } from "@reach/router"

const Index: React.FC<RouteComponentProps> = () => {
  const [{ sort }] = useAppState()
  const { data, error } = useMainFeedQuery({ variables: { sort }, fetchPolicy: "cache-and-network" })

  if (error) {
    console.log(error)
  }

  return (
    <BaseLayout>
      <SortTabs />
      {data && data.mainFeed.map(({ id }) => <PostPreview id={id} key={id} />)}
    </BaseLayout>
  )
}

export default Index
