import React from "react"

import { BaseLayout } from "../components/BaseLayout"
import { NavBar } from "../components/Navbar"
import {
  AppNotificationsProvider,
  AppNotificationsRenderer,
  AppNotificationType,
  useAppNotifications,
} from "../components/Notifications"

interface DevPageProps {}

const PushButton = () => {
  const { pushNotification } = useAppNotifications()

  return (
    <button
      className="button is-primary"
      onClick={() => {
        console.log("hoy")
        pushNotification({ text: "test", type: AppNotificationType.DANGER })
      }}
    >
      Push notifications
    </button>
  )
}

const DevPage: React.FC<DevPageProps> = (props) => {
  return (
    <AppNotificationsProvider>
      <AppNotificationsRenderer />
      <NavBar></NavBar>
      <section className="section">
        <div className="container">
          <PushButton />
        </div>
      </section>
    </AppNotificationsProvider>
  )
}

export default DevPage
