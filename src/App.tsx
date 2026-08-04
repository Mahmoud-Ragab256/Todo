import Navbar from './components/Navbar'
import Form from './components/Form'
import { loginForm, signupForm } from './data/forms'
import Button from './components/ui/Button'

function App() {

  return (
    <>

      <Navbar />
      <Form inputs={loginForm}>
        <Button className='btn-outline'>Submit</Button>
      </Form>
      <Form inputs={signupForm}>
        <Button className='btn-outline'>Submit</Button>
      </Form>
    </>
  )
}

export default App
