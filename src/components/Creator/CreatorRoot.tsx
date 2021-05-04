import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { ContentType, useCreatePostMutation } from "../../generated/graphql"
import { fileToImageUrl } from "../../utils"
import { usePreviewer } from "../Modals"

import { BlueditSelector } from "./BlueditSelector"
import { CreatorStateProvider, ErrorType, useCreatorState } from "./CreatorState"
import { ErrorDisplay } from "./ErrorDisplay"
import { ImageEditor } from "./ImageEditor"
import { LinkEditor } from "./LinkEditor"
import { SubmitButton } from "./SubmitButton"
import { TextEditor } from "./TextEditor"
import { TitleEditor } from "./TitleInput"
import { TypeSelector } from "./TypeSelector"

type CreatorRootProps = {}

const CreatorRootMain: React.FC<CreatorRootProps> = (props) => {
  const [state, dispatch] = useCreatorState()
  const [isPublishing, setIsPublishing] = useState(false)
  const [createPost, { data, error }] = useCreatePostMutation()
  const navigate = useNavigate()
  const { startPopup, closePopup } = usePreviewer()

  useEffect(() => {
    if (error) {
      dispatch({
        type: "SET_ERROR_ACTION",
        error: {
          type: ErrorType.ServerError,
          message: error.message,
        },
      })
    } else if (data) {
      const postId = data.createPost.id
      navigate(`/p/${postId}`)
    }
  }, [error, data])

  return (
    <div className="box">
      <p className="title">Create a new post</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault()

          if (!state.blueditName || !state.blueditId) {
            dispatch({
              type: "SET_ERROR_ACTION",
              error: {
                type: ErrorType.NoBluedit,
                message: "You must choose a bluedit to post to.",
              },
            })
            return
          } else if (!state.title) {
            dispatch({
              type: "SET_ERROR_ACTION",
              error: {
                type: ErrorType.NoTitle,
                message: "You must enter a title.",
              },
            })
            return
          } else if (!state.content) {
            dispatch({
              type: "SET_ERROR_ACTION",
              error: {
                type: ErrorType.NoContent,
                message: "You must put a content.",
              },
            })
            return
          }

          let content = state.content as string
          switch (state.contentType) {
            case ContentType.Image:
              content = await fileToImageUrl(state.content as File)
              break
            case ContentType.Link:
              content = state.websitePreview!
          }

          startPopup({
            blueditName: state.blueditName,
            content,
            contentType: state.contentType,
            title: state.title,
            onConfirm: () => {
              setIsPublishing(true)
              closePopup()
              createPost({
                variables: {
                  input: {
                    blueditId: state.blueditId!,
                    contentType: state.contentType,
                    title: state.title!,
                    ...(typeof state.content === "object"
                      ? {
                          fileContent: state.content,
                        }
                      : {
                          textContent: state.content,
                        }),
                  },
                },
              }).finally(() => {
                setIsPublishing(false)
              })
            },
          })
        }}
      >
        {process.env.NODE_ENV === "development" && <pre>{JSON.stringify(state, null, 2)}</pre>}
        <ErrorDisplay />
        <BlueditSelector />
        <TypeSelector />
        <TitleEditor />
        {state.contentType === ContentType.Image && <ImageEditor />}
        {state.contentType === ContentType.Link && <LinkEditor />}
        {state.contentType === ContentType.Text && <TextEditor />}
        <SubmitButton isLoading={isPublishing} />
      </form>
    </div>
  )
}

export const CreatorRoot: React.FC<CreatorRootProps> = (props) => (
  <CreatorStateProvider>
    <CreatorRootMain {...props} />
  </CreatorStateProvider>
)
