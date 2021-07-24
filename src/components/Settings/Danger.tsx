import React, { useState } from "react"
import { c } from "../../utils"
import { ErrorDisplay, Field, SubmitButton } from "../ConnectionForm"
import { AppNotificationType, useAppNotifications } from "../Notifications"
import { BaseSettingsProps } from "./SettingsRoot"

export const DangerSettings: React.FC<BaseSettingsProps> = ({ loading, mutate, data, error }) => {
  const { pushNotification } = useAppNotifications()

  const [password, setPassword] = useState("")

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (data) {
            if (password) {
              mutate({
                variables: { password },
              })
            } else {
              pushNotification({
                baseOpacity: 0.7,
                text: "Nothing changed !",
                timing: 3000,
                type: AppNotificationType.WARNING,
              })
            }
          }
        }}
      >
        <h1 className="title">
          {data ? `${data.me.name}'s account critical settings` : "Loading..."}
        </h1>
        <ErrorDisplay error={error} />
        <Field
          iconName="key-outline"
          name="password"
          onChange={setPassword}
          value={password}
          placeholder="1L0v3Co0ki3s"
          type="password"
        />
        <SubmitButton loading={!data || loading}>Update password</SubmitButton>
      </form>
      <button
        className={c(
          "button",
          "is-fullwidth",
          "is-danger",
          "mt-3",
          (!data || loading) && "is-loading"
        )}
        onClick={() => {
          pushNotification({
            baseOpacity: 1,
            text:
              "For now if you want to delete your account please contact the admin: jaymun723@yahoo.com.",
            timing: 4000,
            type: AppNotificationType.INFO,
          })
        }}
      >
        Remove account
      </button>
    </>
  )
}
