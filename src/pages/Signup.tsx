import Button from "../components/ui/Button"
import Form from "../components/ui/Form"
import { signupForm } from "../data/forms"


function Signup() {
  return (
    <>
      <Form inputs={signupForm}>
        <Button className='btn-outline'>Submit</Button>
      </Form>
    </>
  )
}

export default Signup