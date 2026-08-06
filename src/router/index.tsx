import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TodoList from "../components/ui/TodoList";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<TodoList />} ></Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="register" element={<Register />} ></Route>
      </Route>
    </>
  )
)


export default router