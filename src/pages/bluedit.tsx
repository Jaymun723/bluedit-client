import React from "react"
import { useParams } from "react-router-dom"
import { BaseLayout } from "../components/BaseLayout"
import { BlueditPreview } from "../components/Bluedit/BlueditPreview"
import { Feed } from "../components/Feed"
import { BlueditFeedDocument } from "../generated/graphql"

// const Bluedit: React.FC<BlueditProps> = (props) => {
//   const [{ sort }] = useAppState()
//   const { data: postsData, error: postsError } = useBlueditFeedQuery({
//     variables: { name: props.name!, sort },
//     fetchPolicy: "cache-and-network",
//   })

//   if (postsError) {
//     console.log(postsError)
//     return <Redirect to="/b/" />
//   }

//   return (
//     <BaseLayout>
//       <BlueditPreview name={props.name!} inHead />
//       <SortTabs />
//       {postsData && postsData.blueditFeed.map((p) => <PostPreview id={p.id} key={p.id} />)}
//     </BaseLayout>
//   )
// }

const BlueditPage: React.FC = (props) => {
  const { name } = useParams()

  return (
    <BaseLayout>
      <BlueditPreview name={name} isWide />
      <Feed
        query={BlueditFeedDocument}
        getPosts={(data) => data.blueditFeed}
        queryVariables={{ name: name }}
      />
    </BaseLayout>
  )
}

export default BlueditPage
