import "regenerator-runtime/runtime"

import React, { lazy, Suspense } from "react"
import { render } from "react-dom"

import { apolloClient } from "./apollo/client"
import { ApolloProvider } from "@apollo/client"

import { AppStateProvider } from "./components/AppState"
import { PopupProvider } from "./components/Modals"

import "./global.scss"

import { Router, Redirect } from "@reach/router"
import { SignOut } from "./pages/sign-out"
import { PageLoader } from "./components/PageLoader"

const Index = lazy(() => import("./pages/index"))
const LogIn = lazy(() => import("./pages/log-in"))
const SignUp = lazy(() => import("./pages/sign-up"))
const PersonalFeed = lazy(() => import("./pages/personal-feed"))
const AccountSettings = lazy(() => import("./pages/account-settings"))
const Search = lazy(() => import("./pages/search"))
const NewPost = lazy(() => import("./pages/new-post"))

const BlueditList = lazy(() => import("./pages/bluedit-list"))
const Bluedit = lazy(() => import("./pages/bluedit"))

const User = lazy(() => import("./pages/user"))

const Post = lazy(() => import("./pages/post"))

import DevPage from "./pages/dev"

const App = () => {
  return (
    <AppStateProvider>
      <ApolloProvider client={apolloClient}>
        <PopupProvider>
          <Suspense fallback={<PageLoader />}>
            <Router>
              <Index path="/" />

              {/* <TestdevPage path="dev" /> */}

              <DevPage path="dev" />

              <LogIn path="log-in" />
              <SignUp path="sign-up" />
              <SignOut path="sign-out" />
              <PersonalFeed path="personal-feed" />
              <AccountSettings path="account-settings" />
              <Search path="search" />
              <NewPost path="new-post" />

              <BlueditList path="b" />
              <Bluedit path="b/:name" />

              <User path="u/:name" />

              <Redirect from="p" to="/" />
              <Post path="p/:id" />
            </Router>
          </Suspense>
        </PopupProvider>
      </ApolloProvider>
    </AppStateProvider>
  )
}

render(<App />, document.getElementById("root"))
