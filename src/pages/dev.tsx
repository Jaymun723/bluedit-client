import { RouteComponentProps } from "@reach/router"
import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { SortTabs } from "../components/SortTabs"
import { css } from "linaria"
import { Link } from "@reach/router"
import { UpVoteButtons } from "../components/UpVoteButtons"
import { TextPostPreview } from "../components/Post/TextPost"

const TestdevPage: React.FC<RouteComponentProps> = () => {
  return (
    <BaseLayout>
      <SortTabs />
      <div className="container is-max-desktop is-flex is-flex-direction-column">
        <TextPostPreview />
        <TextPostPreview
          title="My first post !"
          url="/p/test"
          content="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit eius porro qui dolor expedita architecto, sint corrupti non, cupiditate maxime animi velit eos asperiores placeat mollitia eveniet, cum tempora pariatur."
          voteCount={5}
          author={{ name: "Jaymun723" }}
          bluedit={{ name: "Memes" }}
          createdAt="2021-03-21T10:34:15.918Z"
        />
      </div>
    </BaseLayout>
  )
}

export default TestdevPage
