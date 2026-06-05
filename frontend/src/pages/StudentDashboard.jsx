import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function StudentDashboard(){

    const[profileExists, setProfileExists] = useState("false");
    const[applicationExists, setApplicationExists] = useState("false");
    const[applicationStatus, setApplicationStatus] = useState("");
    const[submissions,setSubmissions] = useState([]);

    const checkProfile = async()=>{
        try{
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await axios.get(
                `http://localhost:5000/api/profile/${user._id}`
            );

            if(response.data.success){
                setProfileExists(true);
            }
        }catch(error){
            console.log(error);
        }
    };

    const checkApplication = async()=>{
        try{

            const user = JSON.parse(
               localStorage.getItem("user") 
            );

            const response = await axios.get(
                `http://localhost:5000/api/application/${user._id}`
            );

            if(response.data.success){
                setApplicationExists(true);

                setApplicationStatus(
                    response.data.application.status
                );
            }

        }catch(error){
            console.log(error);
        }
    };

    const fetchSubmissions = async()=>{
        try{

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await axios.get(
                `http://localhost:5000/api/submission/${user._id}`
            );

            if(response.data.success){
                setSubmissions(
                    response.data.submissions
                );
            }

        }catch(error){
            console.log(error);
        }
    };

       useEffect(() => {
        checkProfile();
        checkApplication();
        fetchSubmissions();
    }, []);

    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () =>{
        localStorage.removeItem("user");
        navigate("/student-login");
    };

    const nextDay = submissions.length + 1;
    const pendingDays = [];
    for(let day=1;day<=10;day++){

        const completed = submissions.some(
            (submission) => submission.day === day
        );
         
        if(!completed){
            pendingDays.push(day);''
        }
    }

    return(
        <div>
            <h1>Student Dashboard</h1>

            <h2>
                Welcome {user?.name}
            </h2>

            <p>
                {user?.email}
            </p>

            <p>
                Completed: {submissions.length}/10 Days
            </p>

            <h3>Completed Days</h3>
            {
                submissions.map((submission)=>(
                    <div
                        keys={submission._id}
                        className="border p-2 my-2">
                     <p>   Day {submission.day}-
                        {submission.status==="verified" ? "Verified" 
                        : submission.status==="not verified" ? 
                        "Not Verified" : "Pending"}

                     </p>
                     <p>Report:{submission.report}</p>
                     <a 
                        href={submission.photo}
                        target="blank"
                        rel="noreferrer" >
                            View Photo   
                        </a>
                     </div>
                ))
            }

            <h3>Pending Days</h3>
            {
                pendingDays.map((day)=>(
                    <p key={day}>
                        Day{day}
                    </p>
                ))
            }

            {
                !profileExists?(
                    <button
                       onClick={()=>navigate("/profile")}
                       className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                        Complete Profile
                       </button>
                ): applicationExists? (

                        applicationStatus==="approved"?(

                            <div>
                              <h3>Application Approved</h3>
                              {
                                submissions.length === 10 ? (

                                    <p>Internship Completed</p>
                                ):(    
                              <button
                                onClick={()=>
                                    navigate(`/submit-day/${nextDay}`)
                                }
                                 className="bg-green-500 text-white px-4 py-2 rounded">
                                    Submit Day {nextDay}
                                 </button>
                                )
                               }    
                             
                            </div>
                            
                        ):(    

                    <div className="mt-4">
                        <h3>Application Submitted</h3>
                        <p>Status:Pending Approval</p>
                    </div>  
                        )
                      
                ):(      
                    <button
                       
                       className="bg-green-500 text-white px-4 py-2 rounded mt-4">
                        Apply for Internship
                       </button>
                )
            }

            <button
               onClick={handleLogout}
               className="bg-red-500 text-white px-4 py-2 rounded mt-4">
                Logout
               </button>
        </div>
    );
}

export default StudentDashboard;