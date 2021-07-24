import { ApolloError } from "@apollo/client"
import React, { useEffect, useState } from "react"
import {
  UpdateUserSettingsMutationVariables,
  UserSettingsDocument,
  UserSettingsQuery,
  useUpdateUserSettingsMutation,
  useUserSettingsQuery,
} from "../../generated/graphql"
import { c, networkError } from "../../utils"
import { useAppNotifications } from "../Notifications"
import { DangerSettings } from "./Danger"
import { EmailSettings } from "./Email"
import { PublicSettings } from "./Public"

export interface BaseSettingsProps {
  data?: UserSettingsQuery
  error?: ApolloError
  loading: boolean
  mutate: (opts: { variables: UpdateUserSettingsMutationVariables }) => void
}

export const AccountSettings: React.FC = (props) => {
  const { data, error: queryError } = useUserSettingsQuery()
  const [category, setCategory] = useState("public" as "public" | "email" | "danger")
  const { pushNotification } = useAppNotifications()

  const [mutate, { error: mutationError, loading }] = useUpdateUserSettingsMutation({
    update: (proxy, { data }) => {
      if (data) {
        proxy.writeQuery<UserSettingsQuery>({
          query: UserSettingsDocument,
          data: {
            __typename: "Query",
            me: {
              __typename: "User",
              ...data.changeAccountSettings,
            },
          },
        })
      }
    },
  })

  useEffect(() => {
    if (queryError) {
      pushNotification(networkError)
    }
  }, [queryError])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === "public") {
        setCategory("public")
      } else if (hash === "email") {
        setCategory("email")
      } else if (hash === "danger") {
        setCategory("danger")
      }
    }
    onHashChange()
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [])

  let Settings: React.FC<BaseSettingsProps>
  switch (category) {
    case "danger":
      Settings = DangerSettings
      break
    case "email":
      Settings = EmailSettings
      break
    case "public":
      Settings = PublicSettings
      break
  }

  return (
    <div className="columns">
      <div className="column is-one-fifth">
        <aside className="menu">
          <p className="menu-label">Your settings</p>
          <ul className="menu-list">
            <li>
              <a href="#public" className={c(category === "public" && "is-active")}>
                Public informations
              </a>
            </li>
            <li>
              <a href="#email" className={c(category === "email" && "is-active")}>
                Email settings
              </a>
            </li>
            <li>
              <a
                href="#danger"
                className={c(category === "danger" && "is-active", "has-text-danger")}
              >
                Danger zone
              </a>
            </li>
          </ul>
        </aside>
      </div>
      <div className="column">
        <Settings loading={loading} mutate={mutate} data={data} error={mutationError} />
      </div>
    </div>
  )
}

// export const AccountSettings: React.FC<AccountSettingsProps> = (props) => {
//   const { data, error } = useUserSettingsQuery()
//   const [category, setCategory] = useState("public" as "public" | "email" | "danger")

//   useEffect(() => {
//     const onHashChange = () => {
//       const hash = window.location.hash.slice(1)
//       if (hash === "public") {
//         setCategory("public")
//       } else if (hash === "email") {
//         setCategory("email")
//       } else if (hash === "danger") {
//         setCategory("danger")
//       }
//     }
//     onHashChange()
//     window.addEventListener("hashchange", onHashChange)
//     return () => window.removeEventListener("hashchange", onHashChange)
//   }, [])

//   return (
//     <div className="columns">
//       <div className="column is-one-fifth">
//         <aside className="menu">
//           <p className="menu-label">Your settings</p>
//           <ul className="menu-list">
//             <li>
//               <a href="#public" className={c(category === "public" && "is-active")}>
//                 Public informations
//               </a>
//             </li>
//             <li>
//               <a href="#email" className={c(category === "email" && "is-active")}>
//                 Email settings
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#danger"
//                 className={c(category === "danger" && "is-active", "has-text-danger")}
//               >
//                 Danger zone
//               </a>
//             </li>
//           </ul>
//         </aside>
//       </div>
//       <div className="column">
//         {category === "public" && <PublicSettings />}
//         {category === "email" && <EmailSettings />}
//         {category === "danger" && <DangerSettings />}
//       </div>
//     </div>
//   )
// }
