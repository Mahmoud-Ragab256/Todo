import type { IInput } from "../interfaces";

export const loginForm: IInput[] = [
  {
    label: "Email",
    name: "email",
    id: "email",
    placeholder: "email@example.com"
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "password must include uppercase, lowercase, number and special characters"
  }
]

export const signupForm: IInput[] = [
  {
    label: "Email",
    name: "email",
    id: "email",
    placeholder: "email@example.com"
  },
  {
    label: "username",
    name: "username",
    id: "username",
    placeholder: "User Name"
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "password must include uppercase, lowercase, number and special characters"
  }
]