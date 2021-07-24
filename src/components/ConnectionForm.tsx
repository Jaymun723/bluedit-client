import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ApolloError } from "@apollo/client"

import { c } from "../utils"

export const ErrorDisplay: React.FC<{ error?: ApolloError }> = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  useEffect(() => {
    if (props.error) {
      setIsDisplayed(true)
    }
  }, [props.error])

  if (!isDisplayed || typeof props.error === "undefined") {
    return null
  }

  return (
    <div className="notification is-danger">
      <button className="delete" onClick={() => setIsDisplayed(false)}></button>
      {props.error.graphQLErrors.map((err) => err.message).join("\n")}
    </div>
  )
}

interface ConnectionFormProps {
  login?: boolean
  error?: ApolloError
}
export const ConnectionForm: React.FC<ConnectionFormProps> = (props) => {
  return (
    <section className="hero is-fullheight is-primary">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="box column is-one-third">
              <h1 className="title has-text-centered">{props.login ? "Log In" : "Sign Up"}</h1>
              <ErrorDisplay error={props.error} />
              {props.children}
              <p className="has-text-centered mt-2">
                {props.login ? (
                  <Link to="/sign-up">Sign Up</Link>
                ) : (
                  <Link to="/log-in">Log In</Link>
                )}{" "}
                - {/* <a href="#">Forgot password</a> -  */}
                <Link to="/">Go back</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FieldProps {
  type: string
  name: string
  iconName: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  loading?: boolean
}
export const Field: React.FC<FieldProps> = (props) => {
  return (
    <div className="field">
      <label htmlFor={props.name} className="label">
        {props.name[0].toLocaleUpperCase() + props.name.slice(1)}:
      </label>
      <div className={c("control", "has-icons-left", props.loading && "is-loading")}>
        <input
          type={props.type}
          className="input"
          name={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          required={props.required}
        />
        <span className="icon is-left">
          <ion-icon name={props.iconName} style={{ fontSize: "24px" }}></ion-icon>
        </span>
      </div>
    </div>
  )
}

interface SubmitButtonProps {
  loading?: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <div className="field">
      <div className="control">
        <button
          className={c("button", "is-fullwidth", props.loading && "is-loading")}
          type="submit"
        >
          {props.children || "Submit"}
        </button>
      </div>
    </div>
  )
}
