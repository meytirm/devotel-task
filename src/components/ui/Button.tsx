import type {ButtonHTMLAttributes} from "react";
import {twMerge} from "tailwind-merge";

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const {className, ...rest} = props;
  return <button {...rest} className={twMerge('bg-gray-300 hover:bg-gray-300/80 rounded-md py-2 px-4', className)} />
}

export default Button