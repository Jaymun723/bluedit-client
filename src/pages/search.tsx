import React, { useState } from "react"
import { BaseLayout } from "../components/BaseLayout"
import { RouteComponentProps } from "@reach/router"
import { useSearchQuery } from "../generated/graphql"
import { BlueditPreview } from "../components/Bluedit/BlueditPreview"
import { PostPreview } from "../components/Post/PostPreview"
import { UserPreview } from "../components/User/UserPreview"

const createSearchParams = (obj: { [x: string]: string }) => {
  const { searchParams } = new URL("https://example.com/")
  for (const [key, val] of Object.entries(obj)) {
    searchParams.set(key, val)
  }
  return searchParams
}

const useSearchParams: () => [URLSearchParams, (val: URLSearchParams) => void] = () => {
  const [urlSearchParams, setUrlSearchParams] = useState(new URL(location.href).searchParams)

  const setUrl = (searchParams: URLSearchParams) => {
    const url = new URL(location.href)

    searchParams.forEach((val, key) => {
      url.searchParams.set(key, val)
    })

    history.replaceState("", "", url.href)
    setUrlSearchParams(url.searchParams)
  }

  return [urlSearchParams, setUrl]
}

const Search: React.FC<RouteComponentProps> = () => {
  const [params, setParams] = useSearchParams()
  const [tempQuery, setTempQuery] = useState(params.get("query") || "")
  const [query, setQuery] = useState(params.get("query") || "")
  const { data, error } = useSearchQuery({ variables: { query }, fetchPolicy: "cache-and-network" })

  if (error) {
    console.log(error)
  }

  return (
    <BaseLayout title="Search">
      <form
        className="box my-2"
        onSubmit={(e) => {
          e.preventDefault()
          setQuery(tempQuery)
          setParams(createSearchParams({ query: tempQuery }))
          setTempQuery("")
        }}
      >
        <div className="field has-addons">
          <div className="control has-icons-left is-expanded">
            <input
              type="text"
              className="input"
              value={tempQuery}
              onChange={(e) => setTempQuery(e.target.value)}
              required
            />
            <span className="icon is-left">
              <ion-icon name="search-outline"></ion-icon>
            </span>
          </div>
          <div className="control">
            <button className="button is-info">Search</button>
          </div>
        </div>
      </form>
      <div className="container is-flex is-flex-direction-column is-align-items-center">
        {data ? (
          data.search.length === 0 ? (
            <p className="title">Nothing found :(</p>
          ) : (
            data.search.map((e) => {
              switch (e.__typename) {
                case "Bluedit":
                  return <BlueditPreview id={e.id} key={e.id} />
                case "Post":
                  return <PostPreview id={e.id} key={e.id} />
                case "User":
                  return <UserPreview id={e.id} key={e.id} />
              }
            })
          )
        ) : (
          <button className="button is-white is-loading is-large" />
        )}
      </div>
    </BaseLayout>
  )
}

export default Search
