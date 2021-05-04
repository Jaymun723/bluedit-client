import React, { createContext, useContext, useReducer, Reducer, Dispatch } from "react"

import { SortType } from "../generated/graphql"
import { getUser } from "../apollo/auth"

interface AppState {
  sort: SortType
  user?: { id: string; name: string }
}

export const initialState: AppState = {
  sort: SortType.Trending,
  user: getUser(),
}

interface ChangeSortAction {
  type: "CHANGE_SORT"
  sort: SortType
}

interface SetUserAction {
  type: "SET_USER"
  user: { id: string; name: string }
}

interface RemoveUserAction {
  type: "REMOVE_USER"
}

type Action = ChangeSortAction | SetUserAction | RemoveUserAction

const appReducer: Reducer<AppState, Action> = (prevState, action) => {
  switch (action.type) {
    case "CHANGE_SORT":
      return {
        ...prevState,
        sort: action.sort,
      }
    case "SET_USER":
      return {
        ...prevState,
        user: action.user,
      }
    case "REMOVE_USER":
      return {
        ...prevState,
        user: undefined,
      }
    default:
      return prevState
  }
}

export const StateContext = createContext([initialState, () => {}] as [AppState, Dispatch<Action>])

export const AppStateProvider: React.FC = ({ children }) => (
  <StateContext.Provider value={useReducer(appReducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useAppState = () => useContext(StateContext)
