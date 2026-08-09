import TodoList from "../components/ui/TodoList";
import ErrorHandler from "../components/errors/ErrorHandler";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import Button from "../components/ui/Button";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { todoSchema } from "../validation";

function Home() {

  const storageKey = "userData"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;



  const { isPending, data, error } = useAuthenticatedQuery(
    ['todos'],
    "/users/me?populate=todos",
    {
      headers: {
        Authorization: `Bearer ${userData.jwt}`
      }
    })

  if (isPending) return (
    <div role="status" className="max-w-sm animate-pulse mx-auto">
      <div className="h-2.5 bg-gray-100 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-100  rounded-full max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )

  if (error || !data) return <ErrorHandler />


  return (
    <>
      <div className="w-100 md:w-150 lg:w-200 mx-auto">
        <Button className="btn block mx-auto my-4">Post new todo</Button>
        <TodoList todos={data.todos} jwt={userData.jwt} />
      </div>
    </>
  )
}

export default Home