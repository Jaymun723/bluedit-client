import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { CreatorRoot } from "../components/Creator/CreatorRoot"

interface DevPageProps {}

const DevPage: React.FC<DevPageProps> = (props) => {
  return (
    <BaseLayout>
      <CreatorRoot />
    </BaseLayout>
  )
}

export default DevPage
