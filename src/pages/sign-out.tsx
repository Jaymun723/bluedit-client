import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { logout } from "../apollo/auth"
import { useAppState } from "../components/AppState"

export const SignOut: React.FC = () => {
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
