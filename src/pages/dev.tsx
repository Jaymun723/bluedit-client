import React from "react"

import { BaseLayout } from "../components/BaseLayout"
import { AccountSettings } from "../components/Settings"

interface DevPageProps {}

const DevPage: React.FC<DevPageProps> = (props) => {
  return (
    <BaseLayout>
      <AccountSettings />
    </BaseLayout>
  )
}

export default DevPage
