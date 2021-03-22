import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { createUploadLink } from "apollo-upload-client"
import { TOKEN_KEY, getToken } from "./auth"

export const SERVER_URL = process.env.GRAPHQL_ENDPOINT

// const httpLink = new HttpLink({
//   uri: SERVER_URL,
// })

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem(TOKEN_KEY)

//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   }
// })

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

console.log(SERVER_URL)

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  //@ts-ignore
  link: createUploadLink({
    fetch: myFetch,
    uri: SERVER_URL,
  }),
})
