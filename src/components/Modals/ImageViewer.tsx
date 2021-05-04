import React from "react"

import { usePopup } from "./ModalState"

interface UseImageViewerProps {
  url: string
}

export const useImageViewer = (opts: UseImageViewerProps) => {
  const { closePopup, startPopup } = usePopup()

  const previewImage = () =>
    startPopup(
      <>
        <div className="modal-content">
          <figure className="image">
            <img src={opts.url} alt="" />
          </figure>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={closePopup} />
      </>
    )

  return {
    closePopup,
    startPopup: previewImage,
  }
}
