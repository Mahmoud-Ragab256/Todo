import * as yup from "yup"



export const signupSchema = yup
  .object({
    username: yup.string().required("username is required").min(5, "username should be at-least 5 characters"),
    email: yup.string().required("email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "not valid email address"),
    password: yup.string().required("password is required").min(5, "password should be at-least 6 characters"),
  })
  .required()
export const loginSchema = yup
  .object({
    identifier: yup.string().required("email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "not valid email address"),
    password: yup.string().required("password is required").min(5, "password should be at-least 6 characters"),
  })
  .required()