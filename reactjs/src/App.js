import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { IsLoggedIn } from "./Auth/Auth";
import { Setbg } from "./components/backgroundStore";

function App() {
  const handleSetLogin = () => {
    localStorage.setItem("isLogin", "0");
    localStorage.setItem("admin_access_token", "");
    localStorage.setItem("user", {});
  };

    const [togglenav, setTogglenav] = useState(false);
    const handleToggle = () => {
      setTogglenav(!togglenav);
    };

  const navigate = useNavigate();

  useEffect(() => {
    if (IsLoggedIn() !== "1") {
      navigate("/login"); // Redirect to login if not authenticated
    } else if (IsLoggedIn) {
    }
  }, [navigate]);

  if (IsLoggedIn() !== "1") {
    return;
  }


  return (
    <div className="flex min-h-screen">
      <div
        className={`h-[120vh] md:w-6/12 w-7/12 bg-gray-900 bg-opacity-90 fixed xl:hidden top-0 text-white z-30 pt-4 transition-all duration-500 ${
          togglenav ? "left-0" : "-left-full"
        }`}
      >
        <div className="text-xl font-bold text-white px-4">My Dashboard</div>
        <nav className="space-y-4 px-[1px] pt-8 font-semibold md:text-lg *:border-b *:border-gray-500">
          <Link
            onClick={handleToggle}
            to="/"
            className=" focus:outline-none block py-2 px-4 hover:bg-gray-700"
          >
            Dashboard
          </Link>
          <Link
            onClick={handleToggle}
            to="/news"
            className=" focus:outline-none block py-2 px-4 rounded hover:bg-gray-700"
          >
            News
          </Link>

          <Link
            onClick={handleToggle}
            to="/background"
            className=" focus:outline-none block py-2 px-4 rounded hover:bg-gray-700"
          >
            Background
          </Link>

          <Link
            to="/login"
            onClick={handleSetLogin}
            className=" focus:outline-none block py-2 px-4 rounded hover:bg-gray-700"
          >
            Logout
          </Link>
        </nav>
      </div>

      {Setbg() === null ? (
        ""
      ) : (
        <div
          style={{
            backgroundImage: `url(${Setbg()})`,
          }}
          className="bg-cover bg-center object-cover object-center h-full fixed top-0 left-0 w-full"
        >
          <div className="fixed w-full inset-0 top-0 left-0 bg-opacity-55 bg-gray-800"></div>
        </div>
      )}

      {/* Sidebar */}
      <div className="hidden xl:block sticky top-0 left-0 h-full">
        <Sidebar handleSetLogin={handleSetLogin} />
      </div>
      {/* Main Content */}
      <div className="flex-grow">
        <Header handleToggle={handleToggle} togglenav={togglenav} />
        <main className="z-10 sticky">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
