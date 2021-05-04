import React from "react"
import { useParams } from "react-router-dom"

import { BaseLayout } from "../components/BaseLayout"
import { BlueditPreview } from "../components/Bluedit/"
import { Feed } from "../components/Feed"
import { BlueditFeedDocument } from "../generated/graphql"

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
