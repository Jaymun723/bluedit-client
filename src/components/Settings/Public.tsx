import React, { useEffect, useState } from "react"
import { c } from "../../utils"
import { ErrorDisplay, Field, SubmitButton } from "../ConnectionForm"
import { AppNotificationType, useAppNotifications } from "../Notifications"
import { BaseSettingsProps } from "./SettingsRoot"

export const PublicSettings: React.FC<BaseSettingsProps> = ({ mutate, data, error, loading }) => {
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const { pushNotification } = useAppNotifications()

  useEffect(() => {
    if (data) {
      setName(data.me.name)
      setBio(data.me.bio)
    }
  }, [data])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (data) {
          let variables: any = {}
          if (data.me.name !== name) {
            variables.name = name
          }
          if (data.me.bio !== bio) {
            variables.bio = bio
          }
          if (JSON.stringify(variables) !== "{}") {
            mutate({ variables })
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
      <h1 className="title">{data ? `${data.me.name}'s account public settings` : "Loading..."}</h1>
      <ErrorDisplay error={error} />
      <Field
        iconName="text-outline"
        name="name"
        onChange={setName}
        value={name}
        placeholder={data?.me.name || ""}
        type="text"
        loading={!data || loading}
      />
      <div className="field">
        <label htmlFor="bio" className="label">
          Bio:
        </label>
        <div className={c("control", (!data || loading) && "is-loading")}>
          <textarea
            name="bio"
            className="textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={data?.me.bio || ""}
          />
        </div>
      </div>
      <SubmitButton loading={!data || loading}>Update</SubmitButton>
    </form>
  )
}
