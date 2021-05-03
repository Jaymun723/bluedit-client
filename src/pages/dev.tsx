import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { CreatorRoot } from "../components/Creator/CreatorRoot"
import { PageLoader } from "../components/PageLoader"

interface DevPageProps {}

const DevPage: React.FC<DevPageProps> = (props) => {
  return (
    // <BaseLayout>
    //   <CreatorRoot />
    // </BaseLayout>
    <PageLoader />
  )
}

export default DevPage
