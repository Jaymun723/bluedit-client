import React, { useEffect } from "react"
import { logout } from "../apollo/auth"
import { useAppState } from "../components/AppState"
import { RouteComponentProps, useNavigate } from "@reach/router"

export const SignOut: React.FC<RouteComponentProps> = () => {
  const [state, dispatch] = useAppState()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    dispatch({ type: "REMOVE_USER" })

    if (!!state.user) {
      navigate("/")
    }
  }, [state])

  return null
}
