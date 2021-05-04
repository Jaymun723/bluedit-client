import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { createUploadLink } from "apollo-upload-client"
import { getToken } from "./auth"

export const SERVER_URL = process.env.GRAPHQL_ENDPOINT

const myFetch: WindowOrWorkerGlobalScope["fetch"] = (input, ops = {}) => {
  let token = getToken()

  if (!ops.headers) {
    ops.headers = {}
  }

  if (token) {
    // @ts-ignore
    ops.headers["Authorization"] = `Bearer ${token}`
  }

  return fetch(input, ops)
}

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        bluedits: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
      },
    },
    User: {
      fields: {
        posts: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming]
          },
        },
      },
    },
  },
})

export const apolloClient = new ApolloClient({
  cache,
  // @ts-ignore
  link: createUploadLink({
    fetch: myFetch,
    uri: SERVER_URL,
  }),
})
