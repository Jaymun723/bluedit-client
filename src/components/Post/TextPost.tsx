import React, { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

import { c, pureText, simpleMarkdownParser } from "../../utils"
import { useAppState } from "../AppState"
import { BasePostPreview, BasePostPreviewProps } from "./BasePost"
import { useEditPostMutation } from "../../generated/graphql"

const getExcerpt = (c: string) => {
  const content = pureText(c)
  const l = content.length

  if (l >= 300) {
    return {
      cut: true,
      excerpt: content.slice(0, 196).concat("... "),
    }
  } else {
    return {
      cut: false,
      excerpt: content,
    }
  }
}

interface TextPostPreviewProps extends Omit<BasePostPreviewProps, "body"> {
  content?: string
}

export const TextPostPreview: React.FC<TextPostPreviewProps> = (props) => {
  const htmlPreview = useMemo(() => simpleMarkdownParser(props.content || ""), [props.content])
  const excerpt = useMemo(() => getExcerpt(props.content || ""), [props.content])
  const [{ user }] = useAppState()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(props.content || "")
  const [edit, { loading, error: apolloError }] = useEditPostMutation()

  const [error, setError] = useState("")

  useEffect(() => {
    if (apolloError) {
      setError(apolloError.message)
      setIsEditing(true)
      setEditContent(props.content || "")
    }
  }, [apolloError])

  return (
    <BasePostPreview
      {...props}
      additionalButton={
        <>
          {user && props.isFullPage && user.id === props.author?.id ? (
            <>
              {isEditing && (
                <div className="card-footer-item">
                  <button
                    className="button is-text is-medium"
                    title="Cancel"
                    onClick={() => setIsEditing(false)}
                  >
                    <span className="icon">
                      <ion-icon name="close" />
                    </span>
                  </button>
                </div>
              )}
              <div className="card-footer-item">
                {loading ? (
                  <button className="button is-text is-medium is-loading" />
                ) : (
                  <button
                    className={c("button", "is-text", "is-medium", isEditing && "is-success")}
                    title="Edit post"
                    onClick={() => {
                      if (isEditing) {
                        setIsEditing(false)
                        if (editContent === props.content) return
                        edit({
                          variables: {
                            id: props.id,
                            content: editContent,
                          },
                          optimisticResponse: {
                            __typename: "Mutation",
                            editTextPost: {
                              __typename: "Post",
                              content: editContent,
                              id: props.id,
                            },
                          },
                        })
                      } else {
                        setIsEditing(true)
                      }
                    }}
                  >
                    <span className="icon">
                      <ion-icon name={isEditing ? "checkmark" : "construct-outline"} />
                    </span>
                  </button>
                )}
              </div>
            </>
          ) : null}
        </>
      }
    >
      {excerpt.cut && !props.isFullPage ? (
        <div className="content is-medium">
          {excerpt.excerpt}
          <Link to={props.url!}>Read</Link>
        </div>
      ) : isEditing ? (
        <>
          {error && (
            <div className="notification is-danger">
              <button className="delete" onClick={() => setError("")} />
              {error}
            </div>
          )}
          <textarea
            className="textarea"
            name="text"
            placeholder="Something cool I guess..."
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </>
      ) : (
        <div
          className={c("content", props.isFullPage ? "is-large" : "is-medium")}
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
        />
      )}
    </BasePostPreview>
  )
}
