import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard(){

    const[applications, setApplications] = useState([]);
    const[submissions, setSubmissions] = useState([]);
    const[stats,setStats] = useState({
        totalStudents:0,
        approvedStudents:0,
        totalReports:0,
        pendingReports:0
    });

    const groupedSubmissions = submissions.reduce(
        (acc, submission) => {

            const userId = submission.userId._id;
            if(!acc[userId]){
                acc[userId] = {
                    user:submission.userId,
                    submissions:[]
                };
            }

            acc[userId].submissions.push(
                submission
            );
            return acc;
        },
        {}
    )

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

                const totalStudents = 
                   response.data.applications.length;

                const approvedStudents = 
                   response.data.applications.filter(
                    app => app.status === "approved"
                   ).length;

                setStats(prev => ({
                    ...prev,
                    totalStudents,
                    approvedStudents
                })) ;  
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

                const totalReports = 
                   response.data.submissions.length;
                
                const pendingReports = 
                  response.data.submissions.filter(
                    submission => submission.status === "pending"
                  ).length;
                  
                setStats(prev => ({
                    ...prev,
                    totalReports,
                    pendingReports
                }));  
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">

                {/* Total Students */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-gray-500 text-lg font-semibold">
                        👨‍🎓 Total Students
                    </h3>

                    <p className="text-4xl font-bold text-blue-600 mt-3">
                        {stats.totalStudents}
                    </p>
                </div>

                {/* Approved Students */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-gray-500 text-lg font-semibold">
                        ✅ Approved Students
                    </h3>

                    <p className="text-4xl font-bold text-green-600 mt-3">
                        {stats.approvedStudents}
                    </p>
                </div>

                {/* Total Reports */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-gray-500 text-lg font-semibold">
                        📄 Total Reports
                    </h3>

                    <p className="text-4xl font-bold text-purple-600 mt-3">
                        {stats.totalReports}
                    </p>
                </div>

                {/* Pending Reports */}
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
                    <h3 className="text-gray-500 text-lg font-semibold">
                        ⏳ Pending Reports
                    </h3>

                    <p className="text-4xl font-bold text-red-500 mt-3">
                        {stats.pendingReports}
                    </p>
                </div>

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

            <div className="space-y-8">

                {
                    Object.values(groupedSubmissions).map(
                        (student)=>(
                            <div
                               key={student.user._id}
                               className="
                                  bg-white
                                  rounded-2xl
                                  shadow-xl
                                  p-6
                               "
                               >
                                <h2 className="text-2xl font-bold text-blue-600">
                                     👤 {student.user.name}
                                </h2>

                                <p className="text-gray-500 mb-6">
                                    {student.user.email}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {
                                        student.submissions.map(
                                            (submission)=>(
                                                <div
                                                   key={submission._id}
                                                   className="
                                                     border
                                                     rounded-xl
                                                     p-4
                                                   "
                                                   >

                                                 <h3 className="font-bold text-lg">
                                                    Day{submission.day}
                                                    </h3> 

                                                 <p className="mt-2">
                                                    {submission.report}
                                                    </p> 

                                                 <img
                                                   src={submission.photo}  
                                                   alt="Submission"     
                                                   className="
                                                      w-full
                                                      h-40
                                                      object-cover
                                                      rounded-lg
                                                      mt-3
                                                   "
                                                   />

                                                   <div className="mt-3">

                                                    <span
                                                      className={
                                                        submission.status==="verified"
                                                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                                                        : submission.status==="pending"
                                                        ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                                                        :"bg-red-100 text-red-700 px-3 py-1 rounded-full"
                                                      }
                                                      >
                                                        {submission.status}
                                                      </span>
                                                    </div>
                                                    <div className="flex gap-2 mt-4">

                                                        <button
                                                          onClick={()=>
                                                            verifySubmission(
                                                                submission._id
                                                            )
                                                          }  
                                                          className="
                                                             bg-green-600
                                                             text-white
                                                             px-3
                                                             py-2
                                                             rounded
                                                          "
                                                          >
                                                            Verify
                                                          </button>

                                                          <button
                                                             onClick={()=>
                                                                notVerifySubmission(
                                                                    submission._id
                                                                )
                                                             }
                                                             className="
                                                               bg-red-600
                                                               text-white
                                                               px-3
                                                               py-2
                                                               rounded  
                                                             "
                                                             >
                                                                Reject
                                                             </button>

                                                    </div>
                                            </div>
                                                        
                                            )
                                        )
                                    }

                                 </div>
                            </div>        
                        )
                    )
                }
                </div>
               
   </div>
               
);
}


export default AdminDashboard;