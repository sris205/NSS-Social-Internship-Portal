import { useState } from "react";
import axios from "axios";

function StudentRegister(){

    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const handleSubmit = async(e) => {

        e.preventDefault();

       try{
        const response = await axios.post(
             "http://localhost:5000/api/auth/register",
             {
                name,
                email,
                password
             }
        );
        console.log(response.data);
        alert("Registration Successful!");
       }catch(error){
        console.log(error);
        alert("Registration Failed!");
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
               onChange={(e)=>setName(e.target.value)}
               className="w-full border p-3 mb-4 rounded"/>

            <input
               type="email"
               placeholder="Enter Email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)} 
               className="w-full border p-3 mb-4 rounded"/>

            <input
               type="password"
               placeholder="Enter Password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)} 
               className="w-full border p-3 mb-4 rounded"/>  

            <button 
               className="w-full bg-blue-500 text-white p-3 rounded">
                Register
            </button>     

            </form>
        </div>
    );
}

export default StudentRegister;