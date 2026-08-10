import { NavLink, useLocation } from "react-router"

function Navbar() {

  const { pathname } = useLocation()
  const storageKey = "userData"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null

  const logout = () => {
    localStorage.removeItem(storageKey)

    setTimeout(() =>
      location.replace(pathname))
      , 1000
  }

  return (
    <>
      <nav className="navbar w-100 text-gray-500 p-4 mx-auto my-8 md:w-150 lg:w-200 rounded-md ">
        <div className="nav-menu flex justify-between items-center">
          <div >
            <NavLink className="hover:text-indigo-700" to='/'>Home</NavLink>
          </div>

          {userData ? <div className="transition duration-200 space-x-3">
            <NavLink className="hover:text-indigo-700" to='/todos'>All Todos</NavLink>
            <NavLink className="text-white bg-indigo-700 p-3 rounded-md" to='/' onClick={() => logout()}>Logout</NavLink>
          </div>
            : <div className="nav-actions flex gap-1">
              <NavLink className="text-white bg-indigo-700 p-3 px-5 rounded-md" to='/login'>login</NavLink>
              <NavLink className="btn-outline p-3 rounded-md transition duration-300" to='/register'>register</NavLink>
            </div>}


        </div>
      </nav>
    </>
  )
}

export default Navbar