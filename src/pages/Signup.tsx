// import Button from "../components/ui/Button"
// import Form from "../components/ui/Form"
import { signupForm } from "../data/forms"
import { useForm, type SubmitHandler } from "react-hook-form"
// import type { IInput } from "../interfaces"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button";
import InputErrorMsg from "../components/ui/InputErrorMsg";


interface IFormInput {
  email: string;
  username: string;
  password: string;
}

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <>
      <form className="flex flex-col gap-4 w-100 lg:w-150 mx-auto my-20 p-4 rounded-md" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input input={signupForm[1]} {...register(signupForm[1].name, {
            required: true,
            minLength: 5
          })} />
          {errors?.email && errors.email.type === 'required' && <InputErrorMsg msg='email is required' />}
          {errors?.email && errors.email.type === 'pattern' && <InputErrorMsg msg='not valid email' />}
        </div>

        <div>
          <Input input={signupForm[0]} {...register(signupForm[0].name, {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          })} />
          {errors?.username && errors.username.type === 'required' && <InputErrorMsg msg='username is required' />}
          {errors?.username && errors.username.type === 'minLength' && <InputErrorMsg msg='username should be at-least 5 characters' />}
        </div>

        <div>
          <Input input={signupForm[2]} {...register(signupForm[2].name, {
            required: true,
            minLength: 6
          })} />
          {errors?.password && errors.password.type === 'required' && <InputErrorMsg msg='password is required' />}
          {errors?.password && errors.password.type === 'minLength' && <InputErrorMsg msg='password should be at-least 6 characters' />}
        </div>
        <Button className="btn-outline">Submit</Button>
      </form>
    </>
  )
}

export default Signup