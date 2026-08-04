interface IProps {
  msg: string;
}

function InputErrorMsg({ msg }: IProps) {
  return (
    <>
      <span className="text-red-700 text-sm">
        {msg}
      </span>
    </>
  )
}

export default InputErrorMsg