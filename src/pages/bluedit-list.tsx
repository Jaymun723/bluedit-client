import React from "react"

import { BaseLayout } from "../components/BaseLayout"
import { BlueditFeed } from "../components/Bluedit"

const BlueditList: React.FC = () => {
  return (
    <BaseLayout title="List of Bluedits">
      <BlueditFeed />
    </BaseLayout>
  )
}

export default BlueditList
