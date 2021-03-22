import React from "react"
import { BaseLayout } from "../components/BaseLayout"
import { useAllBlueditsQuery } from "../generated/graphql"
import { BlueditPreview } from "../components/BlueditPreview"
import { RouteComponentProps } from "@reach/router"

const BlueditList: React.FC<RouteComponentProps> = () => {
  const { data, error } = useAllBlueditsQuery({ fetchPolicy: "cache-and-network" })

  if (error) {
    console.log(error)
    return null
  }

  return (
    <BaseLayout title="List of Bluedits">
      {data && data.bluedits.map((bluedit) => <BlueditPreview id={bluedit.id} key={bluedit.id} />)}
    </BaseLayout>
  )
}

export default BlueditList
