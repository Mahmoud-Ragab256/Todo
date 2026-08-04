import type { ReactNode } from "react"
import Button from "./Button";

interface IProps {
  children: ReactNode;
  backgroundColor: string;
  index: number;
}

function ListElement({ children, backgroundColor, index }: IProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4 p-4 text-[12px] md:text-sm" style={{ backgroundColor }}>
      <span className="block">
        {index}.
      </span>
      <span className=" block line-clamp-3">
        {children}
      </span>
      <div className="flex gap-2">
        <Button className='btn-sm text-white bg-indigo-700 hover:bg-indigo-600'>Edit</Button>
        <Button className='btn-sm text-white bg-red-700 hover:bg-red-600'>Delete</Button>
      </div>
    </div>
  )
}

export default ListElement