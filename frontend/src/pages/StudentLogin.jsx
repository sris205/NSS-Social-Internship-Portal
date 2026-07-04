import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentLogin(){

          const navigate = useNavigate();
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [errors, setErrors] = useState({
                email: "",
                password: ""
            });

          const handleSubmit = async(e)=>{
            e.preventDefault();

            setErrors({
                email: "",
                password: ""
            });

            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                setErrors(prev => ({
                    ...prev,
                    email: "Please enter a valid email address."
                }));
                return;
            }

            
            if (password.length < 6) {
                setErrors(prev => ({
                    ...prev,
                    password: "Password must be at least 6 characters."
                }));
                return;
            }

            try{
                const response = await axios.post(
                    "http://localhost:5000/api/auth/login",
                    {
                        email,
                        password
                    }
                );

                if(response.data.success){

                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );

                    alert("Login Successful");

                    if(response.data.user.role==="admin"){
                        navigate("/admin-dashboard");
                    }else{
                    navigate("/student-dashboard");
                    }

                }else{
                    setErrors(prev =>({
                        ...prev,
                        password:response.data.message
                    }));
                }
                
            }catch(error){
                console.log(error);
                setErrors(prev => ({
                    ...prev,
                    password:"Something went wrong"
                }));
               
            }
          };

    return(

        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Student Login
                </h2>

                <input
                   type="email"
                   placeholder="Enter Email"
                   value={email}
                   onChange={(e)=>{
                    setEmail(e.target.value);
                     
                    setErrors(prev=> ({
                        ...prev,
                        email:""
                    }));
                }}

                   className="w-full border p-3 mb-4 rounded"/>

                   {
                    errors.email && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.email}
                        </p>
                    )
                }

                <input
                   type="password"
                   placeholder="Enter Password"
                   value={password}
                   onChange={(e)=>{
                    setPassword(e.target.value);
                
                    setErrors(prev => ({
                        ...prev,
                        password:""
                    }));
                }}

                   className="w-full border p-3 mb-4 rounded"/>

                   {
                    errors.password && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.password}
                        </p>
                    )
                }

                <button 
                   type="submit"
                   className="w-full bg-blue-500 text-white p-3 rounded">
                    Login
                    </button>      
            </form>
        </div>
    );
}

export default StudentLogin;