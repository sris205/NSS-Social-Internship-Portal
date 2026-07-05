import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DailySubmission(){

    const { day } = useParams();

    const[photo, setPhoto] = useState(null);
    const[report, setReport] = useState("");

    const handleSubmit = async()=>{
        try{

            const user = JSON.parse(
                localStorage.getItem("user")
            );


            const formData = new FormData();

            formData.append("userId",user._id);
            formData.append("day",Number(day));
            formData.append("report",report);
            formData.append("photo",photo);
            const response = await axios.post(
                "https://nss-social-internship-portal-backend.onrender.com/api/submission/create",
                 formData
            );

            alert(response.data.message);
            navigate("/student-dashboard");

        }catch(error){
            console.log(error);

            alert(
                error.response?.data?.message
            );
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Day {day} Submission</h1>

            <input 
               type="file"
               onChange={(e)=>setPhoto(e.target.files[0])}
               className="w-full border rounded-lg p-3"
              />

            <br/><br/>

            <textarea
                 rows="5"
                 placeholder="Write your report"
                 value={report}
                 onChange={(e)=>setReport(e.target.value)}
                 className="w-full border rounded-lg p-3 mt-4"
             />

            <button
                  onClick={handleSubmit}
                  className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700"
                  >
                Submit
            </button>
              </div>   
        </div>
    );
}

export default DailySubmission;