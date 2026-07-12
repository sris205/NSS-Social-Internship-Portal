import { useState } from "react";
import axios from "axios";

function StudentRegister(){

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[errors, setErrors] = useState({
        name:"",
        email: "",
        password: ""
    });

    const handleSubmit = async(e) => {

        e.preventDefault();

        setErrors({
            name:"",
            email: "",
            password: ""
        });

       
        if(name.trim().length < 3){
            setErrors(prev => ({
                ...prev,
                name: "Name must contain at least 3 characters."
            }));
            return;
        }

    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){
            setErrors(prev => ({
                ...prev,
                email: "Please enter a valid email."
            }));
            return;
        }

        
        if(password.length < 3){
            setErrors(prev => ({
                ...prev,
                password: "Password must be at least 3 characters."
            }));
            return;
        }

       try{
        const response = await axios.post(
             "https://nss-social-internship-portal-backend.onrender.com/api/auth/register",
             {
                name,
                email,
                password
             }
        );
        console.log(response.data);
        setErrors("");
        alert("Registration Successful!");
       }catch(error){
        console.log(error);
         console.log("Status:", error.response?.status);
        console.log("Data:", error.response?.data);
        console.log("Full Error:", error);
    }
        setErrors(
            error.response?.data?.message||
            "Registration Failed!"
        );

       }
    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-lg shadow-lg w-96">
            
            <h2 className="text-3xl font-bold mb-6 text-center">
                Student Register
            </h2>

            <input
               type="text"
               placeholder="Enter Name"
               value={name}
               onChange={(e)=>{
                setName(e.target.value);

                setErrors(prev => ({
                    ...prev,
                    name:""
                }));

            }}

               className="w-full border p-3 mb-4 rounded"/>

            {
                errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name}
                    </p>
                )
            }

            <input
               type="email"
               placeholder="Enter Email"
               value={email}
               onChange={(e)=>{
                setEmail(e.target.value);

                setErrors(prev=>({
                    ...prev,
                    email:""
                }));

            }} 

               className="w-full border p-3 mb-4 rounded"/>

            {
                errors.email && (
                    <p className="text-red-500 text-sm mt-1">
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

                setErrors(prev=>({
                    ...prev,
                    password:""
                }));

            }}
             
               className="w-full border p-3 mb-4 rounded"/>  

            {
                errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                )
            }


            <button 
               className="w-full bg-blue-500 text-white p-3 rounded">
                Register
            </button>     

            </form>
        </div>
    );
}

export default StudentRegister;