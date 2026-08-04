import { forwardRef, type InputHTMLAttributes, type Ref } from "react";
import type { IInput } from "../../interfaces";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  input: IInput;
}

const Input = forwardRef(({ input, ...rest }: IProps, ref: Ref<HTMLInputElement>) => {
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <label htmlFor={input.id}>{input.label}</label>
        <input
          ref={ref}
          type={input.type}
          name={input.name}
          id={input.id}
          placeholder={input.placeholder}
          className="w-full p-3 border border-gray-200 rounded-md shadow-xl shadow-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-indigo-50"
          {...rest}
        />
      </div>
    </>
  )
})

export default Input