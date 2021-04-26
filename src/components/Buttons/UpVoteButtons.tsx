import { useMutation } from "@apollo/client"
import React, { useState } from "react"
import { usePostVoteMutation } from "../../generated/graphql"
import { useAppState } from "../AppState"

interface UpVoteButtonsProps {
  userVote?: { up: boolean } | null
  targetId: string
  vote: (up: boolean) => Promise<any>
  voteCount?: number
}

export const UpVoteButtons: React.FC<UpVoteButtonsProps> = (props) => {
  const [{ user }] = useAppState()
  const [loading, setLoading] = useState(false)

  if (typeof props.voteCount !== "number") {
    return <button className="button is-white is-medium is-loading"></button>
  }

  const createVoteFunction = (up: boolean) => () => {
    if ((!props.userVote && user) || typeof props.userVote === "object") {
      setLoading(true)
      props.vote(up).then(() => {
        setLoading(false)
      })
    }
  }

  return (
    <>
      <button
        className={`button is-white is-medium${props.userVote?.up ? " has-text-primary" : ""}`}
        onClick={createVoteFunction(true)}
        title="Up Vote"
        disabled={loading}
      >
        <span className="icon is-large">
          <ion-icon name="arrow-up-outline"></ion-icon>
        </span>
      </button>
      {loading ? (
        <button className="button is-white is-loading is-small"></button>
      ) : (
        <p>{props.voteCount}</p>
      )}
      <button
        className={`button is-white is-medium${
          props.userVote && props.userVote.up === false ? " has-text-danger" : ""
        }`}
        onClick={createVoteFunction(false)}
        title="Down Vote"
        disabled={loading}
      >
        <span className="icon is-large">
          <ion-icon name="arrow-down-outline"></ion-icon>
        </span>
      </button>
    </>
  )
}
