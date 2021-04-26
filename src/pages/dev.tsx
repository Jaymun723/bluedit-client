import { RouteComponentProps } from "@reach/router"
import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { CreatorRoot } from "../components/Creator/CreatorRoot"

interface DevPageProps extends RouteComponentProps {}

const DevPage: React.FC<DevPageProps> = (props) => {
  return (
    <BaseLayout>
      <CreatorRoot />
    </BaseLayout>
  )
}

export default DevPage
