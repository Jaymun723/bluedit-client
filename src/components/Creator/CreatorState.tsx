import React, { createContext, Dispatch, Reducer, useContext, useReducer } from "react"
import { ContentType } from "../../generated/graphql"

interface CreatorState {
  contentType: ContentType
  title?: string
  blueditId?: string
  content?: string
  errorType?: ErrorType
}

const initialState: CreatorState = {
  contentType: ContentType.Image,
}

interface SetContentTypeAction {
  type: "SET_CONTENT_TYPE_ACTION"
  contentType: ContentType
}

interface SetTitleAction {
  type: "SET_TITLE_ACTION"
  title: string
}

interface ChooseBlueditAction {
  type: "CHOOSE_BLUEDIT_ACTION"
  blueditId: string
}

interface SetContentAction {
  type: "SET_CONTENT_ACTION"
  content: string
}

export enum ErrorType {
  NoBluedit,
  NoTitle,
  NoContent,
  TitleTooShort,
  TitleTooLong,
  ContentTooShort,
  ContentTooLong,
  TitleAlreadyUsed,
  BadContent,
  BadTitle,
  ServerError,
}

interface SetErrorTypeAction {
  type: "SET_ERROR_ACTION"
  errorType: ErrorType
}

interface CloseErrorAction {
  type: "CLOSE_ERROR_ACTION"
}

type CreatorActions =
  | SetContentTypeAction
  | SetTitleAction
  | ChooseBlueditAction
  | SetContentAction
  | SetErrorTypeAction
  | CloseErrorAction

const creatorReducer: Reducer<CreatorState, CreatorActions> = (prevState, action) => {
  if (action.type === "CHOOSE_BLUEDIT_ACTION") {
    return {
      ...prevState,
      blueditId: action.blueditId,
      ...(prevState.errorType === ErrorType.NoBluedit ? { errorType: undefined } : {}),
    }
  } else if (action.type === "CLOSE_ERROR_ACTION") {
    return {
      ...prevState,
      errorType: undefined,
    }
  } else if (action.type === "SET_CONTENT_ACTION" || action.type === "SET_CONTENT_TYPE_ACTION") {
    if (
      prevState.errorType &&
      prevState.errorType in
        [
          ErrorType.BadContent,
          ErrorType.ContentTooLong,
          ErrorType.ContentTooShort,
          ErrorType.NoContent,
        ]
    ) {
      prevState["errorType"] = undefined
    }
    return {
      ...prevState,
      content: action.type === "SET_CONTENT_ACTION" ? action.content : undefined,
      contentType:
        action.type === "SET_CONTENT_TYPE_ACTION" ? action.contentType : prevState.contentType,
    }
  } else if (action.type === "SET_TITLE_ACTION") {
    if (
      prevState.errorType &&
      prevState.errorType in
        [
          ErrorType.BadTitle,
          ErrorType.TitleTooLong,
          ErrorType.ContentTooShort,
          ErrorType.NoTitle,
          ErrorType.TitleAlreadyUsed,
        ]
    ) {
      prevState["errorType"] = undefined
    }
    return {
      ...prevState,
      title: action.title,
    }
  } else if (action.type === "SET_ERROR_ACTION") {
    return {
      ...prevState,
      errorType: action.errorType,
    }
  } else {
    return prevState
  }
}

const CreatorContext = createContext([initialState, () => {}] as [
  CreatorState,
  Dispatch<CreatorActions>
])

export const CreatorStateProvider: React.FC = ({ children }) => (
  <CreatorContext.Provider value={useReducer(creatorReducer, initialState)}>
    {children}
  </CreatorContext.Provider>
)

export const useCreatorState = () => useContext(CreatorContext)
