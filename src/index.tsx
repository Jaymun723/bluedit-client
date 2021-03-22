import "regenerator-runtime/runtime"

import React, { lazy, Suspense } from "react"
import { render } from "react-dom"
import { Router, Redirect } from "@reach/router"
import { ApolloProvider } from "@apollo/client"

import "bulma/css/bulma.min.css"
import "bulma-pageloader/dist/css/bulma-pageloader.min.css"

import { apolloClient } from "./apollo/client"
import { AppStateProvider } from "./components/AppState"
import { SignOut } from "./pages/sign-out"
import { PageLoader } from "./components/PageLoader"
import TestdevPage from "./pages/dev"

const Index = lazy(() => import("./pages/index"))
const LogIn = lazy(() => import("./pages/log-in"))
const SignUp = lazy(() => import("./pages/sign-up"))
const PersonalFeed = lazy(() => import("./pages/personal-feed"))
const AccountSettings = lazy(() => import("./pages/account-settings"))
const Search = lazy(() => import("./pages/search"))
const NewPost = lazy(() => import("./pages/new-post"))

const BlueditList = lazy(() => import("./pages/bluedit-list"))
const Bluedit = lazy(() => import("./pages/bluedit"))

const UserList = lazy(() => import("./pages/user-list"))
const User = lazy(() => import("./pages/user"))

const Post = lazy(() => import("./pages/post"))

const App = () => {
  return (
    <AppStateProvider>
      <ApolloProvider client={apolloClient}>
        <Suspense fallback={<PageLoader />}>
          <Router>
            <Index path="/" />

            <TestdevPage path="dev" />

            <LogIn path="log-in" />
            <SignUp path="sign-up" />
            <SignOut path="sign-out" />
            <PersonalFeed path="personal-feed" />
            <AccountSettings path="account-settings" />
            <Search path="search" />
            <NewPost path="new-post" />

            <BlueditList path="b" />
            <Bluedit path="b/:name" />

            <UserList path="u" />
            <User path="u/:name" />

            <Redirect from="p" to="/" />
            <Post path="p/:id" />
          </Router>
        </Suspense>
      </ApolloProvider>
    </AppStateProvider>
  )
}

render(<App />, document.getElementById("root"))
