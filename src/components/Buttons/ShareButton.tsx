import React from "react"

interface ShareButtonProps {
  url?: string
  disabled?: boolean
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
  if (!props.url) {
    return <button className="button is-text is-medium is-loading" />
  }

  return (
    <button className="button is-text is-medium" title="Share" disabled={props.disabled}>
      <span className="icon">
        <ion-icon name="share-social-outline"></ion-icon>
      </span>
    </button>
  )
}
