import React from "react"
import { MainFeedDocument } from "../generated/graphql"
import { BaseLayout } from "../components/BaseLayout"
import { RouteComponentProps } from "@reach/router"
import { Feed } from "../components/Feed"

// const Index: React.FC<RouteComponentProps> = () => {
//   const [{ sort }] = useAppState()
//   const [skip, setSkip] = useState(0)
//   const [end, setEnd] = useState(false)
//   const [loadCount, setLoadCount] = useState(0)

//   const [isFetching, setIsqF] = useState(false)

//   const { data, error, fetchMore } = useQuery<MainFeedQuery>(MainFeedDocument, {
//     variables: { sort, pagination: { take: LOAD_BATCH_SIZE, skip: 0 } },
//     fetchPolicy: "cache-and-network",
//   })

//   useEffect(() => {
//     if (skip !== 0) {
//       fetchMore({
//         variables: { pagination: { skip, take: LOAD_BATCH_SIZE } },
//       }).then((res) => {
//         if (res.data) {
//           const l = res.data.mainFeed.length
//           if (l < LOAD_BATCH_SIZE) {
//             setEnd(true)
//           }
//         }
//       })
//     }
//   }, [skip])

//   useEffect(() => {
//     console.log(sort)
//   }, [sort])

//   if (error) {
//     console.log(error)
//   }

//   return (
//     <BaseLayout>
//       <SortTabs />
//       {!data ? (
//         <div className="container is-max-desktop is-flex is-justify-content-center">
//           <button className="button is-white is-mega-large is-loading" />
//         </div>
//       ) : (
//         <div className="container is-max-desktop is-flex is-flex-direction-column">
//           {data.mainFeed.map(({ id }) => {
//             return <PostPreview id={id} key={id} onLoaded={() => setLoadCount(loadCount + 1)} />
//           })}
//           {data.mainFeed.length === loadCount && !end && (
//             <button
//               className={c(
//                 "button",
//                 "is-primary",
//                 "is-large",
//                 networkStatus === NetworkStatus.loading && "is-loading"
//               )}
//               onClick={() => {
//                 setSkip(skip + LOAD_BATCH_SIZE)
//               }}
//             >
//               Fetch More !
//             </button>
//           )}
//         </div>
//       )}
//     </BaseLayout>
//   )
// }

const Index: React.FC<RouteComponentProps> = () => {
  return (
    <BaseLayout>
      <Feed query={MainFeedDocument} getPosts={(data) => data.mainFeed} />
    </BaseLayout>
  )
}

export default Index
