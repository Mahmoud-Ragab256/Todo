import { signupForm } from "../data/forms"
import { useForm, type SubmitHandler } from "react-hook-form"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button";
import InputErrorMsg from "../components/ui/InputErrorMsg";
import { yupResolver } from "@hookform/resolvers/yup"
import { signupSchema } from "../validation";


interface IFormInput {
  email: string;
  username: string;
  password: string;
}

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({ resolver: yupResolver(signupSchema) })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)



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
        <Button className="btn-outline">Submit</Button>
      </form>
    </>
  )
}

export default Signup