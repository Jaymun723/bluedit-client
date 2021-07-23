import React from "react"

import { BaseLayout } from "../components/BaseLayout"
import { NavBar } from "../components/Navbar"
import {
  AppNotificationsProvider,
  AppNotificationsRenderer,
  AppNotificationType,
  useAppNotifications,
} from "../components/Notifications"
import { PostPreview } from "../components/Post"
import { Feed, useFeedState, FeedProps } from "../components/Feed"
import { MainFeedDocument, SortType } from "../generated/graphql"

interface DevPageProps {}

const DevPage: React.FC<DevPageProps> = (props) => {
  const [_, dispatch] = useFeedState()

  return (
    <BaseLayout>
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
        baseVariables={{
          sort: SortType.New,
        }}
      />
    </BaseLayout>
  )
}

export default DevPage
