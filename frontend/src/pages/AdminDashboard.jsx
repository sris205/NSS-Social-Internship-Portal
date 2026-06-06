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

    const verifySubmission = async(submissionId)=>{
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
            
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold">
                🛡️ Admin Dashboard
            </h1>

            <p className="text-purple-100 mt-2 text-lg">
                Manage Applications and Daily Reports
            </p>
            </div>

            <h2 className="text-3xl font-bold mb-6">
            📋 Internship Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {applications.map((app) => (

                <div
                key={app._id}
                className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    p-5
                    hover:shadow-xl
                    transition
                "
                >

                <h3 className="text-xl font-bold mb-3">
                    Application
                </h3>

                <p className="text-gray-600 break-all">
                    User ID:
                </p>

                <p className="text-sm text-gray-500 mb-4">
                    {app.userId}
                </p>

                <span
                    className={
                    app.status === "approved"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                    }
                >
                    {app.status}
                </span>

                {app.status === "pending" && (

                    <button
                    onClick={() => approveApplication(app._id)}
                    className="
                        mt-4
                        block
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                    >
                    ✓ Approve
                    </button>

                )}

                </div>

            ))}

            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">
            📅 Daily Submissions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {submissions.map((submission) => (

                <div
                key={submission._id}
                className="
                    bg-white
                    rounded-2xl
                    shadow-lg
                    hover:shadow-2xl
                    transition
                    p-5
                "
                >

                <h3 className="text-xl font-bold">
                    👤 {submission.userId.name}
                </h3>

                <p className="text-gray-500">
                    {submission.userId.email}
                </p>

                <p className="mt-3 font-semibold">
                    📅 Day {submission.day}
                </p>

                <p className="mt-3 text-gray-700">
                    {submission.report}
                </p>

                <img
                    src={submission.photo}
                    alt="Submission"
                    className="
                    w-full
                    h-48
                    object-cover
                    rounded-xl
                    mt-4
                    "
                />

                <div className="mt-4">

                    <span
                    className={
                        submission.status === "verified"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : submission.status === "pending"
                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                        : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    }
                    >
                    {submission.status}
                    </span>

                </div>

                <div className="flex gap-3 mt-5">

                    <button
                    onClick={() =>{

                        verifySubmission(submission._id)
                    }}
                    className="
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                    >
                    ✓ Verify
                    </button>

                    <button
                    onClick={() =>
                        notVerifySubmission(submission._id)
                    }
                    className="
                        bg-red-600
                        hover:bg-red-700
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                    >
                    ✗ Reject
                    </button>

                </div>

                </div>

            ))}

            </div>
        </div>
);
}

export default AdminDashboard;