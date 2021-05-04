import React, { createContext, Dispatch, Reducer, useContext, useReducer } from "react"

import { ContentType } from "../../generated/graphql"

interface CreatorState {
  contentType: ContentType
  title?: string
  blueditId?: string
  blueditName?: string
  content?: string | File
  error?: {
    type: ErrorType
    message: string
  }
  websitePreview?: string
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
  blueditName: string
  blueditId: string
}

interface SetContentAction {
  type: "SET_CONTENT_ACTION"
  content: string | File | undefined
}

interface SetWebsitePreviewAction {
  type: "SET_WEBSITE_PREVIEW_ACTION"
  websitePreview: string
}

export enum ErrorType {
  ServerError,
  NoTitle,
  NoContent,
  NoBluedit,
  InvalidUrl,
}

// export enum ErrorType {
//   NoBluedit,
//   NoTitle,
//   NoContent,
//   TitleTooShort,
//   TitleTooLong,
//   ContentTooShort,
//   ContentTooLong,
//   TitleAlreadyUsed,
//   BadContent,
//   BadTitle,
//   ServerError,
// }

interface SetErrorTypeAction {
  type: "SET_ERROR_ACTION"
  error: {
    type: ErrorType
    message: string
  }
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
  | SetWebsitePreviewAction

const creatorReducer: Reducer<CreatorState, CreatorActions> = (prevState, action): CreatorState => {
  if (action.type === "CHOOSE_BLUEDIT_ACTION") {
    return {
      ...prevState,
      blueditName: action.blueditName,
      blueditId: action.blueditId,
      ...(prevState.error?.type === ErrorType.NoBluedit ? { error: undefined } : {}),
    }
  } else if (action.type === "CLOSE_ERROR_ACTION") {
    return {
      ...prevState,
      error: undefined,
    }
  } else if (action.type === "SET_CONTENT_ACTION" || action.type === "SET_CONTENT_TYPE_ACTION") {
    // if (prevState.errorType && prevState.errorType in [ErrorType.InvalidUrl, ErrorType.NoContent]) {
    //   prevState["errorType"] = undefined
    // }
    if (prevState.error && prevState.error.type in [ErrorType.InvalidUrl, ErrorType.NoContent]) {
      prevState.error = undefined
    }

    return {
      ...prevState,
      content: action.type === "SET_CONTENT_ACTION" ? action.content : undefined,
      websitePreview: undefined,
      contentType:
        action.type === "SET_CONTENT_TYPE_ACTION" ? action.contentType : prevState.contentType,
    }
  } else if (action.type === "SET_TITLE_ACTION") {
    if (prevState.error && prevState.error.type === ErrorType.NoTitle) {
      prevState.error = undefined
    }

    return {
      ...prevState,
      title: action.title,
    }
  } else if (action.type === "SET_ERROR_ACTION") {
    return {
      ...prevState,
      error: action.error,
    }
  } else if (action.type === "SET_WEBSITE_PREVIEW_ACTION") {
    return {
      ...prevState,
      websitePreview: action.websitePreview,
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
