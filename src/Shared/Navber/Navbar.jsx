import "animate.css";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { AuthContext } from "../../ContextProvider/ContextProvider";
const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { Logout, user } = useContext(AuthContext);

  console.log(user);

  return (
    <div>
      <nav className="relative">
        <div className="container py-4 mx-auto max-w-7xl px-4 lg:px-0">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="flex items-center justify-between">
              <Link to="/">
                <h1 className="font-bold text-4xl text-black"> E-Dokan</h1>
              </Link>
              <div className="flex lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className=""
                  aria-label="toggle menu"
                >
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h16M4 16h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div
              className={`flex lg:flex lg:items-center justify-center lg:justify-between  w-full lg:w-auto transition-transform duration-300 ease-in-out 
              ${isOpen ? "block  " : "hidden"} lg:block`}
            >
              <div className=" flex flex-col  lg:flex-row lg:items-center lg:mx-8 lg:space-x-2 ">
                <NavLink
                  to="/"
                  className="btn btn-sm  border-b-2 border-gray-300 hover:bg-black hover:text-white "
                >
                  Home
                </NavLink>

                <NavLink
                  to="/contract"
                  className="btn btn-sm border-2 border-gray-300 hover:bg-black hover:text-white "
                >
                  Contract
                </NavLink>
              </div>

              <div className="flex items-center mt-4 lg:mt-0">
                {user ? (
                  <div className="flex items-center tooltip">
                    <div className="dropdown dropdown-end tooltip ">
                    <div tabIndex={0} role="button" className="relative">
  <div
    tabIndex={0}
    role="button"
    className="border rounded-full border-gray-300 z-[110] avatar"
  >
    <div className="rounded-full w-9 md:w-12">
      <img className="rounded-full" alt="" src={user?.photoURL || ""} />
    </div>
  </div>


  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    Click Me
  </div>
</div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content  rounded-md flex  z-[100] menu p-2 gap-2 shadow bg-base-100  w-52 py-5"
                      >
                        <div className="flex justify-center">
                          <img
                            className="rounded-full w-20 text-center"
                            src={user?.photoURL || ""}
                            alt=""
                          />
                        </div>
                        <li className="ml-7 text-xl font-bold ">
                          {user?.displayName}
                        </li>

                        <button onClick={Logout} className="text-start ml-7">
                          <a
                            href="#_"
                            className="relative inline-block px-8 py-2 font-medium group"
                          >
                            <span className="absolute text-black inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-teal-400 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                            <span className="absolute inset-0 w-full h-full bg-white border-2 border-purple-500  group-hover:bg-purple-500 "></span>
                            <span className="relative text-black font-bold group-hover:text-black">
                              Logout
                            </span>
                          </a>
                        </button>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="rounded-md btn-sm  m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#ff4880] text-[#ff4880] hover:text-white"
                  >
                    <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#ff4880] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
                    <span className="relative text-[#ff4880] transition duration-300 group-hover:text-white ease">
                      Login
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar2;
