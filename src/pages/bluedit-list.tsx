import React from "react"

import { BaseLayout } from "../components/BaseLayout"
import { BlueditFeed, BlueditPreview } from "../components/Bluedit"
import { Feed, useFeedState } from "../components/Feed"
import { AllBlueditsDocument } from "../generated/graphql"

const BlueditList: React.FC = () => {
  const [_, dispatch] = useFeedState()

  return (
    <BaseLayout title="List of Bluedits">
      {/* <BlueditFeed /> */}
      <Feed
        query={AllBlueditsDocument}
        getElements={(data) => data.bluedits}
        renderElement={(id) => (
          <BlueditPreview
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

export default BlueditList
