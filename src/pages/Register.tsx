import { signupForm } from "../data/forms"
import { useForm, type SubmitHandler } from "react-hook-form"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup"
import { signupSchema } from "../validation";
import toast, { Toaster } from 'react-hot-toast';
import api from "../config/axios.config";
import { useState } from "react";
import type { AxiosError } from "axios";




interface IFormInput {
  email: string;
  username: string;
  password: string;
}

function Register() {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(signupSchema) })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true)

    try {
      const { status } = await api.post("/auth/local/register", data)
      if (status === 200) {
        toast('Registered Successfully', {
          duration: 4000,
          position: 'bottom-center',

          style: {
            backgroundColor: "black",
            color: "white"
          },
        }
        )
      }
    } catch (error) {

      const errorObj = error as AxiosError<{ error: { message?: string } }>

      toast(`${errorObj.response?.data?.error?.message}`, {
        duration: 4000,
        position: 'bottom-center',

        style: {
          backgroundColor: "black",
          color: "white"
        },
      }
      )
    } finally {
      setIsLoading(false)
    }
  }

  const renderInputs = signupForm.map((input, index) => {
    return (
      <div key={index}>
        <Input input={input} {...register(input.name, input.validation)} />
        {errors[input.name] && <InputErrorMsg msg={errors[input.name]?.message} />}
      </div>
    )
  })

  return (
    <>
      <form className="flex flex-col gap-4 w-100 lg:w-150 mx-auto my-20 p-4 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        {renderInputs}
        <Button isLoading={isLoading}>Register</Button>
        <div className="text-sm text-gray-700 mx-auto">have account ? <a href="/login" className="text-indigo-700">login</a></div>
      </form>
      <Toaster />
    </>
  )
}

export default Register