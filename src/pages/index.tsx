import React from "react"

import { MainFeedDocument, SortType } from "../generated/graphql"
import { BaseLayout } from "../components/BaseLayout"
import { Feed } from "../components/Feed"
import { PostPreview } from "../components/Post"
import { useFeedState } from "../components/Feed/FeedState"
import { SortTabs } from "../components/Feed/SortTabs"
import { DEFAULT_SORT_TYPE } from "../utils"

const Index: React.FC = () => {
  const [_, dispatch] = useFeedState()

  return (
    <BaseLayout>
      <SortTabs />
      <Feed
        getElements={(data) => data.mainFeed}
        query={MainFeedDocument}
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
        baseVariables={{ sort: DEFAULT_SORT_TYPE }}
      />
    </BaseLayout>
  )
}

export default Index
