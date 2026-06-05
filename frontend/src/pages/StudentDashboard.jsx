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
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
            <h1 className="text-4xl font-bold text-blue-600">
                Student Dashboard</h1>

            <p className="text-gray-500 mt-1">
               Track your NSS Internship Progress
                </p> 

             </div>      
           <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h1 className="text-4xl font-bold text-blue-600">
                Welcome {user?.name}
            </h1>

            {/* <p className="text-gray-600">
                {user?.email}
            </p> */}

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full mt-3 inline-block">
                   Application Approved
                </span>
            

            <p className="mt-4 font-semibold text-xl text-blue-600">
                Completed: {submissions.length}/10 Days
            </p>
            </div>

            <h3 className="text-xl font-bold mb-4">
                Completed Days</h3>
                <div className="grid grid-cols-3 gap-4">
            {
                submissions.map((submission)=>(
                    <div
                        keys={submission._id}
                        className="bg-white shadow-md rounded-xl p-4 mb-4">
                     <h3 className="text-lg font-bold">
                        Day{submission.day}
                            <span
                               className={
                                  submission.status === "verified"
                                  ? "bg-green-100 text-green-700 px-3 py-1 rounded-full ml-2"
                                  : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full ml-2"
                               }
                               >
                                {submission.status}
                               </span>
                     </h3>
                     <p className="mt-3 text-sm">
                        Report:{submission.report}</p>
                     <a 
                        href={submission.photo}
                        target="blank"
                        rel="noreferrer" 
                        className="text-blue-600 font-semibold block mt-2"
                        >
                            View Photo   
                        </a>
                     </div>
                ))
            }
            </div>
            

            <h3 className="text-xl font-bold mb-4">
                Pending Days</h3>
                <div className="grid grid-cols-3 gap-4">
            {
                pendingDays.map((day)=>(
                    <div
                     key={day}
                     className="bg-white rounded-xl shadow-md p-4 text-center"
                     >
                     <h3 className="text-lg font-bold">  
                        Day{day}
                    </h3>

                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        Not Submitted
                      </span>
                    </div>    
                ))
            }
            </div>

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