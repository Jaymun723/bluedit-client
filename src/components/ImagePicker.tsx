import React, { useState, useEffect } from "react"

interface ImagePickerProps {
  onChange: (file: File) => void
  content: undefined | File
}
export const ImagePicker: React.FC<ImagePickerProps> = (props) => {
  const [file, setFile] = useState(props.content)

  useEffect(() => {
    if (file) {
      props.onChange(file)
    }
  }, [file])

  return (
    <div className="file has-name is-fullwidth mb-3">
      <label className="file-label">
        <input
          className="file-input"
          type="file"
          name="resume"
          // required
          onChange={(e) => {
            console.log("yey")
            if (e.target.validity.valid && e.target.files && e.target.files.length === 1) {
              const inputFile = e.target.files.item(0)!
              // console.log(inputFile)
              setFile(inputFile)
              // props.onChange(inputFile)
            }
          }}
          accept="image/*"
        />
        <span className="file-cta">
          <span className="file-icon">
            <ion-icon name="image-outline"></ion-icon>
          </span>
          <span className="file-label">Choose a file…</span>
        </span>
        <span className="file-name">{file?.name}</span>
      </label>
    </div>
  )
}
