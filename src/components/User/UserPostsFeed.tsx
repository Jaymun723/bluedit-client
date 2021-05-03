import React, { useEffect, useState } from "react"
import { useUserPostsQuery } from "../../generated/graphql"
import { c, LOAD_BATCH_SIZE } from "../../utils"
import { PostPreview } from "../Post/PostPreview"

interface UserPostsFeedProps {
  userName: string
}

export const UserPostsFeed: React.FC<UserPostsFeedProps> = (props) => {
  const { data, error, loading, fetchMore } = useUserPostsQuery({
    variables: {
      name: props.userName,
      pagination: {
        take: LOAD_BATCH_SIZE,
        skip: 0,
      },
    },
  })
  const [skip, setSkip] = useState(0)
  const [fetching, setFetching] = useState(false)

  useEffect(() => {
    if (skip !== 0) {
      setFetching(true)
      fetchMore({
        variables: {
          name: props.userName,
          pagination: {
            take: LOAD_BATCH_SIZE,
            skip,
          },
        },
      }).then(() => setFetching(true))
    }
  }, [skip])

  if (loading) {
    return (
      <div className="container is-flex is-justify-content-center">
        <button className="button is-text is-loading is-large" />
      </div>
    )
  }

  if (error || !data) {
    console.error(error)
    if (process.env.NODE_ENV === "development") {
      return <div style={{ border: "1ps solid red" }}>{JSON.stringify(error)}</div>
    } else {
      return null
    }
  }

  return (
    <div className="container is-flex is-flex-direction-column is-align-items-center">
      {data.user.posts.map((post) => (
        <PostPreview key={post.id} id={post.id} />
      ))}
      <button
        className={c("button", "is-primary", "is-large", fetching && "is-loading")}
        onClick={() => {
          setSkip(skip + LOAD_BATCH_SIZE)
        }}
      >
        Fetch more !
      </button>
    </div>
  )
}
