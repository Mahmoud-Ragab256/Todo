import type { ReactNode } from 'react'
import Input from './Input'
import type { IInput } from '../../interfaces'

interface IProps {
  inputs: IInput[];
  children: ReactNode
}

function Form({ inputs, children }: IProps) {

  const renderInputs = inputs.map((input, index) => {
    return (
      <Input key={index} input={input} />
    )
  })

  return (
    <>
      <form className="flex flex-col gap-4 w-100 lg:w-150 mx-auto my-20 p-4 rounded-md">
        {renderInputs}
        {children}
      </form>
    </>
  )
}

export default Form