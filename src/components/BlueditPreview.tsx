import React from "react"
import { useBlueditPreviewQuery, useSubscribeMutation, useUnsubscribeMutation } from "../generated/graphql"
import { hideLink } from "./utils"
import { Link } from "@reach/router"
import { useAppState } from "./AppState"
import { Helmet } from "react-helmet"

interface SubscribeButtonProps {
  subscribe: () => void
  unsubscribe: () => void
  userSubscribed: boolean
}
export const SubscribeButton: React.FC<SubscribeButtonProps> = (props) => {
  return (
    <button
      className={`button ${props.userSubscribed ? "is-danger" : "is-primary"}`}
      onClick={() => {
        if (props.userSubscribed) {
          props.unsubscribe()
        } else {
          props.subscribe()
        }
      }}
    >
      <span className="icon">
        <ion-icon
          name={props.userSubscribed ? "close-circle-outline" : "add-circle-outline"}
          style={{ fontSize: "24px" }}
        ></ion-icon>
      </span>
      <span>{props.userSubscribed ? "Unsubscribe" : "Subscribe"}</span>
    </button>
  )
}

type BlueditPreviewProps = ({ id: string } | { name: string }) & { inHead?: boolean }
export const BlueditPreview: React.FC<BlueditPreviewProps> = (props) => {
  const [{ user }] = useAppState()
  const { data, error } = useBlueditPreviewQuery({
    variables: props,
  })

  const [subscribe] = useSubscribeMutation()
  const [unsubscribe] = useUnsubscribeMutation()

  if (error) {
    console.log(error)
    return null
  }

  return (
    <div className="card my-2">
      {props.inHead && data && (
        <Helmet>
          <title>/b/{data.bluedit.name} | Bluedit</title>
          <meta property="og:title" content={`/b/${data.bluedit.name} | Bluedit`} />
          <meta property="og:description" content={data.bluedit.description} />
        </Helmet>
      )}
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p className="title">
              <Link to={`/b/${data?.bluedit.name}`} className={hideLink}>
                /b/{data?.bluedit.name}
              </Link>
            </p>
            {data && (
              <p className="subtitle">
                {data.bluedit.subscriberCount} subscriber{data.bluedit.subscriberCount > 1 && "s"} -{" "}
                {data.bluedit.postCount} post{data.bluedit.postCount > 1 && "s"}
              </p>
            )}
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
        <p className="content">{data?.bluedit.description}</p>
      </div>
    </div>
  )
}
