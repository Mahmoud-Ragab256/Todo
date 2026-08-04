import type { ReactNode } from "react"

interface IProps {
  className?: string
  children: ReactNode
}

function Button({ className, children, ...rest }: IProps) {
  return (
    <>
      <button className={`btn ${className}`} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button