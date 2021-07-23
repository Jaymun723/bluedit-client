import React, { createContext, useContext, useEffect, useRef, useState } from "react"
import { c } from "../../utils"

export enum AppNotificationType {
  DANGER = "is-danger",
  WARNING = "is-warning",
  INFO = "is-info",
  SUCCESS = "is-success",
}

export interface AppNotification {
  id: string
  text: string
  type: AppNotificationType
  createdAt: number
  hovered: boolean
  timing: number
  baseOpacity: number
}

export type AppNotificationProps = Omit<AppNotification, "id" | "createdAt" | "hovered">

interface NotificationHolderProps {}

const removeOld = (n: AppNotification) => {
  const now = Date.now()
  return now - n.createdAt < n.timing || n.hovered
}

const AppNotificationsContext = createContext({
  pushNotification: (props: AppNotificationProps) => {},
  removeNotification: (id: string) => {},
  setHovering: (id: string, hovering: boolean) => {},
  notifications: [] as AppNotification[],
})

export const AppNotificationsProvider: React.FC<NotificationHolderProps> = (props) => {
  const [notifications, setNotifications] = useState([] as AppNotification[])
  const timerRef = useRef<number>()

  const pushNotification = (props: AppNotificationProps) => {
    const newNotification: AppNotification = {
      id: Math.random().toString(36).slice(2),
      createdAt: Date.now(),
      text: props.text,
      type: props.type,
      baseOpacity: props.baseOpacity,
      timing: props.timing,
      hovered: false,
    }
    setNotifications([...notifications.filter(removeOld), newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter(removeOld).filter((n) => n.id !== id))
  }

  const setHovering = (id: string, hovered: boolean) => {
    const newNotifications = notifications.filter(removeOld).map((n) => {
      if (n.id === id) {
        if (hovered === false) {
          return {
            ...n,
            createdAt: Date.now(),
            timing: 1000,
            hovered: false,
          }
        }
        return {
          ...n,
          hovered: true,
        }
      }
      return n
    })
    setNotifications(newNotifications)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setNotifications(notifications.filter(removeOld))
    }, 500) as any
    return () => clearInterval(timerRef.current)
  }, [notifications])

  useEffect(() => () => clearInterval(timerRef.current), [])

  return (
    <AppNotificationsContext.Provider
      value={{
        pushNotification,
        notifications,
        removeNotification,
        setHovering,
      }}
    >
      {props.children}
    </AppNotificationsContext.Provider>
  )
}

export const useAppNotifications = () => useContext(AppNotificationsContext)
