import React from "react"

import { usePopup } from "./ModalState"

export const useMarkdownFeatures = () => {
  const { closePopup, startPopup } = usePopup()

  const markdownPopup = () =>
    startPopup(
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Supported{" "}
            <a href="https://www.markdownguide.org/" target="_blank">
              markdown
            </a>{" "}
            features
          </p>
          <button className="delete" aria-label="close" onClick={closePopup} />
        </header>
        <section className="modal-card-body">
          <div className="content">
            <h4>You can make bold text:</h4>
            <p>
              Writing <code>**text**</code>
              gives you: <strong>text</strong>
            </p>
            <h4>You can make italic text:</h4>
            <p>
              Writing <code>*text*</code>
              gives you: <i>text</i>
            </p>
            <h4>You can make links:</h4>
            <p>
              Writing <code>[Example](https://example.com/)</code>
              gives you:{" "}
              <a href="https://example.com/" target="_blank">
                Example
              </a>
            </p>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={closePopup}>
            Okay !
          </button>
        </footer>
      </div>
    )

  return { startPopup: markdownPopup, closePopup }
}
