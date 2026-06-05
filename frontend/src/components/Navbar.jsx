import { Link } from "react-router-dom";

function Navbar(){
    return(
        <nav className="bg-blue-600 text-white p-4 px-8 flex justify-between items-center">
            <h1 className="font-bold text-2xl">
                NSS Portal
            </h1>

        <div className="flex gap-4">
           <Link to="/">Home</Link> 
           <Link to="/student-register">Register</Link>  
           <Link to="/student-login">Login</Link>
            </div>    
        </nav>
    );
}

export default Navbar;