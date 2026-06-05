import { useState } from "react";
import axios from "axios";

function ProfilePage(){

    const[college,setCollege] = useState("");
    const[course, setCourse] = useState("");
    const[year, setYear] = useState("");
    const[mobile, setMobile] = useState("");
    const[address, setAddress] = useState("");

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleSubmit = async()=>{
        try{
            const response = await axios.post(
                "http://localhost:5000/api/profile/create",
                {
                    userId:user._id,
                    college,
                    course,
                    year,
                    mobile,
                    address
                }
            );
            alert(response.data.message);
        }catch(error){
            console.log(error);
            alert("Something went wrong");
        }
    };

    return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
             <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Complete Profile
                </h2>

                <input
                   type="text"
                   placeholder="College"
                   value={college}
                   onChange={(e)=>setCollege(e.target.value)}
                   className="w-full border p-3 mb-4 rounded"
                   />

                   <input
                   type="text"
                   placeholder="Course"
                   value={course}
                   onChange={(e)=>setCourse(e.target.value)}
                   className="w-full border p-3 mb-4 rounded"
                   />

                   <input
                   type="text"
                   placeholder="Year"
                   value={year}
                   onChange={(e)=>setYear(e.target.value)}
                   className="w-full border p-3 mb-4 rounded"
                   />

                   <input
                   type="text"
                   placeholder="Mobile Number"
                   value={mobile}
                   onChange={(e)=>setMobile(e.target.value)}
                   className="w-full border p-3 mb-4 rounded"
                   />

                    <textarea
                   type="text"
                   placeholder="Address"
                   value={address}
                   onChange={(e)=>setAddress(e.target.value)}
                   className="w-full border p-3 mb-4 rounded"
                   />

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 text-white p-3 rounded">
                            Save Profile
                        </button>
             </div>
         </div>
    );
}

export default ProfilePage;