import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import UserGuard from "../components/auth/UserGuard";
import Home from "../pages/Home";
import ErrorHandler from "../components/errors/ErrorHandler";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>

        <Route index element={
          <ProtectedRoute redirectPath="/login" >
            <Home />
          </ProtectedRoute>} >
        </Route>
        <Route path="profile" element={
          <ProtectedRoute redirectPath="/login" >
            <h1>This is Profile</h1>
          </ProtectedRoute>} >
        </Route>

        <Route path="login" element={
          <UserGuard redirectPath="/">
            <Login />
          </UserGuard>
        } >
        </Route>

        <Route path="register" element={
          <UserGuard redirectPath="/">
            <Register />
          </UserGuard>
        }>
        </Route>

      </Route>
    </>
  )
)


export default router