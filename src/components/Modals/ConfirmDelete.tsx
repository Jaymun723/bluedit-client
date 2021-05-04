import React from "react"

import { usePopup } from "./ModalState"

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

interface UseConfirmDeleteOptions {
  entity: string
  onConfirm: () => void
}

export const useConfirmDelete = (opts: UseConfirmDeleteOptions) => {
  const { closePopup, startPopup } = usePopup()

  const confirmPopup = () =>
    startPopup(
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Do you want to remove this {opts.entity.toLowerCase()} ?
          </p>
          <button className="delete" aria-label="close" onClick={closePopup} />
        </header>
        <section className="modal-card-body">
          Removing {opts.entity.toLowerCase()}s is permanent. You will also loose all karma
          associated with this {opts.entity.toLowerCase()}.
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-danger"
            onClick={() => {
              closePopup()
              opts.onConfirm()
            }}
          >
            Remove {capitalize(opts.entity)}
          </button>
          <button className="button" onClick={closePopup}>
            Cancel
          </button>
        </footer>
      </div>
    )

  return { startPopup: confirmPopup, closePopup }
}
