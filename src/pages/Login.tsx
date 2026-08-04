import Button from "../components/ui/Button"
import Form from "../components/ui/Form"
import { loginForm } from "../data/forms"

function Login() {
  return (
    <>
      <Form inputs={loginForm}>
        <Button className='btn-outline'>Submit</Button>
      </Form>
    </>
  )
}

export default Login