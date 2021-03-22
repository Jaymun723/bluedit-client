import React from "react"
import { NavBar } from "./Navbar"
import { Helmet } from "react-helmet"

const DEFAULT_TITLE = "Bluedit"
const DEFAULT_DESCRIPTION = "Bluedit a clone the famous reddit website, built more for the challenge than the fame."
const SITE_NAME = "Bluedit, share things."

interface BaseLayoutProps {
  title?: string
  completTitle?: string
  description?: string
}
export const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const title = props.completTitle || (props.title ? `${props.title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE)
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta property="twitter:card" content="summary" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={props.description || DEFAULT_DESCRIPTION} />
        <meta property="og:url" content={location.href} />
        <meta property="og:site_name" content={SITE_NAME} />
      </Helmet>
      <NavBar featuredBluedits={[{ id: "1", name: "Meme" }]} />
      <section className="section">
        <div className="container">{props.children}</div>
      </section>
    </>
  )
}
