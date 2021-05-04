import React from "react"
import { Link } from "react-router-dom"
import { formatDistance } from "date-fns"

import { useUserPreviewQuery } from "../../generated/graphql"

const DEFAULT_BIO = "Nothing here, for now..."

type UserPreviewProps = { id: string } | { name: string }
export const UserPreview: React.FC<UserPreviewProps> = (props) => {
  const { data, error, loading } = useUserPreviewQuery({ variables: props })

  if (loading) {
    return (
      <div className="card my-2">
        <div className="card-content">
          <div className="is-flex is-justify-content-center is-align-items-center my-4">
            <button className="button is-text is-large is-loading" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1px solid red" }}>{JSON.stringify(error)}</div>
    } else {
      return null
    }
  }

  return (
    <div className="card my-2">
      {/* {props.inHead && data && (
        <Helmet>
          <title>/u/{data.user.name} | Bluedit</title>
          <meta property="og:title" content={`/u/${data.user.name} | Bluedit`} />
          <meta
            property="og:description"
            content={`${data.user.name} joined bluedit the ${format(
              new Date(data.user.createdAt),
              "do 'of' MMMM y"
            )}.\n${data.user.bio !== DEFAULT_BIO ? data.user.bio : ""}`}
          />
        </Helmet>
      )} */}
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p className="title">
              <Link to={`/u/${data.user.name}`}>/u/{data.user.name}</Link>
            </p>
            <p className="subtitle">
              Joined {formatDistance(new Date(data.user.createdAt), new Date())} ago.
            </p>
          </div>
          <div className="column is-narrow">
            <div className="panel" style={{ boxShadow: "none" }}>
              {/* <div className="menu-list"></div> */}
              <div className="panel-block">
                <span className="panel-icon">
                  <ion-icon name="heart-outline"></ion-icon>
                </span>
                {data.user.karma} karma
              </div>
              <div className="panel-block">
                <span className="panel-icon">
                  <ion-icon name="file-tray-full-outline"></ion-icon>
                </span>
                {data.user.postCount} post{data && data.user.postCount > 1 && "s"}
              </div>
            </div>
          </div>
        </div>
        {data.user.bio !== DEFAULT_BIO && <p style={{ whiteSpace: "pre-line" }}>{data.user.bio}</p>}
      </div>
    </div>
  )
}
