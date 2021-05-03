import React, { useEffect, useState } from "react"
import { ErrorDisplay, Field, SubmitButton } from "../components/ConnectionForm"
import { useUserSettingsQuery, useUpdateUserSettingsMutation } from "../generated/graphql"
import { useAppState } from "../components/AppState"
import { setUser } from "../apollo/auth"
import { BaseLayout } from "../components/BaseLayout"
import { useNavigate } from "react-router-dom"

const AccountSettings: React.FC = () => {
  const { data } = useUserSettingsQuery({ fetchPolicy: "cache-and-network" })
  const [{ user }, dispatch] = useAppState()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")

  const [mutate, { data: updateData, error: updateError }] = useUpdateUserSettingsMutation({
    variables: { bio, email, name, password },
  })

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true })
    }
  }, [user])

  useEffect(() => {
    if (updateData) {
      const user = {
        id: updateData.changeAccountSettings.id,
        name: updateData.changeAccountSettings.name,
      }
      setUser(user)
      dispatch({ type: "SET_USER", user })
      setName("")
      setEmail("")
      setBio("")
      setPassword("")
    }
  }, [updateData])

  return (
    <BaseLayout title={`Account Setting`}>
      <div className="box">
        {data ? (
          <>
            <h1 className="title">{data.me.name}'s account settings</h1>
            <ErrorDisplay error={updateError} />
            <form
              onSubmit={(e) => {
                e.preventDefault()
                mutate()
              }}
            >
              <Field
                iconName="text-outline"
                name="name"
                onChange={setName}
                value={name}
                placeholder={data.me.name}
                type="text"
              />
              <Field
                iconName="mail-outline"
                name="email"
                onChange={setEmail}
                value={email}
                placeholder={data.me.email}
                type="email"
              />
              <div className="field">
                <label htmlFor="bio" className="label">
                  Bio:
                </label>
                <div className="control">
                  <textarea
                    name="bio"
                    className="textarea"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder={data.me.bio}
                  />
                </div>
              </div>
              <Field
                iconName="key-outline"
                name="password"
                onChange={setPassword}
                value={password}
                placeholder="1L0v3Co0ki3s"
                type="password"
              />
              <SubmitButton />
            </form>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </BaseLayout>
  )
}

export default AccountSettings
