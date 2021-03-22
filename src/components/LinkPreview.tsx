import React, { useMemo } from "react"
import { Helmet } from "react-helmet"

interface LinkData {
  title: string | undefined
  description: string | undefined
  siteUrl: string
  imageUrl: string | undefined
}

interface LinkPreviewProps {
  content: string
  inHead?: boolean
  authorName: string
  blueditName: string
}
export const LinkPreview: React.FC<LinkPreviewProps> = (props) => {
  const data = useMemo(() => JSON.parse(props.content) as LinkData, [props.content])

  const headTitle = `"${data.title || data.siteUrl}" by ${props.authorName} | Bluedit`
  const headDescription = `Link posted by ${props.authorName} on /b/${props.blueditName}.\n${data.description || ""}`

  return (
    <>
      {props.inHead && (
        <Helmet>
          <title>{headTitle}</title>
          <meta property="og:title" content={headTitle} />
          <meta property="og:description" content={headDescription} />
          {data.imageUrl && <meta property="og:image" content={data.imageUrl} />}
        </Helmet>
      )}
      {data.imageUrl && (
        <div className="card-image">
          <a href={data.imageUrl}>
            <figure className="image is-4by3">
              <img src={data.imageUrl} alt={data.title} />
            </figure>
          </a>
        </div>
      )}
      <div className="card-content">
        <div className="content">
          <p>
            <strong>{data.title}</strong>
            <br />
            {data.description}
            <br />
            <a href={data.siteUrl} target="_blank">
              {data.siteUrl}
            </a>
          </p>
        </div>
      </div>
    </>
  )
  // return (
  //   <div className="media">
  //     {data.imageUrl && (
  //       <div className="media-left">
  //         <p className="image is-128x128">
  //           <img src={data.imageUrl} />
  //         </p>
  //       </div>
  //     )}
  //     <div className="media-content">
  //       <div className="content">
  //         <p>
  //           <strong>{data.title}</strong>
  //           <br />
  //           {data.description}
  //           <br />
  //           <a href={data.siteUrl}>{data.siteUrl}</a>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // )
}
