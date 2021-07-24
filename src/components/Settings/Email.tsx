import React, { useEffect, useState } from "react"
import { ErrorDisplay, Field, SubmitButton } from "../ConnectionForm"
import { AppNotificationType, useAppNotifications } from "../Notifications"
import { BaseSettingsProps } from "./SettingsRoot"

export const EmailSettings: React.FC<BaseSettingsProps> = ({ loading, mutate, data, error }) => {
  const { pushNotification } = useAppNotifications()

  const [email, setEmail] = useState("")
  const [emailOnComment, setEmailOnComment] = useState(true)

  useEffect(() => {
    if (data) {
      setEmail(data.me.email)
      setEmailOnComment(data.me.emailOnComment)
    }
  }, [data])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (data) {
          let variables: any = {}
          if (data.me.email !== email) {
            variables.email = email
          }
          if (data.me.emailOnComment !== emailOnComment) {
            variables.emailOnComment = emailOnComment
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
      <h1 className="title">{data ? `${data.me.name}'s account email settings` : "Loading..."}</h1>
      <ErrorDisplay error={error} />
      <Field
        iconName="mail-outline"
        name="email"
        onChange={setEmail}
        value={email}
        placeholder={data?.me.email || ""}
        type="email"
        loading={!data || loading}
      />
      <div className="field">
        <input
          type="checkbox"
          id="emailOnComment"
          name="emailOnComment"
          className="switch is-rounded is-primary is-medium"
          checked={emailOnComment}
          onChange={(e) => {
            setEmailOnComment(e.target.checked)
          }}
          disabled={!data || loading}
        />
        <label htmlFor="emailOnComment">
          Receive an email when someone comments on your posts / comments
        </label>
      </div>
      <SubmitButton loading={!data || loading}>Update</SubmitButton>
    </form>
  )
}
