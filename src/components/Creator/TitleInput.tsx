import React from "react"
import { useCreatorState } from "./CreatorState"

interface TitleEditorProps {}

export const TitleEditor: React.FC<TitleEditorProps> = (props) => {
  const [state, dispatch] = useCreatorState()

  return (
    <div className="field">
      <label htmlFor="title" className="label">
        Title:
      </label>
      <div className="control has-icons-left">
        <input
          type="text"
          className="input"
          name="title"
          placeholder="Something useful..."
          // required
          value={state.title || ""}
          onChange={(e) => dispatch({ type: "SET_TITLE_ACTION", title: e.target.value })}
        />
        <span className="icon is-left">
          <ion-icon name="newspaper-outline"></ion-icon>
        </span>
      </div>
    </div>
  )
}
