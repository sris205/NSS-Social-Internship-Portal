import { Link } from "react-router-dom";

function Home(){
    return(

        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

            <h1 className="text-4xl font-bold mb-10">
                NSS Social Internship Portal
            </h1>

        <div className="flex gap-6">
          <Link to="/student-login">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg">
            Student Login
          </button>
          </Link>

          <Link to="/admin-login">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg">
            Admin Login
          </button>
          </Link>
        </div> 
        </div>

    );
}

export default Home;