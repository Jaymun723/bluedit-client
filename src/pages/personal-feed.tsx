import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { PersonalFeedDocument, SortType } from "../generated/graphql"
import { useAppState } from "../components/AppState"
import { BaseLayout } from "../components/BaseLayout"
import { Feed, useFeedState } from "../components/Feed"
import { PostPreview } from "../components/Post"
import { SortTabs } from "../components/Feed/SortTabs"
import { DEFAULT_SORT_TYPE } from "../utils"

const PersonalFeed: React.FC = () => {
  const [{ user }] = useAppState()
  const navigate = useNavigate()
  const [_, dispatch] = useFeedState()

  useEffect(() => {
    if (!user) {
      navigate("/log-in", { replace: true })
    }
  }, [user])

  return (
    <BaseLayout title="Personal Feed">
      <SortTabs />
      <Feed
        query={PersonalFeedDocument}
        getElements={(data) => data.personalFeed}
        baseVariables={{ sort: DEFAULT_SORT_TYPE }}
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

export default PersonalFeed
