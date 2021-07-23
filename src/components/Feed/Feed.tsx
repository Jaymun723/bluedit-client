import React, { useEffect } from "react"
import { DocumentNode, TypedDocumentNode, useLazyQuery } from "@apollo/client"

import { MainFeedQuery, MainFeedQueryVariables } from "../../generated/graphql"
import { c, LOAD_BATCH_SIZE, networkError } from "../../utils"
import { FeedStateProvider, useFeedState } from "./FeedState"
import { PostPreview } from "../Post"
import { useAppNotifications } from "../Notifications"

export interface FeedProps {
  query: DocumentNode
  getElements: (data: any) => { id: string }[]
  renderElement: (id: string) => JSX.Element
  baseVariables?: any
}

const Dummy: React.FC<{ renderElement: FeedProps["renderElement"]; id: string }> = (props) =>
  props.renderElement(props.id)

export const Feed = (props: FeedProps) => {
  const [state, dispatch] = useFeedState()
  const [query, res] = useLazyQuery(props.query)
  const { pushNotification } = useAppNotifications()

  useEffect(() => {
    dispatch({
      type: "SET_BASE_VARIABLES_ACTION",
      variables: props.baseVariables,
    })
  }, [props.query])

  useEffect(() => {
    if (state.isFetching) {
      query({
        variables: {
          ...props.baseVariables,
          ...state.variables,
          pagination: {
            skip: state.skipIndex,
            take: LOAD_BATCH_SIZE,
          },
        },
      })
    }
  }, [state.skipIndex, state.isFetching])

  useEffect(() => {
    if (res.called) {
      const { error, data, variables } = res

      if (error) {
        pushNotification(networkError)
        console.error(error)
      }

      if (data) {
        const elements = props.getElements(data)
        dispatch({
          type: "ADD_ELEMENTS_ACTION",
          elements,
        })
      }
    }
  }, [res])

  return (
    <div className="container is-flex is-flex-direction-column is-align-items-center">
      {state.elements.map(({ id }) => (
        <Dummy key={id} renderElement={props.renderElement} id={id} />
      ))}
      <button
        className={c(
          "button",
          "is-primary",
          "is-medium",
          (state.isFetching || state.elements.some(({ loaded }) => !loaded)) && "is-loading"
        )}
        onClick={() => {
          dispatch({
            type: "FETCH_MORE_ACTION",
          })
        }}
      >
        Fetch more !
      </button>
    </div>
  )
}
