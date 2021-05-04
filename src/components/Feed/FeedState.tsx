import React, { createContext, Dispatch, Reducer, useContext, useReducer } from "react"

import { SortType } from "../../generated/graphql"
import { LOAD_BATCH_SIZE } from "../../utils"

interface FeedState {
  posts: {
    id: string
    loaded: boolean
  }[]
  skipIndex: number
  sortType: SortType
  isFetching: boolean
}

const initialState: FeedState = {
  posts: [],
  skipIndex: 0,
  isFetching: true,
  sortType: SortType.Trending,
}

interface AddPostsAction {
  type: "ADD_POSTS_ACTION"
  posts: {
    id: string
  }[]
}

interface SetPostLoadedAction {
  type: "SET_POST_LOADED_ACTION"
  id: string
}

interface FetchMoreAction {
  type: "FETCH_MORE_ACTION"
}

interface SetSortTypeAction {
  type: "SET_SORT_TYPE_ACTION"
  sortType: SortType
}

type FeedActions = AddPostsAction | SetPostLoadedAction | FetchMoreAction | SetSortTypeAction

const feedReducer: Reducer<FeedState, FeedActions> = (prevState, action) => {
  switch (action.type) {
    case "ADD_POSTS_ACTION":
      return {
        ...prevState,
        posts: [...prevState.posts, ...action.posts.map(({ id }) => ({ id, loaded: false }))],
        isFetching: false,
      }
    case "FETCH_MORE_ACTION":
      return {
        ...prevState,
        isFetching: true,
        skipIndex: prevState.skipIndex + LOAD_BATCH_SIZE,
      }
    case "SET_POST_LOADED_ACTION":
      return {
        ...prevState,
        posts: prevState.posts.map((post) => ({
          ...post,
          loaded: post.id === action.id ? true : post.loaded,
        })),
      }
    case "SET_SORT_TYPE_ACTION":
      return action.sortType !== prevState.sortType
        ? {
            ...prevState,
            posts: [],
            isFetching: true,
            skipIndex: 0,
            sortType: action.sortType,
          }
        : prevState

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
