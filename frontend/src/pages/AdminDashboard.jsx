import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard(){

    const[applications, setApplications] = useState([]);
    const[submissions, setSubmissions] = useState([]);

    const fetchApplications = async()=>{
        try{
            const response = await axios.get(
                "http://localhost:5000/api/application/all"
            );
             console.log(response.data);
             
            if(response.data.success){
                setApplications(
                    response.data.applications
                );
            }
        }catch(error){
            console.log(error);
            
        }
    };

    const approveApplication = async(applicationId)=>{
           try{

            const response = await axios.put(
                `http://localhost:5000/api/application/approve/${applicationId}`
            );

            alert(response.data.message);
            fetchApplications();

           }catch(error){
            console.log(error);
            
           }
    };

    const verifySubmission = async(submission)=>{
        try{

            const response = await axios.put(
                `http://localhost:5000/api/submission/verify/${submissionId}`
            );

            alert(response.data.message);
            fetchSubmissions();

        }catch(error){
            console.log(error);
        }
    };

    const notVerifySubmission = async(submission)=>{
        try{

            const response = await axios.put(
                `http://localhost:5000/api/submission/notVerify/${submissionId}`
            );

            alert(response.data.message);
            fetchSubmissions();

        }catch(error){
            console.log(error);
        }
    };

    const fetchSubmissions = async()=>{
        try{

            const response = await axios.get(
                "http://localhost:5000/api/submission/all"
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

    useEffect(()=>{
        fetchApplications();
        fetchSubmissions();
    },[]);


    return(
        <div>
            <h1>Admin Dashboard</h1>
        {
            applications.map((app)=>(
                <div key={app._id}>

                  <p>
                    User ID: {app.userId}
                    </p>  

                  <p>
                    Status:{app.status}
                    </p> 

                {
                    app.status==="pending" && (
                
                 <button
                    onClick={()=>approveApplication(app._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded">
                        Approve
                        </button>
                    )
                }   

            </div>         
            ))
        }

           <h2>Daily Submissions</h2> 
        {
            submissions.map((submission)=>(
                <div key={submission._id}>

                    <p>
                       Name: {submission.userId.name}
                    </p>

                    <p>
                        Email: {submission.userId.email}
                    </p>

                    <p>
                        Day: {submission.day}
                    </p>

                    <p>
                        Report: {submission.report}
                    </p>

                    <img
                       src={submission.photo}
                       alt="Submission"
                       width="200"
                       />

                    <p>
                        Status:{submission.status}
                    </p>

                    <button
                        onClick={()=>verifySubmission(submission._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded">
                          Verify
                    </button>

                    <button
                        onClick={()=>notVerifySubmission(submission._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                    >
                         Not Verify
                    </button>

                    </div>
            ))
        }

        </div>
    );
}

export default AdminDashboard;