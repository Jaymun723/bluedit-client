import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { usePostVoteMutation } from "../../generated/graphql"
import { c } from "../../utils"
import { useAppState } from "../AppState"

interface UpVoteButtonsProps {
  userVote?: { up: boolean } | null
  targetId?: string
  vote?: (up: boolean) => Promise<any>
  voteCount?: number
  disabled?: boolean
  small?: boolean
}

export const UpVoteButtons: React.FC<UpVoteButtonsProps> = (props) => {
  const [{ user }] = useAppState()
  const [loading, setLoading] = useState(false)

  if (typeof props.voteCount !== "number") {
    return <button className={c("button", "is-text", !props.small && "is-medium", "is-loading")} />
  }

  const createVoteFunction = (up: boolean) => () => {
    // if (((!props.userVote && user) || typeof props.userVote === "object") && props.vote) {
    if (user && props.vote && !props.disabled) {
      setLoading(true)
      props.vote(up).finally(() => {
        setLoading(false)
      })
    }
  }

  return (
    <>
      <button
        // className={`button is-text is-medium${props.userVote?.up ? " has-text-primary" : ""}`}
        className={c(
          "button",
          "is-text",
          !props.small && "is-medium",
          props.userVote?.up && "has-text-primary"
        )}
        onClick={createVoteFunction(true)}
        title="Up Vote"
        disabled={loading || props.disabled}
      >
        <span className="icon is-large">
          <ion-icon name="arrow-up-outline"></ion-icon>
        </span>
      </button>
      {loading ? (
        <button className="button is-text is-loading is-small"></button>
      ) : (
        <p>{props.voteCount}</p>
      )}
      <button
        // className={`button is-text is-medium${
        //   props.userVote && props.userVote.up === false ? " has-text-danger" : ""
        // }`}
        className={c(
          "button",
          "is-text",
          !props.small && "is-medium",
          props.userVote?.up === false && "has-text-danger"
        )}
        onClick={createVoteFunction(false)}
        title="Down Vote"
        disabled={loading || props.disabled}
      >
        <span className="icon is-large">
          <ion-icon name="arrow-down-outline"></ion-icon>
        </span>
      </button>
    </>
  )
}
