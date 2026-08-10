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
      <nav className="navbar w-100 bg-indigo-700 text-white p-4 mx-auto my-8 md:w-150 lg:w-200 rounded-md ">
        <div className="nav-menu flex justify-between items-center">
          <div >
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/todos'>All Todos</NavLink>
          </div>

          {userData ? <div className="hover:text-gray-200 transition duration-200"><NavLink to='/' onClick={() => logout()}>Logout</NavLink></div>
            : <div className="nav-actions flex gap-4">
              <NavLink to='/login'>login</NavLink>
              <NavLink to='/register'>register</NavLink>
            </div>}


        </div>
      </nav>
    </>
  )
}

export default Navbar