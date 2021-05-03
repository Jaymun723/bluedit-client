import React from "react"
import { Link } from "react-router-dom"
import { BaseLayout } from "../components/BaseLayout"
import { CommentButton } from "../components/Buttons/CommentButton"
import { ShareButton } from "../components/Buttons/ShareButton"
import { UpVoteButtons } from "../components/Buttons/UpVoteButtons"
import { CommentFeed } from "../components/Comment"
import { CommentPreview } from "../components/Comment/CommentPreview"
import { CreatorRoot } from "../components/Creator/CreatorRoot"
import { PageLoader } from "../components/PageLoader"

interface DevPageProps {}
const DevPage: React.FC<DevPageProps> = (props) => {
  return (
    <BaseLayout>
      {/* <Comment author={{ name: "Jaymun723", id: "#" }} content="Hello !">
        <Comment author={{ name: "Jaymun723", id: "#" }} content="Hello #1">
          <Comment author={{ name: "Jaymun723", id: "#" }} content="Hello ~1" />
        </Comment>
        <Comment author={{ name: "Jaymun723", id: "#" }} content="Hello #2" />
      </Comment> */}
      <CommentFeed postId="4572ae92-7c85-418d-bd67-dcc3b0eb38e0" />
    </BaseLayout>
  )
}

export default DevPage
