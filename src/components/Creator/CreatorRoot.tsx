import React from "react"
import { CreatorStateProvider } from "./CreatorState"

interface CreatorRootProps {}

const CreatorRootMain: React.FC<CreatorRootProps> = (props) => {
  return (
    <div className="box">
      <p className="title">Create a new post</p>
    </div>
  )
}

export const CreatorRoot: React.FC<CreatorRootProps> = (props) => (
  <CreatorStateProvider>
    <CreatorRootMain {...props} />
  </CreatorStateProvider>
)
