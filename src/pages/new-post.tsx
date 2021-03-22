import React, { useState } from "react"
import { useAppState } from "../components/AppState"
import { useNavigate, Link, RouteComponentProps } from "@reach/router"
import { BaseLayout } from "../components/BaseLayout"
import { ContentType, useMyBlueditsQuery, useCreatePostMutation } from "../generated/graphql"
import { withActive } from "../components/utils"
import { SubmitButton } from "../components/ConnectionForm"
import { ApolloError } from "@apollo/client"
import { ImagePicker } from "../components/ImagePicker"

interface BlueditSelectorProps {
  onChange: (id: string) => any
  value: undefined | string
}
const BlueditSelector: React.FC<BlueditSelectorProps> = (props) => {
  const { error, data } = useMyBlueditsQuery({ fetchPolicy: "cache-and-network" })

  if (error) {
    console.log(error)
    return null
  }

  return (
    <div className="field">
      <label htmlFor="blueditSelector" className="label">
        On which bluedit to you post ?
      </label>
      <div className="control">
        {data && data.me.bluedits.length > 0 ? (
          <div className="select is-fullwidth">
            <select
              name="blueditSelector"
              value={props.value || "DEFAULT"}
              onChange={(e) => {
                if (e.target.value !== "DEFAULT") {
                  props.onChange(e.target.value)
                }
              }}
            >
              {[
                <option key="DEFAULT" value="DEFAULT">
                  Choose a Bluedit
                </option>,
              ].concat(
                data.me.bluedits.map((bluedit) => (
                  <option key={bluedit.id} value={bluedit.id}>
                    {bluedit.name}
                  </option>
                ))
              )}
            </select>
          </div>
        ) : (
          data && (
            <p className="is-size-5 has-text-danger">
              You haven't subscribed to any Bluedit ! Go to <Link to="/b">here</Link> to find Bluedit.
            </p>
          )
        )}
      </div>
    </div>
  )
}

interface SelectTypeProps {
  value: ContentType
  onChange: (value: ContentType) => any
}
const SelectType: React.FC<SelectTypeProps> = (props) => {
  return (
    <div className="tabs is-boxed is-centered">
      <ul>
        <li className={withActive(props.value === ContentType.Image)}>
          <a onClick={() => props.onChange(ContentType.Image)}>
            <span className="icon">
              <ion-icon name="image-outline"></ion-icon>
            </span>
            <span>Image</span>
          </a>
        </li>
        <li className={withActive(props.value === ContentType.Link)}>
          <a onClick={() => props.onChange(ContentType.Link)}>
            <span className="icon is-small">
              <ion-icon name="link-outline"></ion-icon>
            </span>
            <span>Link</span>
          </a>
        </li>
        <li className={withActive(props.value === ContentType.Text)}>
          <a onClick={() => props.onChange(ContentType.Text)}>
            <span className="icon is-small">
              <ion-icon name="text-outline"></ion-icon>
            </span>
            <span>Text</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

// interface ImagePostCreator {
//   onChange: (file: File) => any
// }
// const ImagePostCreator: React.FC<ImagePostCreator> = (props) => {
//   const [file, setFile] = useState(new File(["foo"],"foo.txt"))

//   console.log(file)

//   return (
//     <div className="file has-name is-fullwidth mb-3">
//       <label className="file-label">
//         <input
//           className="file-input"
//           type="file"
//           name="resume"
//           required
//           onChange={(e) => {
//             if (e.target.validity.valid && e.target.files && e.target.files.length === 1) {
//               const file = e.target.files.item(0)!
//               console.log(file)
//               setFile(file)
//               props.onChange(file)
//             }
//           }}
//           accept="image/*"
//         />
//         <span className="file-cta">
//           <span className="file-icon">
//             <ion-icon name="image-outline"></ion-icon>
//           </span>
//           <span className="file-label">Choose a file…</span>
//         </span>
//         <span className="file-name">{file?.name}</span>
//       </label>
//     </div>
//   )
// }

interface PostCreatorProps {
  contentType: ContentType
  content: File | string
  setContent: (val: File | string) => any
}
const PostCreator: React.FC<PostCreatorProps> = (props) => {
  if (props.contentType === ContentType.Image) {
    return (
      <ImagePicker
        onChange={props.setContent}
        content={typeof props.content === "object" ? props.content : undefined}
      />
    )
  } else if (props.contentType === ContentType.Link) {
    if (typeof props.content !== "string") {
      props.setContent("")
    }
    return (
      <div className="field">
        <label htmlFor="link" className="label">
          Link:
        </label>
        <div className="control has-icons-left">
          <input
            type="url"
            className="input"
            required
            placeholder="https://example.com/"
            value={props.content as string}
            onChange={(e) => props.setContent(e.target.value)}
          />
          <span className="icon is-left">
            <ion-icon name="at-outline"></ion-icon>
          </span>
        </div>
      </div>
    )
  } else {
    if (typeof props.content !== "string") {
      props.setContent("")
    }
    return (
      <div className="field">
        <label htmlFor="text" className="label">
          Text:
        </label>
        <div className="control">
          <textarea
            className="textarea"
            name="text"
            placeholder="Something cool I guess..."
            value={props.content as string}
            onChange={(e) => props.setContent(e.target.value)}
            // required
          />
        </div>
      </div>
    )
  }
}

const NewPost: React.FC<RouteComponentProps> = () => {
  const [{ user }] = useAppState()
  const navigate = useNavigate()

  const [error, setError] = useState("")
  const [contentType, setContentType] = useState(ContentType.Image)
  const [blueditId, setBlueditId] = useState(undefined as string | undefined)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("" as File | string)
  const [createPost] = useCreatePostMutation()
  let Content: React.ComponentType | undefined

  if (!user) {
    navigate("/log-in")
  }

  return (
    <BaseLayout title="Create a new post">
      <div className="box">
        <h1 className="title">Create a new post</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!blueditId) {
              return setError("Please select a Bluedit.")
            }
            if (title.length === 0) {
              return setError("Please enter title.")
            }
            if (contentType === ContentType.Image && typeof content !== "object") {
              return setError("Please select an image.")
            } else if (contentType !== ContentType.Image && typeof content !== "string") {
              return setError("Please enter your content.")
            }
            createPost({
              variables: {
                input: {
                  blueditId,
                  contentType,
                  title,
                  fileContent: contentType === ContentType.Image ? content : undefined,
                  textContent: contentType !== ContentType.Image ? (content as string) : undefined,
                },
              },
            })
              .then(({ data }) => {
                if (data) {
                  navigate(`/p/${data.createPost.id}`)
                }
              })
              .catch((err: ApolloError) => {
                setError(err.graphQLErrors.map((err) => err.message).join("\n"))
              })
          }}
        >
          {error.length !== 0 && (
            <div className="notification is-danger">
              <button className="delete" onClick={() => setError("")}></button>
              {error}
            </div>
          )}
          <BlueditSelector onChange={setBlueditId} value={blueditId} />
          <SelectType value={contentType} onChange={setContentType} />
          <div className="field">
            <label htmlFor="title" className="label">
              Title:
            </label>
            <div className="control has-icons-left">
              <input
                type="text"
                className="input"
                name="title"
                placeholder="Something useful..."
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="icon is-left">
                <ion-icon name="newspaper-outline"></ion-icon>
              </span>
            </div>
          </div>
          <PostCreator content={content} contentType={contentType} setContent={setContent} />
          <SubmitButton />
        </form>
      </div>
    </BaseLayout>
  )
}

export default NewPost
