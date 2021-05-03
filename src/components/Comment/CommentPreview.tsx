import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react"
import {
  useCommentPreviewQuery,
  useCommentVoteMutation,
  useEditCommentMutation,
  useRemoveCommentMutation,
} from "../../generated/graphql"
import { c } from "../../utils"
import { useAppState } from "../AppState"
import { UpVoteButtons } from "../Buttons/UpVoteButtons"
import { usePopup } from "../Modals"
import { useConfirmDelete } from "../Modals/ConfirmDelete"
import { CommentInput } from "./CommentInput"
import { CommentMarkup } from "./CommentMarkup"

interface CommentEditorProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
}
const CommentEditor: React.FC<CommentEditorProps> = (props) => {
  return (
    <div className="field">
      <div className="control">
        <textarea
          rows={1}
          className="textarea"
          autoFocus
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  )
}

interface CommentPreviewProps {
  id: string
  postId: string
}

export const CommentPreview: React.FC<CommentPreviewProps> = (props) => {
  const { data } = useCommentPreviewQuery({
    variables: { id: props.id },
  })
  const [voteMutation] = useCommentVoteMutation()
  const [editMutation] = useEditCommentMutation()
  const [remove] = useRemoveCommentMutation()

  const [editing, setEditing] = useState(false)
  const [editContent, setEditingContent] = useState("")
  const [commenting, setCommenting] = useState(false)

  const { startPopup } = useConfirmDelete({
    entity: "comment",
    onConfirm: () => {
      remove({
        variables: { id: props.id },
      })
    },
  })

  useEffect(() => {
    if (data) {
      setEditingContent(data.comment.content)
    }
  }, [data])

  const vote = (up: boolean) =>
    voteMutation({
      variables: {
        commentId: props.id,
        postId: props.postId,
        up,
      },
    })

  return (
    <CommentMarkup
      commentId={props.id}
      onClickComment={() => setCommenting(!commenting)}
      commenting={commenting}
      editing={editing}
      onEditStateChange={(state) => {
        if (state === "START") {
          setEditing(true)
        } else if (state === "CANCEL") {
          setEditing(false)
          setEditingContent(data?.comment.content || "")
        } else {
          setEditing(false)
          if (editContent !== data?.comment.content) {
            editMutation({
              variables: { content: editContent, id: props.id },
              optimisticResponse: {
                __typename: "Mutation",
                editComment: {
                  __typename: "Comment",
                  id: props.id,
                  content: editContent,
                },
              },
            })
          }
        }
      }}
      editValue={editContent}
      onEditValueChange={setEditingContent}
      onClickDelete={startPopup}
      vote={vote}
      author={data?.comment.author}
      content={data?.comment.content}
      removed={data?.comment.deleted}
      userVote={data?.comment.userVote || undefined}
      voteCount={data?.comment.voteCount}
      last={props.children === null}
    >
      {commenting && (
        <CommentInput
          postId={props.postId}
          commentId={props.id}
          onFinishedComment={() => setCommenting(false)}
        />
      )}
      {props.children}
    </CommentMarkup>
  )
}
