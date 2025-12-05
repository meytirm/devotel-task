import type {InputHTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";


const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  const {className, ...rest} = props;
  return (
    <input type="text" {...rest} className={twMerge(
      'border-2 border-gray-300 rounded-md p-2 outline-none',
      className
    )}
    />
  )
}

export default Input