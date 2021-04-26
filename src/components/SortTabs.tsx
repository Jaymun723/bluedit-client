import React from "react"
import { SortType } from "../generated/graphql"
import { c } from "../utils"
import { useAppState } from "./AppState"

export const SortTabs = () => {
  const [{ sort }, dispatch] = useAppState()
  const changeSort = (sort: SortType) => () =>
    dispatch({
      sort,
      type: "CHANGE_SORT",
    })

  return (
    <div className="tabs is-fullwidth">
      <ul>
        <li className={c(sort == SortType.Trending && "is-active")}>
          <a onClick={changeSort(SortType.Trending)}>
            <span className="icon is-small">
              <ion-icon name="flame-outline"></ion-icon>
            </span>
            <span>Trending</span>
          </a>
        </li>
        <li className={c(sort == SortType.New && "is-active")}>
          <a onClick={changeSort(SortType.New)}>
            <span className="icon is-small">
              <ion-icon name="trending-up-outline"></ion-icon>
            </span>
            <span>New</span>
          </a>
        </li>
        <li className={c(sort == SortType.Best && "is-active")}>
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
