import { Link } from "react-router-dom"
import React, { useEffect, useMemo, useState } from "react"
import { useMyBlueditsQuery } from "../../generated/graphql"
import { useCreatorState } from "./CreatorState"

export const BlueditSelector: React.FC = (props) => {
  const { error, data, loading } = useMyBlueditsQuery({ fetchPolicy: "cache-and-network" })
  const [state, dispatch] = useCreatorState()

  const bluedits = useMemo(
    () => (!data ? [] : data.me.bluedits.slice(0).sort((a, b) => a.name.localeCompare(b.name))),
    [data]
  )

  if (error) {
    console.log(error)
    return null
  }

  return (
    <div className="field">
      <label htmlFor="blueditSelector" className="label">
        On which bluedit do you want to post ?
      </label>
      <div className="control">
        {loading ? (
          <div className="select is-fullwidth is-loading">
            <select>
              <option>Loading...</option>
            </select>
          </div>
        ) : bluedits.length > 0 ? (
          <div className="select is-fullwidth">
            <select
              name="blueditSelector"
              value={state.blueditId || "DEFAULT"}
              // required
              onChange={(e) => {
                if (e.target.value !== "DEFAULT") {
                  dispatch({
                    type: "CHOOSE_BLUEDIT_ACTION",
                    blueditId: e.target.value,
                    blueditName: e.target.selectedOptions.item(0)?.textContent || "n00b",
                  })
                }
              }}
            >
              {[
                <option key="DEFAULT" value="DEFAULT">
                  Choose a Bluedit
                </option>,
              ].concat(
                bluedits.map((bluedit) => (
                  <option key={bluedit.id} value={bluedit.id}>
                    {bluedit.name}
                  </option>
                ))
              )}
            </select>
          </div>
        ) : (
          data && (
            <p className="is-size-5 has-text-danger">
              You haven't subscribed to any Bluedit ! Go to <Link to="/b">here</Link> to find
              Bluedit.
            </p>
          )
        )}
      </div>
    </div>
  )
}
