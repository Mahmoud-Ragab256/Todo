import api from "../config/axios.config"
import { useQuery } from "@tanstack/react-query"
import TodoList from "../components/ui/TodoList";
import ErrorHandler from "../components/errors/ErrorHandler";

interface ITodo {
  title: string;
  id: number
}

function Home() {

  const storageKey = "userData"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { isPending, data, error } = useQuery<{ todos: ITodo[] }>({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await api.get("/users/me?populate=todos", {
        headers: {
          Authorization: `Bearer ${userData.jwt}`
        }
      })
      return data
    }
  })


  if (isPending) return <h3>Loading...</h3>
  if (error || !data) return <ErrorHandler />

  return (
    <>
      <div className="w-100 md:w-150 lg:w-200 mx-auto">
        <TodoList data={data} />
      </div>
    </>
  )
}

export default Home