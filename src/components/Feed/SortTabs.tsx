import React, { useEffect } from "react"

import { SortType } from "../../generated/graphql"
import { c } from "../../utils"
import { useFeedState } from "./FeedState"

export const SortTabs = () => {
  const [state, dispatch] = useFeedState()

  const changeSort = (type: SortType) => () =>
    dispatch({
      type: "SET_BASE_VARIABLES_ACTION",
      variables: {
        sort: type,
      },
    })

  return (
    <div className="tabs is-fullwidth">
      <ul>
        <li className={c(state.variables?.sort === SortType.Trending && "is-active")}>
          <a onClick={changeSort(SortType.Trending)}>
            <span className="icon is-small">
              <ion-icon name="flame-outline"></ion-icon>
            </span>
            <span>Trending</span>
          </a>
        </li>
        <li className={c(state.variables?.sort === SortType.New && "is-active")}>
          <a onClick={changeSort(SortType.New)}>
            <span className="icon is-small">
              <ion-icon name="trending-up-outline"></ion-icon>
            </span>
            <span>New</span>
          </a>
        </li>
        <li className={c(state.variables?.sort === SortType.Best && "is-active")}>
          <a onClick={changeSort(SortType.Best)}>
            <span className="icon is-small">
              <ion-icon name="podium-outline"></ion-icon>
            </span>
            <span>Best</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
