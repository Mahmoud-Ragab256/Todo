import type { IInputLogin, IInputRegister } from "../interfaces";

export const loginForm: IInputLogin[] = [
  {
    label: "Email",
    name: "identifier",
    id: "email",
    placeholder: "email@example.com",
    type: "text",
    validation: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }

  },
  {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "password must include uppercase, lowercase, number and special characters",
    type: "password",
    validation: {
      required: true,
      minLength: 6
    }
  }
]

export const signupForm: IInputRegister[] = [

  {
    label: "username",
    name: "username",
    id: "username",
    placeholder: "username",
    type: "text",
    validation: {
      required: true,
      minLength: 5
    }
  },
  {
    label: "Email",
    name: "email",
    id: "email",
    placeholder: "email@example.com",
    type: "email",
    validation: {
      required: true,
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }
  },
  {
    label: "Password",
    name: "password",
    id: "password",
    placeholder: "password must include uppercase, lowercase, number and special characters",
    type: "password",
    validation: {
      required: true,
      minLength: 6
    }
  }
]