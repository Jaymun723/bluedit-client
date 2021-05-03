import React from "react"
import { ContentType } from "../../generated/graphql"
import { simpleMarkdownParser } from "../../utils"
import { useAppState } from "../AppState"
import { CommentButton } from "../Buttons/CommentButton"
import { ShareButton } from "../Buttons/ShareButton"
import { UpVoteButtons } from "../Buttons/UpVoteButtons"
import { useCreatorState } from "../Creator/CreatorState"
import { BasePostPreview } from "../Post/BasePost"
import { WebsiteDisplay } from "../Post/WebsitePost"
import { usePopup } from "./ModalState"

interface PreviewerOptions {
  onConfirm: () => void
  title: string
  blueditName: string
  content: string
  special?: File | string
  contentType: ContentType
}

export const usePreviewer = () => {
  const { closePopup, startPopup } = usePopup()
  const [{ user }] = useAppState()

  const previewPopup = (opts: PreviewerOptions) =>
    startPopup(
      <div className="modal-card">
        <div className="modal-card-head">
          <p className="modal-card-title">This what your post will look like:</p>
          <button className="delete" aria-label="close" onClick={closePopup} />
        </div>
        <section className="modal-card-body">
          <BasePostPreview
            id="#"
            author={{ name: user?.name || "", id: user?.id || "" }}
            bluedit={{ name: opts.blueditName }}
            body={
              opts.contentType === ContentType.Image && (
                <div className="card-image">
                  <figure className="image" style={{ cursor: "pointer" }}>
                    <img src={opts.content} />
                  </figure>
                </div>
              )
            }
            commentCount={7}
            createdAt={new Date().toISOString()}
            title={opts.title}
            url="#"
            voteCount={7}
            disableButtons
          >
            {opts.contentType === ContentType.Link && <WebsiteDisplay content={opts.content} />}
            {opts.contentType === ContentType.Text && (
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: simpleMarkdownParser(opts.content) }}
              />
            )}
          </BasePostPreview>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={opts.onConfirm}>
            Publish
          </button>
        </footer>
      </div>
    )

  return {
    startPopup: previewPopup,
    closePopup,
  }
}
