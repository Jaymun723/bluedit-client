import React, { useEffect, useRef } from "react"

import { useWebsitePreviewLazyQuery } from "../../generated/graphql"
import { useCreatorState } from "./CreatorState"
import { debounce, isValidHttpUrl } from "../../utils"
import { BasePostPreview, WebsiteDisplay } from "../Post"
import { useAppState } from "../AppState"

interface LinkEditorProps {}

export const LinkEditor: React.FC<LinkEditorProps> = (props) => {
  const [state, dispatch] = useCreatorState()
  const [{ user }] = useAppState()
  const [query, { data, loading, error }] = useWebsitePreviewLazyQuery()
  const websitePreview = useRef(debounce((url: string) => query({ variables: { url } })))

  useEffect(() => {
    if (data) {
      dispatch({
        type: "SET_WEBSITE_PREVIEW_ACTION",
        websitePreview: data?.websitePreview,
      })
    }
  }, [data])

  const isWriting = state.content && !state.websitePreview

  return (
    <>
      <div className="field">
        <label htmlFor="link" className="label">
          Link:
        </label>
        <div className="control has-icons-left">
          <input
            type="url"
            className="input"
            // required
            placeholder="https://example.com/"
            value={(state.content as string) || ""}
            onChange={(e) => {
              const content = e.target.value
              dispatch({
                type: "SET_CONTENT_ACTION",
                content,
              })
              if (isValidHttpUrl(content)) {
                websitePreview.current(content)
              }
            }}
          />
          <span className="icon is-left">
            <ion-icon name="at-outline"></ion-icon>
          </span>
        </div>
      </div>
      <div className="is-flex is-flex-direction-column is-align-items-center">
        {/* {loading || (state.content && !state.websitePreview && <BasePostPreview id="#" />)} */}
        {(loading || isWriting) && <BasePostPreview id="#" />}
        {state.websitePreview && (
          <div className="card">
            <div className="card-content">
              <WebsiteDisplay content={state.websitePreview} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
