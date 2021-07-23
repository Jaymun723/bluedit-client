import React from "react"
import { useAppNotifications } from "./AppNotifications"
import "./AppNotificationsRenderer.scss"
import { c } from "../../utils"

export const AppNotificationsRenderer = () => {
  const { notifications, removeNotification, setHovering } = useAppNotifications()

  return (
    <div className="holder">
      <div className="container">
        {notifications.map((notif) => (
          <div
            className={c("notification", notif.type)}
            key={notif.id}
            onPointerEnter={() => setHovering(notif.id, true)}
            onPointerLeave={() => setHovering(notif.id, false)}
            style={{ opacity: notif.baseOpacity }}
          >
            <button className="delete" onClick={() => removeNotification(notif.id)} />
            {notif.text}
          </div>
        ))}
      </div>
    </div>
  )
}
