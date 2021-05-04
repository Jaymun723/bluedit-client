import React, { useEffect } from "react"
import { DocumentNode, useLazyQuery } from "@apollo/client"

import { MainFeedQuery, MainFeedQueryVariables } from "../../generated/graphql"
import { c, LOAD_BATCH_SIZE } from "../../utils"
import { FeedStateProvider, useFeedState } from "./FeedState"
import { FeedPost } from "./PostFeed"
import { SortTabs } from "./SortTabs"

interface FeedProps {
  query: DocumentNode
  getPosts: (data: any) => { id: string }[]
  queryVariables?: any
}

const FeedLogic: React.FC<FeedProps> = (props) => {
  const [state, dispatch] = useFeedState()
  const [query, res] = useLazyQuery<MainFeedQuery, MainFeedQueryVariables>(props.query)

  useEffect(() => {
    query({
      variables: {
        sort: state.sortType,
        pagination: {
          skip: state.skipIndex,
          take: LOAD_BATCH_SIZE,
        },
        ...(props.queryVariables ? props.queryVariables : {}),
      },
    })
  }, [state.skipIndex, state.sortType])

  useEffect(() => {
    if (res.called) {
      const { error, data, variables } = res

      if (error) console.error(error)

      if (data && variables?.sort === state.sortType) {
        const posts = props.getPosts(data)
        dispatch({
          type: "ADD_POSTS_ACTION",
          posts,
        })
      }
    }
  }, [res])

  return (
    <>
      <SortTabs />
      <div className="container is-flex is-flex-direction-column is-align-items-center">
        {state.posts.map((post) => {
          return <FeedPost key={post.id} id={post.id} />
        })}
        <button
          className={c(
            "button",
            "is-primary",
            "is-medium",
            (state.isFetching || state.posts.some(({ loaded }) => !loaded)) && "is-loading"
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
    </>
  )
}

export const Feed: React.FC<FeedProps> = (props) => {
  return (
    <FeedStateProvider>
      <FeedLogic {...props} />
    </FeedStateProvider>
  )
}
