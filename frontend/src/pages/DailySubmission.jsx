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
                "http://localhost:5000/api/submission/create",
                 formData
            );

            alert(response.data.message);
            navigate("/student-dashboard");

        }catch(error){
            console.log(error);
        }
    };

    return(
        <div>
            <h1>Day {day} Submission</h1>

            <input 
               type="file"
               onChange={(e)=>setPhoto(e.target.files[0])}
              />

            <br/><br/>

            <textarea
                 placeholder="Write your report"
                 value={report}
                 onChange={(e)=>setReport(e.target.value)}
             />

            <button
                  onClick={handleSubmit}>
                Submit
            </button>
                 
        </div>
    );
}

export default DailySubmission;