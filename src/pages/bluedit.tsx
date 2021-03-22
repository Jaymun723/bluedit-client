import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { RouteComponentProps, Redirect } from "@reach/router"
import { useBlueditFeedQuery } from "../generated/graphql"
import { useAppState } from "../components/AppState"
import { BlueditPreview } from "../components/BlueditPreview"
import { PostPreview } from "../components/PostPreview"
import { SortTabs } from "../components/SortTabs"

interface BlueditProps extends RouteComponentProps {
  name?: string
}
const Bluedit: React.FC<BlueditProps> = (props) => {
  const [{ sort }] = useAppState()
  const { data: postsData, error: postsError } = useBlueditFeedQuery({
    variables: { name: props.name!, sort },
    fetchPolicy: "cache-and-network",
  })

  if (postsError) {
    console.log(postsError)
    return <Redirect to="/b/" />
  }

  return (
    <BaseLayout>
      <BlueditPreview name={props.name!} inHead />
      <SortTabs />
      {postsData && postsData.blueditFeed.map((p) => <PostPreview id={p.id} key={p.id} />)}
    </BaseLayout>
  )
}

export default Bluedit
