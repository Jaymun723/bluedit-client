import React, { useEffect, useRef, useState } from "react"

import { useImageViewer } from "../Modals"
import { BasePostPreview, BasePostPreviewProps } from "./BasePost"

interface ImagePostPreviewProps extends Omit<BasePostPreviewProps, "body"> {
  content?: string
}

const CardImage: React.FC<{ content: string; title: string }> = (props) => {
  const { startPopup } = useImageViewer({ url: props.content })
  const ref = useRef<HTMLImageElement>(null)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (ref.current) {
      const image = ref.current
      image.src = props.content
      image.onerror = () => {
        setImageError(true)
      }
    }
  }, [ref])

  if (imageError) {
    return (
      <div className="card-content">
        <div className="content">
          <strong>There was an error when loading this image.</strong>
        </div>
      </div>
    )
  }

  return (
    <div className="card-image">
      <figure className="image" style={{ cursor: "pointer" }}>
        <img ref={ref} alt={props.title} onClick={startPopup} />
      </figure>
    </div>
  )
}

export const ImagePostPreview: React.FC<ImagePostPreviewProps> = (props) => {
  return (
    <BasePostPreview
      {...props}
      body={<CardImage content={props.content!} title={props.title!} />}
    />
  )
}
