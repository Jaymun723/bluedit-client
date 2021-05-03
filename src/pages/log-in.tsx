import React, { useState, useEffect } from "react"
import { ConnectionForm, Field, SubmitButton } from "../components/ConnectionForm"
import { useLoginMutation } from "../generated/graphql"
import { login } from "../apollo/auth"
import { useAppState } from "../components/AppState"
import { Helmet } from "react-helmet"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [{ user }, dispatch] = useAppState()
  const navigate = useNavigate()

  const [mutate, { error, data }] = useLoginMutation({
    variables: {
      email,
      password,
    },
  })

  useEffect(() => {
    if (data) {
      login(data.login.token, data.login.user)
      dispatch({ type: "SET_USER", user: data.login.user })
    }
  }, [data])

  useEffect(() => {
    if (user && !data) {
      navigate("/account-settings", { replace: true })
    } else if (user && data) {
      navigate("/", {
        replace: true,
      })
    }
  }, [user])

  return (
    <ConnectionForm error={error} login>
      <Helmet>
        <title>Log In | Bluedit</title>
        <meta property="og:title" content="Log In | Bluedit" />
        <meta
          property="og:description"
          content="Bluedit a clone the famous reddit website, built more for the challenge than the fame."
        />
      </Helmet>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutate()
        }}
      >
        <Field
          iconName="mail-outline"
          name="email"
          type="email"
          placeholder="john@mail.com"
          value={email}
          onChange={setEmail}
          required
        />
        <Field
          iconName="key-outline"
          name="password"
          type="password"
          placeholder="1L0v3Co0ki3s"
          value={password}
          onChange={setPassword}
          required
        />
        <SubmitButton />
      </form>
    </ConnectionForm>
  )
}

export default Login
