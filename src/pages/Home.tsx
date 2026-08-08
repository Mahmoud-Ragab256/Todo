import TodoList from "../components/ui/TodoList";
import ErrorHandler from "../components/errors/ErrorHandler";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";


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

  if (isPending) return <h3>Loading...</h3>
  if (error || !data) return <ErrorHandler />


  return (
    <>
      <div className="w-100 md:w-150 lg:w-200 mx-auto">
        <TodoList todos={data.todos} jwt={userData.jwt} />
      </div>
    </>
  )
}

export default Home