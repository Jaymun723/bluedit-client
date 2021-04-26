import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { RouteComponentProps } from "@reach/router"
import { BlueditFeed } from "../components/Bluedit"

const BlueditList: React.FC<RouteComponentProps> = () => {
  return (
    <BaseLayout title="List of Bluedits">
      <BlueditFeed />
    </BaseLayout>
  )
}

export default BlueditList
