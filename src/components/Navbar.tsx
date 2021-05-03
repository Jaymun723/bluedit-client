import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { c } from "../utils"
import { useAppState } from "./AppState"

interface FeedDropdownProps {
  pathname: string
  isLogged: boolean
}
const FeedDropdown: React.FC<FeedDropdownProps> = (props) => {
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <a className="navbar-link">
        {props.pathname === "/"
          ? "Popular Feed"
          : props.pathname === "/personal-feed"
          ? "Personal Feed"
          : props.pathname.startsWith("/b/")
          ? props.pathname
          : props.pathname === "/b"
          ? "Bluedits List"
          : "Feeds"}
      </a>
      <div className="navbar-dropdown is-boxed">
        <Link to="/" className={c("navbar-item", props.pathname === "/" && "is-active")}>
          Popular feed
        </Link>
        {props.isLogged && (
          <Link
            to="/personal-feed"
            className={c("navbar-item", props.pathname === "/personal-feed" && "is-active")}
          >
            Personal feed
          </Link>
        )}
        <hr className="navbar-divider" />
        <Link to="/b" className={c("navbar-item", props.pathname === "/b" && "is-action")}>
          Bluedits List
        </Link>
        {/* {props.featuredBluedits.map(({ id, name }) => (
          <Link key={id} to={`/b/${name}`} className={withActive("navbar-item", props.pathname === `/b/${name}`)}>
            /b/{name}
          </Link>
        ))} */}
      </div>
    </div>
  )
}

interface NavBarProps {}
export const NavBar: React.FC<NavBarProps> = (props) => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [{ user }] = useAppState()
  const [query, setQuery] = useState("")

  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h1 className="title">Bluedit</h1>
          </Link>

          <a
            role="button"
            className={c("navbar-burger", isMenuActive && "is-active")}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className={c("navbar-menu", isMenuActive && "is-active")}>
          <div className="navbar-start">
            <FeedDropdown pathname={pathname} isLogged={!!user} />
            {!pathname.startsWith("/search") && (
              <form
                className="navbar-item"
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log("e")
                  navigate(`/search?query=${query}`)
                }}
              >
                <div className="field has-addons">
                  <div className="control is-expanded has-icons-left">
                    <input
                      className="input"
                      type="text"
                      placeholder="Bluedits, Users, Posts..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      required
                    />
                    <span className="icon is-small is-left">
                      <ion-icon name="search-outline"></ion-icon>
                    </span>
                  </div>
                  <div className="control">
                    <button className="button">Search</button>
                  </div>
                </div>
              </form>
            )}
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">{user.name}</a>
                <div className="navbar-dropdown is-right">
                  <Link to="/new-post" className="navbar-item">
                    New post
                  </Link>
                  <hr className="navbar-divider" />
                  <Link to={`/u/${user.name}`} className="navbar-item">
                    My Profile
                  </Link>
                  <Link to="/account-settings" className="navbar-item">
                    Settings
                  </Link>
                  <hr className="navbar-divider" />
                  <Link to="/sign-out" className="navbar-item">
                    Sign out
                  </Link>
                </div>
              </div>
            ) : (
              <div className="navbar-item">
                <div className="buttons">
                  <Link className="button is-primary" to="/sign-up">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/log-in" className="button is-info">
                    Log in
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
