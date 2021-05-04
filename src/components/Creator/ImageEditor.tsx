import React, { useRef, useState } from "react"

import { useCreatorState } from "./CreatorState"

interface ImageEditorProps {}

export const ImageEditor: React.FC<ImageEditorProps> = (props) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const [file, setFile] = useState(undefined as undefined | File)
  const [state, dispatch] = useCreatorState()

  return (
    <div className="is-flex is-justify-content-center mb-3">
      {file ? (
        <figure className="image has-close-button mt-5">
          <button
            className="close-button delete is-large"
            onClick={(e) => {
              e.preventDefault()
              setFile(undefined)
              dispatch({
                type: "SET_CONTENT_ACTION",
                content: undefined,
              })
            }}
          />
          <img ref={imageRef} />
        </figure>
      ) : (
        <div className="file is-boxed is-medium">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="image"
              accept="image/*"
              // required
              onChange={(e) => {
                if (e.target.validity.valid && e.target.files && e.target.files.length === 1) {
                  const inputFile = e.target.files.item(0)!

                  setFile(inputFile)
                  dispatch({
                    type: "SET_CONTENT_ACTION",
                    content: inputFile,
                  })

                  const reader = new FileReader()

                  reader.onload = (e) => {
                    if (e.target && imageRef.current) {
                      imageRef.current.src = e.target.result as string
                    }
                  }

                  reader.readAsDataURL(inputFile)
                }
              }}
            />
            <span className="file-cta">
              <span className="file-icon">
                <ion-icon name="image-outline"></ion-icon>
              </span>
              <span className="file-label">Choose an image...</span>
            </span>
          </label>
        </div>
      )}
    </div>
  )
}
