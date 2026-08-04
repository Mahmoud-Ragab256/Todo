import type { IInput } from "../../interfaces";

interface IProps {
  input: IInput;
}

function Input({ input, ...rest }: IProps) {
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <label htmlFor={input.id}>{input.label}</label>
        <input
          type="text"
          name={input.name}
          id={input.id}
          placeholder={input.placeholder}
          className="w-full p-3 border border-gray-200 rounded-md shadow-xl shadow-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          {...rest}
        />
      </div>
    </>
  )
}

export default Input