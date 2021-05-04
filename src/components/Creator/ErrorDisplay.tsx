import React from "react"

import { useCreatorState } from "./CreatorState"

export const graphqlErrorParser = () => {}

interface ErrorDisplayProps {}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = (props) => {
  const [state, dispatch] = useCreatorState()

  if (typeof state.error === "undefined") {
    return null
  }

  return (
    <div className="notification is-danger">
      <button
        className="delete"
        onClick={() =>
          dispatch({
            type: "CLOSE_ERROR_ACTION",
          })
        }
      />
      {state.error.message}
    </div>
  )
}
