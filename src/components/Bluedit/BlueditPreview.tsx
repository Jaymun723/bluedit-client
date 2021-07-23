import React, { useEffect } from "react"
import { Link } from "react-router-dom"

import {
  useBlueditPreviewQuery,
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../../generated/graphql"
import { c, networkError } from "../../utils"
import { useAppState } from "../AppState"
import { SubscribeButton } from "../Buttons"
import { useAppNotifications } from "../Notifications"

type BlueditPreviewProps = ({ id: string } | { name: string }) & {
  isWide?: boolean
  onLoaded?: () => void
}

export const BlueditPreview: React.FC<BlueditPreviewProps> = (props) => {
  const { data, loading, error } = useBlueditPreviewQuery({ variables: props })
  const [subscribe] = useSubscribeMutation()
  const [unsubscribe] = useUnsubscribeMutation()
  const [{ user }] = useAppState()
  const { pushNotification } = useAppNotifications()

  useEffect(() => {
    if ((data || error) && props.onLoaded) {
      props.onLoaded()
    }
  }, [data, error])

  if (loading) {
    return (
      <div className={c("card", "my-2", !props.isWide && "is-post-card")}>
        <div className="card-content">
          <div className="is-flex is-justify-content-center is-align-items-center my-4">
            <button className="button is-text is-large is-loading"></button>
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    console.error(error || "no data")
    pushNotification(networkError)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1px solid red" }}>{JSON.stringify(error || "no data")}</div>
    } else {
      return null
    }
  }

  return (
    <div className={c("card", "my-2", !props.isWide && "is-post-card")}>
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p className="title">
              <Link to={`/b/${data.bluedit.name}`}>/b/{data.bluedit.name}</Link>
            </p>
            <p className="subtitle">
              {data.bluedit.subscriberCount} subscriber{data.bluedit.subscriberCount > 1 && "s"} -{" "}
              {data.bluedit.postCount} post{data.bluedit.postCount > 1 && "s"}
            </p>
          </div>
          {user && data && (
            <div className="column has-text-right is-narrow">
              <SubscribeButton
                userSubscribed={data.bluedit.userSubscribed}
                subscribe={() =>
                  subscribe({
                    variables: { id: data.bluedit.id },
                    optimisticResponse: {
                      __typename: "Mutation",
                      subscribe: {
                        userSubscribed: true,
                        id: data.bluedit.id,
                        subscriberCount: data.bluedit.subscriberCount + 1,
                        __typename: "Bluedit",
                      },
                    },
                  })
                }
                unsubscribe={() =>
                  unsubscribe({
                    variables: { id: data.bluedit.id },
                    optimisticResponse: {
                      __typename: "Mutation",
                      unsubscribe: {
                        __typename: "Bluedit",
                        userSubscribed: false,
                        id: data.bluedit.id,
                        subscriberCount: data.bluedit.subscriberCount - 1,
                      },
                    },
                  })
                }
              />
            </div>
          )}
        </div>
        <p className="content">{data.bluedit.description}</p>
      </div>
    </div>
  )
}
