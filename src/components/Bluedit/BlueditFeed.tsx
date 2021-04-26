import React, { useEffect, useState } from "react"
import { AllBlueditsQuery, useAllBlueditsQuery } from "../../generated/graphql"
import { c } from "../../utils"
import { LOAD_BATCH_SIZE } from "../../utils"
import { BlueditPreview } from "./BlueditPreview"

interface BlueditFeedProps {}

export const BlueditFeed: React.FC<BlueditFeedProps> = (props) => {
  const { data, loading, error, fetchMore } = useAllBlueditsQuery({
    variables: {
      pagination: {
        take: LOAD_BATCH_SIZE,
        skip: 0,
      },
    },
  })
  const [skip, setSkip] = useState(0)
  const [fetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (skip !== 0) {
      fetchMore({
        variables: {
          pagination: {
            take: LOAD_BATCH_SIZE,
            skip,
          },
        },
      }).then(() => setIsFetching(false))
    }
  }, [skip])

  if (loading) {
    return (
      <div className="is-flex is-justify-content-center">
        <button className="button is-white is-large is-loading" />
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1ps solid red" }}>{JSON.stringify(error)}</div>
    } else {
      return null
    }
  }

  return (
    <div className="container is-flex is-flex-direction-column is-align-items-center">
      {data.bluedits.map((bluedit) => (
        <BlueditPreview id={bluedit.id} key={bluedit.id} />
      ))}
      <button
        className={c("button", "is-primary", "is-medium", fetching && "is-loading")}
        onClick={() => {
          setSkip(skip + LOAD_BATCH_SIZE)
          setIsFetching(true)
        }}
      >
        Fetch More !
      </button>
    </div>
  )
}
