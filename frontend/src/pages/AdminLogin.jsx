import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin(){

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async(e)=>{

        e.preventDefault();

        try{

            const response = await axios.post(
                "https://nss-social-internship-portal-backend.onrender.com/api/auth/login",
                {
                    email,
                    password
                }
            );

            if(response.data.success){

                if(response.data.user.role !== "admin"){

                    alert("Only admins can login here");
                    return;
                }

                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );

                alert("Admin Login Successful");

                navigate("/admin-dashboard");
            }

        }catch(error){

            console.log(error);

            alert("Login Failed");
        }
    };

    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Admin Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full border p-3 mb-4 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-3 rounded"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default AdminLogin;