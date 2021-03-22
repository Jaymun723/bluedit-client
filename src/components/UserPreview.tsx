import React from "react"
import { useUserPreviewQuery } from "../generated/graphql"
import { formatDistance, format } from "date-fns"
import { Link } from "@reach/router"
import { hideLink } from "./utils"
import { Helmet } from "react-helmet"

const DEFAULT_BIO = "Nothing here, for now..."

type UserPreviewProps = ({ id: string } | { name: string }) & { inHead?: boolean }
export const UserPreview: React.FC<UserPreviewProps> = (props) => {
  const { data, error } = useUserPreviewQuery({ variables: props })

  if (error) {
    console.log(error)
    return null
  }

  return (
    <div className="card my-2">
      {props.inHead && data && (
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
      )}
      <div className="card-content">
        <div className="columns">
          <div className="column">
            <p className="title">
              <Link to={`/u/${data?.user.name}`} className={hideLink}>
                /u/{data?.user.name}
              </Link>
            </p>
            <p className="subtitle">Joined {data && formatDistance(new Date(data.user.createdAt), new Date())} ago.</p>
          </div>
          <div className="column is-narrow">
            <div className="panel" style={{ boxShadow: "none" }}>
              {/* <div className="menu-list"></div> */}
              <div className="panel-block">
                <span className="panel-icon">
                  <ion-icon name="heart-outline"></ion-icon>
                </span>
                {data?.user.karma} karma
              </div>
              <div className="panel-block">
                <span className="panel-icon">
                  <ion-icon name="file-tray-full-outline"></ion-icon>
                </span>
                {data?.user.postCount} post{data && data.user.postCount > 1 && "s"}
              </div>
            </div>
          </div>
        </div>
        {data && data.user.bio !== DEFAULT_BIO && <p style={{ whiteSpace: "pre-line" }}>{data?.user.bio}</p>}
      </div>
    </div>
  )
}
