// Ugly but needed
import { ApolloProvider } from "@apollo/client"
import React, { Suspense } from "react"
import { BrowserRouter } from "react-router-dom"
import { apolloClient } from "./apollo/client"
import { AppStateProvider } from "./components/AppState"
import { PopupProvider } from "./components/Modals"
import { AppNotificationsProvider } from "./components/Notifications"
import { PageLoader } from "./components/PageLoader"
import { FeedStateProvider } from "./components/Feed"

interface TopLevelProviderProps {}

export const TopLevelProvider: React.FC<TopLevelProviderProps> = (props) => (
  <AppStateProvider>
    <AppNotificationsProvider>
      <ApolloProvider client={apolloClient}>
        <FeedStateProvider>
          <Suspense fallback={<PageLoader />}>
            <BrowserRouter>
              <PopupProvider>{props.children}</PopupProvider>
            </BrowserRouter>
          </Suspense>
        </FeedStateProvider>
      </ApolloProvider>
    </AppNotificationsProvider>
  </AppStateProvider>
)
