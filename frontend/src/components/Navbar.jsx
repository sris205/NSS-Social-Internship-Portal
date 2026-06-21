import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/student-login");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        <h1 className="text-3xl font-bold tracking-wide">
          NSS Portal
        </h1>

        {
          user ? (

            <div className="flex items-center gap-4">

              <span className="font-medium">
                Welcome, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="
                  bg-red-500
                  hover:bg-red-600
                  px-4
                  py-2
                  rounded-lg
                  font-semibold
                  transition
                "
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="flex gap-6 text-lg">

              <Link
                to="/"
                className="hover:text-blue-200 transition"
              >
                Home
              </Link>

              <Link
                to="/student-register"
                className="hover:text-blue-200 transition"
              >
                Register
              </Link>

              <Link
                to="/student-login"
                className="hover:text-blue-200 transition"
              >
                Login
              </Link>

            </div>

          )
        }

      </div>
    </nav>
  );
}

export default Navbar;  