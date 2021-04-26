import React, { useContext, useState } from "react"

const PopupContext = React.createContext(
  {} as {
    startPopup: (content: JSX.Element) => void
    closePopup: () => void
    value: JSX.Element | undefined
  }
)

const Display: React.FC<{ value: JSX.Element }> = (props) => {
  let Component = () => props.value

  return <Component />
}

export const PopupProvider: React.FC = (props) => {
  const [value, setValue] = useState(undefined as JSX.Element | undefined)

  const closePopup = () => setValue(undefined)

  return (
    <PopupContext.Provider
      value={{
        startPopup: (el) => {
          setValue(el)
        },
        closePopup,
        value,
      }}
    >
      {value !== undefined && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closePopup} />
          {/* <button className="modal-close is-large" aria-label="close" onClick={closePopup} /> */}
          <Display value={value} />
        </div>
      )}
      {props.children}
    </PopupContext.Provider>
  )
}

export const usePopup = () => useContext(PopupContext)
