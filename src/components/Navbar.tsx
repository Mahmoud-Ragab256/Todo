
function Navbar() {
  return (
    <>
      <nav className="navbar w-100 bg-indigo-700 text-white p-4 mx-auto my-4 md:w-150 lg:w-200 rounded-md ">
        <div className="nav-menu flex justify-between items-center">
          <div >
            <a className="cursor-pointer" href="/home">
              Home
            </a>
          </div>

          <div className="nav-actions flex gap-4">
            <a className="cursor-pointer" href="/login">
              Login
            </a>
            <a className="cursor-pointer" href="/signup">
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar