import React, { useMemo } from "react"

import { BasePostPreviewProps, BasePostPreview } from "./BasePost"

interface WebsitePostPreviewProps extends Omit<BasePostPreviewProps, "body"> {
  content?: string
}
interface WebsiteData {
  title: string | undefined
  description: string | undefined
  siteUrl: string
  imageUrl: string | undefined
}

export const WebsiteDisplay: React.FC<{ content: string }> = (props) => {
  const website = useMemo(() => JSON.parse(props.content) as WebsiteData, [props.content])

  return (
    <>
      <div className="media">
        {website.imageUrl && (
          <div className="media-left">
            {/* <WebsiteImage url={website.imageUrl} /> */}
            <div
              style={{
                width: "96px",
                height: "96px",
                backgroundImage: `url(${website.imageUrl})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            {/* <figure className="image is-64x64">
              <img src={website.imageUrl} alt={website.title} />
            </figure> */}
          </div>
        )}
        <div className="media-content">
          <p className="title is-4">{website.title}</p>
          <p className="subtitle is-6">
            <a href={website.siteUrl} className="is-website-url">
              {website.siteUrl}
            </a>
          </p>
        </div>
      </div>
      <div className="content">{website.description}</div>
    </>
  )
}

export const WebsitePostPreview: React.FC<WebsitePostPreviewProps> = (props) => {
  return (
    <BasePostPreview {...props}>
      <WebsiteDisplay content={props.content!} />
    </BasePostPreview>
  )
}
