import React from "react"
import { useParams } from "react-router-dom"

import { BaseLayout } from "../components/BaseLayout"
import { BlueditPreview } from "../components/Bluedit/"
import { Feed, useFeedState } from "../components/Feed"
import { SortTabs } from "../components/Feed/SortTabs"
import { PostPreview } from "../components/Post"
import { BlueditFeedDocument, SortType } from "../generated/graphql"
import { DEFAULT_SORT_TYPE } from "../utils"

const BlueditPage: React.FC = (props) => {
  const { name } = useParams()
  const [_, dispatch] = useFeedState()

  return (
    <BaseLayout>
      <BlueditPreview name={name} isWide />
      <SortTabs />
      <Feed
        query={BlueditFeedDocument}
        getElements={(data) => data.blueditFeed}
        baseVariables={{ name: name, sort: DEFAULT_SORT_TYPE }}
        renderElement={(id) => (
          <PostPreview
            id={id}
            onLoaded={() =>
              dispatch({
                type: "SET_ELEMENT_LOADED_ACTION",
                id,
              })
            }
          />
        )}
      />
    </BaseLayout>
  )
}

export default BlueditPage
