import React from "react"

interface UpVoteButtonsProps {
  userVote?: { up: boolean } | null
  vote?: (voteType: boolean) => void
  voteCount?: number
}

export const UpVoteButtons: React.FC<UpVoteButtonsProps> = (props) => {
  if (typeof props.voteCount !== "number") {
    return <button className="button is-white is-medium is-loading"></button>
  }

  const createVoteFunction = (up: boolean) => () => {
    if (props.vote) {
      props.vote(up)
    }
  }

  return (
    <>
      <button
        className={`button is-white is-medium${props.userVote?.up ? " has-text-primary" : ""}`}
        onClick={createVoteFunction(true)}
        title="Up Vote"
      >
        <span className="icon is-large">
          <ion-icon name="arrow-up-outline"></ion-icon>
        </span>
      </button>
      <p>{props.voteCount}</p>
      <button
        className={`button is-white is-medium${
          props.userVote && props.userVote.up === false ? " has-text-danger" : ""
        }`}
        onClick={createVoteFunction(false)}
        title="Down Vote"
      >
        <span className="icon is-large">
          <ion-icon name="arrow-down-outline"></ion-icon>
        </span>
      </button>
    </>
  )
}
