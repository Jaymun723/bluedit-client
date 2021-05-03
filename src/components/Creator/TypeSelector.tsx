import React from "react"
import { ContentType } from "../../generated/graphql"
import { c } from "../../utils"
import { useCreatorState } from "./CreatorState"

interface TypeSelectorProps {}

export const TypeSelector: React.FC<TypeSelectorProps> = (props) => {
  const [state, dispatch] = useCreatorState()

  return (
    <div className="tabs is-boxed is-centered">
      <ul>
        <li className={c(state.contentType === ContentType.Image && "is-active")}>
          <a
            onClick={() =>
              dispatch({
                type: "SET_CONTENT_TYPE_ACTION",
                contentType: ContentType.Image,
              })
            }
          >
            <span className="icon">
              <ion-icon name="image-outline"></ion-icon>
            </span>
            <span>Image</span>
          </a>
        </li>
        <li className={c(state.contentType === ContentType.Link && "is-active")}>
          <a
            onClick={() =>
              dispatch({
                type: "SET_CONTENT_TYPE_ACTION",
                contentType: ContentType.Link,
              })
            }
          >
            <span className="icon is-small">
              <ion-icon name="link-outline"></ion-icon>
            </span>
            <span>Link</span>
          </a>
        </li>
        <li className={c(state.contentType === ContentType.Text && "is-active")}>
          <a
            onClick={() =>
              dispatch({
                type: "SET_CONTENT_TYPE_ACTION",
                contentType: ContentType.Text,
              })
            }
          >
            <span className="icon is-small">
              <ion-icon name="text-outline"></ion-icon>
            </span>
            <span>Text</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
