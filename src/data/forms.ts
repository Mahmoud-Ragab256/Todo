import type { IInput } from "../interfaces";

export const loginForm: IInput[] = [
  {
    label: "Email",
    name: "email",
    id: "email",
    placeholder: "email@example.com",
    type: "text"
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "password must include uppercase, lowercase, number and special characters",
    type: "password"
  }
]

export const signupForm: IInput[] = [

  {
    label: "username",
    name: "username",
    id: "username",
    placeholder: "username",
    type: "text"
  },
  {
    label: "Email",
    name: "email",
    id: "email",
    placeholder: "email@example.com",
    type: "email"
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "password must include uppercase, lowercase, number and special characters",
    type: "password"
  }
]