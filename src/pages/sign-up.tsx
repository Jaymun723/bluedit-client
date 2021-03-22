import React, { useState, useEffect } from "react"
import { ConnectionForm, Field, SubmitButton } from "../components/ConnectionForm"
import { useAppState } from "../components/AppState"
import { useNavigate, RouteComponentProps } from "@reach/router"
import { useCreateAccountMutation } from "../generated/graphql"
import { login } from "../apollo/auth"
import { Helmet } from "react-helmet"

const SignUp: React.FC<RouteComponentProps> = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [{ user }, dispatch] = useAppState()
  const navigate = useNavigate()

  const [mutate, { error, data }] = useCreateAccountMutation({
    variables: { name, email, password },
  })

  useEffect(() => {
    if (data) {
      login(data.createAccount.token, data.createAccount.user)
      dispatch({ type: "SET_USER", user: data.createAccount.user })
    }
  }, [data])

  useEffect(() => {
    if (user && !data) {
      navigate("/account-settings", { replace: true })
    } else if (user && data) {
      navigate("/", { replace: true })
    }
  }, [user])

  return (
    <ConnectionForm error={error}>
      <Helmet>
        <title>Sign Up | Bluedit</title>
        <meta property="og:title" content="Sign Up  | Bluedit" />
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
          iconName="text-outline"
          name="name"
          onChange={setName}
          value={name}
          placeholder="John"
          type="text"
          required
        />
        <Field
          iconName="mail-outline"
          name="email"
          onChange={setEmail}
          value={email}
          placeholder="john@mail.com"
          type="email"
          required
        />
        <Field
          iconName="key-outline"
          name="password"
          onChange={setPassword}
          value={password}
          placeholder="1L0v3Co0ki3s"
          type="password"
          required
        />
        <SubmitButton />
      </form>
    </ConnectionForm>
  )
}

export default SignUp
