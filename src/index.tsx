import "regenerator-runtime/runtime"

import React, { lazy, Suspense } from "react"
import { render } from "react-dom"

import { apolloClient } from "./apollo/client"
import { ApolloProvider } from "@apollo/client"

import { AppStateProvider } from "./components/AppState"
import { PopupProvider } from "./components/Modals"

import "./global.scss"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SignOut } from "./pages/sign-out"
import { PageLoader } from "./components/PageLoader"

import DevPage from "./pages/dev"
import { AppNotificationsProvider } from "./components/Notifications"

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

const App = () => {
  return (
    <AppStateProvider>
      <AppNotificationsProvider>
        <ApolloProvider client={apolloClient}>
          <Suspense fallback={<PageLoader />}>
            <BrowserRouter>
              <PopupProvider>
                <Routes>
                  <Route path="/" element={<Index />} />

                  {process.env.NODE_ENV === "development" && (
                    <Route path="dev" element={<DevPage />} />
                  )}

                  <Route path="log-in" element={<LogIn />} />
                  <Route path="sign-up" element={<SignUp />} />
                  <Route path="sign-out" element={<SignOut />} />

                  <Route path="personal-feed" element={<PersonalFeed />} />
                  <Route path="account-settings" element={<AccountSettings />} />
                  <Route path="search" element={<Search />} />
                  <Route path="new-post" element={<NewPost />} />

                  <Route path="b">
                    <Route path="/" element={<BlueditList />} />
                    <Route path=":name" element={<Bluedit />} />
                  </Route>

                  <Route path="u/:name" element={<User />} />

                  <Route path="p/:id" element={<Post />} />
                </Routes>
              </PopupProvider>
            </BrowserRouter>
          </Suspense>
        </ApolloProvider>
      </AppNotificationsProvider>
    </AppStateProvider>
  )
}

render(<App />, document.getElementById("root"))
