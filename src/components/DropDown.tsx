import React, { useState } from "react"
import { styled } from "linaria/react"

interface DropDownButtonProps {
  color: string
}
export const DropDownButton = styled.button<DropDownButtonProps>`
  margin: 3px;
  padding: 3px;
  background-color: ${(props) => props.color};
  color: white;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: 1.25em;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover p {
    text-decoration: underline;
  }
`

interface WrapperProps {
  active: boolean
}
const Wrapper = styled.div<WrapperProps>`
  position: relative;

  span.text {
    cursor: pointer;

    text-decoration: ${(props) => (props.active ? "underline" : "none")};
  }

  div.content {
    display: ${(props) => (props.active ? "block" : "none")};
    right: 0;
    top: 22px;
    position: absolute;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 5px;
    z-index: 100;
    padding: 10px;
    width: max-content;
  }
`

interface DropDownProps {
  text: string
}
export const DropDown: React.FC<DropDownProps> = (props) => {
  const [active, setActive] = useState(false)

  return (
    <Wrapper active={active} onClick={() => setActive(!active)}>
      <span className="text">{props.text}</span>
      <div className="content">{props.children}</div>
    </Wrapper>
  )
}
