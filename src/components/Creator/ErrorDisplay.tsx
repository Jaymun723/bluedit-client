import React, { useEffect } from "react"
import { ContentType } from "../../generated/graphql"
import { ErrorType, useCreatorState } from "./CreatorState"

export const graphqlErrorParser = () => {}

interface ErrorDisplayProps {}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = (props) => {
  const [state, dispatch] = useCreatorState()

  if (typeof state.error === "undefined") {
    return null
  }

  // let message = "Some error occurred..."
  // switch (state.errorType) {
  //   case ErrorType.BadContent:
  //     message = `There was en error with the ${
  //       state.contentType === ContentType.Image
  //         ? "image"
  //         : state.contentType === ContentType.Link
  //         ? "link"
  //         : "text"
  //     } you provided.`
  //     break
  //   case ErrorType.BadTitle:
  //     message = `There was a problem with the title.`
  //     break
  //   case ErrorType.ContentTooLong:
  //     message = `Your text is too long, maximum 10000.`
  //     break
  //   case ErrorType.ContentTooShort:
  //     message = `You have wrote anything yet.`
  //     break
  //   case ErrorType.NoBluedit:
  //     message = `You must choose a bluedit to post to.`
  //     break
  //   case ErrorType.NoContent:
  //     message = `You must put a content.`
  //     break
  //   case ErrorType.NoTitle:
  //     message = `You must enter a title.`
  //     break
  //   case ErrorType.ServerError:
  //     message = `Server has a problem.`
  //     break
  //   case ErrorType.TitleAlreadyUsed:
  //     message = `This title is already used.`
  //     break
  //   case ErrorType.TitleTooLong:
  //     message = `Your title is too long, maximum 40.`
  //     break
  //   case ErrorType.TitleTooShort:
  //     message = `Your title is too short, minimum 3.`
  //     break
  // }

  return (
    <div className="notification is-danger">
      <button
        className="delete"
        onClick={() =>
          dispatch({
            type: "CLOSE_ERROR_ACTION",
          })
        }
      />
      {state.error.message}
    </div>
  )
}
