import React, { createContext, Dispatch, Reducer, useContext, useReducer } from "react"

import { SortType } from "../../generated/graphql"
import { LOAD_BATCH_SIZE } from "../../utils"

interface FeedState {
  elements: { id: string; loaded: boolean }[]
  skipIndex: number
  isFetching: boolean
  variables?: any
}

const initialState: FeedState = {
  elements: [],
  skipIndex: 0,
  isFetching: false,
}

interface SetBaseVariablesAction {
  type: "SET_BASE_VARIABLES_ACTION"
  variables: any
}

interface AddElementAction {
  type: "ADD_ELEMENTS_ACTION"
  elements: {
    id: string
  }[]
}

interface SetElementLoadedAction {
  type: "SET_ELEMENT_LOADED_ACTION"
  id: string
}

interface FetchMoreAction {
  type: "FETCH_MORE_ACTION"
}

type FeedActions =
  | AddElementAction
  | SetElementLoadedAction
  | FetchMoreAction
  | SetBaseVariablesAction

const feedReducer: Reducer<FeedState, FeedActions> = (prevState, action) => {
  switch (action.type) {
    case "ADD_ELEMENTS_ACTION":
      return {
        ...prevState,
        elements: [
          ...prevState.elements,
          ...action.elements.map(({ id }) => ({ id, loaded: false })),
        ],
        isFetching: false,
      }
    case "FETCH_MORE_ACTION":
      return {
        ...prevState,
        isFetching: true,
        skipIndex: prevState.skipIndex + LOAD_BATCH_SIZE,
      }
    case "SET_BASE_VARIABLES_ACTION":
      return {
        ...prevState,
        isFetching: true,
        skipIndex: 0,
        elements: [],
        variables: action.variables,
      }
    case "SET_ELEMENT_LOADED_ACTION":
      return {
        ...prevState,
        elements: prevState.elements.map((element) => ({
          ...element,
          loaded: element.id === action.id ? true : element.loaded,
        })),
      }
    default:
      return prevState
  }
}

const FeedContext = createContext([initialState, () => {}] as [FeedState, Dispatch<FeedActions>])

export const FeedStateProvider: React.FC = ({ children }) => (
  <FeedContext.Provider value={useReducer(feedReducer, initialState)}>
    {children}
  </FeedContext.Provider>
)

export const useFeedState = () => useContext(FeedContext)
