import type {InputHTMLAttributes} from "react";

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input type="text" {...props} />
  )
}

export default Input