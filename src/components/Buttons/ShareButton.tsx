import React from "react"

interface ShareButtonProps {
  url?: string
}

export const ShareButton: React.FC<ShareButtonProps> = (props) => {
  if (!props.url) {
    return <button className="button is-white is-medium is-loading" />
  }

  return (
    <button className="button is-white is-medium" title="Share">
      <span className="icon">
        <ion-icon name="share-social-outline"></ion-icon>
      </span>
    </button>
  )
}
