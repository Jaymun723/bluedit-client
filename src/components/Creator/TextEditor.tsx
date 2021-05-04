import React, { useMemo, useState } from "react"

import { simpleMarkdownParser } from "../../utils"
import { useMarkdownFeatures } from "../Modals"
import { useCreatorState } from "./CreatorState"

interface TextEditorProps {}

export const TextEditor: React.FC<TextEditorProps> = (props) => {
  const [state, dispatch] = useCreatorState()
  const [showPreview, setShowPreview] = useState(true)
  const { startPopup } = useMarkdownFeatures()
  const htmlPreview = useMemo(
    () => simpleMarkdownParser(typeof state.content === "string" ? state.content : ""),
    [state.content]
  )

  return (
    <>
      <div className="field">
        <label htmlFor="text" className="label">
          Content{" "}
          <a href="#" onClick={startPopup}>
            (some Markdown is supported)
          </a>
          :
        </label>
        <div className="control">
          <textarea
            className="textarea"
            name="text"
            placeholder="Something cool I guess..."
            value={(state.content as string) || ""}
            onChange={(e) =>
              dispatch({
                type: "SET_CONTENT_ACTION",
                content: e.target.value,
              })
            }
            // required
          />
        </div>
      </div>
      {typeof state.content === "string" && state.content.length > 0 && (
        <div className="mb-4">
          <strong>
            Preview{" "}
            <a href="#" onClick={() => setShowPreview(!showPreview)}>
              ({showPreview ? "HIDE" : "SHOW"})
            </a>
            {showPreview && ":"}
          </strong>
          {showPreview && (
            <div className="content" dangerouslySetInnerHTML={{ __html: htmlPreview }} />
          )}
        </div>
      )}
    </>
  )
}
