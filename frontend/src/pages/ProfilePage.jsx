import { useState } from "react";
import axios from "axios";

function ProfilePage(){

    const[college,setCollege] = useState("");
    const[course, setCourse] = useState("");
    const[year, setYear] = useState("");
    const[mobile, setMobile] = useState("");
    const[address, setAddress] = useState("");
    const [errors, setErrors] = useState({
        college: "",
        course: "",
        year: "",
        mobile: "",
        address: ""
    });

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleSubmit = async()=>{

        setErrors({
            college: "",
            course: "",
            year: "",
            mobile: "",
            address: ""
        });

        if(college.trim().length < 3){
            setErrors(prev => ({
                ...prev,
                college: "College name must be at least 3 characters."
            }));
            return;
        }

        if(course.trim() === ""){
            setErrors(prev => ({
                ...prev,
                course: "Course is required."
            }));
            return;
        }

        if(year.trim() === ""){
            setErrors(prev => ({
                ...prev,
                year: "Year is required."
            }));
            return;
        }

        const mobileRegex = /^[6-9]\d{9}$/;

        if(!mobileRegex.test(mobile)){
            setErrors(prev => ({
                ...prev,
                mobile: "Enter a valid 10-digit mobile number."
            }));
            return;
        }

        if(address.trim().length < 5){
            setErrors(prev => ({
                ...prev,
                address: "Address must be at least 5 characters."
            }));
            return;
        }

        try{
            const response = await axios.post(
                "https://nss-social-internship-portal-backend.onrender.com/api/profile/create",
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
                    setErrors(prev => ({
                ...prev,
                address:
                    error.response?.data?.message ||
                    "Something went wrong."
            }));

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
                  onChange={(e)=>{
                        setCollege(e.target.value);

                        setErrors(prev => ({
                            ...prev,
                            college: ""
                        }));
                    }}
                   className="w-full border p-3 mb-4 rounded"
                   />

                   {
                    errors.college && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.college}
                        </p>
                    )
                }

                 <select
                    value={course}
                    onChange={(e)=>{
                        setCourse(e.target.value);

                        setErrors(prev => ({
                            ...prev,
                            course: ""
                        }));
                    }}
                    className="w-full border p-3 mb-4 rounded"
                >
                    <option value="">Select Course</option>
                    <option value="B.Tech CSE">B.Tech CSE</option>
                    <option value="B.Tech IT">B.Tech IT</option>
                    <option value="B.Tech ECE">B.Tech ECE</option>
                    <option value="B.Tech EE">B.Tech EE</option>
                    <option value="B.Tech ME">B.Tech ME</option>
                    <option value="B.Tech CE">B.Tech CE</option>
                    <option value="B.Tech CHE">B.Tech CHE</option>
                </select>

                   {
                    errors.course && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.course}
                        </p>
                    )
                }

                   <select
                   value={year}
                  onChange={(e)=>{
                    setYear(e.target.value);

                    setErrors(prev => ({
                        ...prev,
                        year: ""
                    }));
                }}
                   className="w-full border p-3 mb-4 rounded"
                   >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                </select>

                   {
                    errors.year && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.year}
                        </p>
                    )
                }

                   <input
                   type="text"
                   placeholder="Mobile Number"
                   value={mobile}
                 onChange={(e)=>{
                    setMobile(e.target.value);

                    setErrors(prev => ({
                        ...prev,
                        mobile: ""
                    }));
                }}
                   className="w-full border p-3 mb-4 rounded"
                   />

                   {
                    errors.mobile && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.mobile}
                        </p>
                    )
                }

                    <textarea
                   type="text"
                   placeholder="Address"
                   value={address}
                   onChange={(e)=>{
                    setAddress(e.target.value);

                    setErrors(prev => ({
                        ...prev,
                        address: ""
                    }));
                }}
                   className="w-full border p-3 mb-4 rounded"
                   />

                   {
                    errors.address && (
                        <p className="text-red-500 text-sm mb-3">
                            {errors.address}
                        </p>
                    )
                }

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