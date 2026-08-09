import * as yup from "yup"



export const signupSchema = yup.object({
  username: yup.string().required("username is required").min(5, "username should be at-least 5 characters"),
  email: yup.string().required("email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "not valid email address"),
  password: yup.string().required("password is required").min(5, "password should be at-least 6 characters"),
})
  .required()
export const loginSchema = yup.object({
  identifier: yup.string().required("email is required").matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "not valid email address"),
  password: yup.string().required("password is required").min(5, "password should be at-least 6 characters"),
})
  .required()

export const todoSchema = yup.object({
  documentId: yup.string().required(),
  title: yup.string().required("Title is required").max(50, "Title must be >= 50 character"),
  description: yup.string().required("Description is required").min(20, "Description must be <= 50 character")
})