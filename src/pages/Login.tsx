import { useForm, type SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"
import { loginForm } from "../data/forms"
import Input from "../components/ui/Input";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../validation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import type { AxiosError } from "axios";
import api from "../config/axios.config";
import { useNavigate } from "react-router";

interface IFormInput {
  identifier: string;
  password: string;
}

function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) })
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {

    setIsLoading(true)


    try {
      const { status, data: resData } = await api.post("/auth/local", data)
      if (status === 200) {
        toast.success('Login Successfully', {
          duration: 4000,
          position: 'bottom-center',

          style: {
            backgroundColor: "black",
            color: "white"
          },
        }
        )
      }

      localStorage.setItem("userData", JSON.stringify(resData))
    } catch (error) {

      const errorObj = error as AxiosError<{ error: { message?: string } }>

      console.log(errorObj.response?.data?.error?.message)

      toast.error(`${errorObj.response?.data?.error?.message}`, {
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
      navigate("/")
    }
  }


  const renderInputs = loginForm.map((input, index) => {
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
        <Button isLoading={isLoading}>Login</Button>
        <div className="text-sm text-gray-700 mx-auto">new account ? <a href="/register" className="text-indigo-700">register</a></div>
      </form>
      <Toaster />
    </>
  )
}

export default Login