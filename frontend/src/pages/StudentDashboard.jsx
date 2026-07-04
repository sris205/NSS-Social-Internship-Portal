import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";



function StudentDashboard(){

    const[profileExists, setProfileExists] = useState(false);
    const[applicationExists, setApplicationExists] = useState(false);
    const[applicationStatus, setApplicationStatus] = useState("");
    const[submissions,setSubmissions] = useState([]);
    const[startDate, setStartDate] = useState(null);
    const[profile,setProfile] = useState(null);

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
            setProfileExists(false);
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

                setStartDate(
                    response.data.application.startDate
                );
            }

        }catch(error){
            setApplicationExists(false);
            setApplicationStatus("");
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

    const fetchProfile = async()=>{
        try{

            const response = await axios.get(
                `http://localhost:5000/api/profile/${user._id}`
            );

            if(response.data.success){
                setProfile(response.data.profile);
            }

        }catch(error){
            console.log(error);
        }
    };

        const getBase64Image = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

  const generateCertificate = async () => {

    try {

        const response = await axios.get(
            `http://localhost:5000/api/certificate/${user._id}`,
            {
                responseType: "blob"
            }
        );

        const url = window.URL.createObjectURL(
            new Blob([response.data])
        );

        const link = document.createElement("a");

        link.href = url;
        link.download = "NSS_Certificate.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Unable to generate certificate"
        );

    }

};

    const generateReport = async()=>{
         
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.text("NSS INTERNSHIP REPORT", 20, 20);

        doc.setFontSize(12);
        doc.text(`Student Name: ${user.name}`, 20, 35);

        let y = 50;

        for (const submission of submissions) {

        doc.setFontSize(14);
        doc.text(
            `Day ${submission.day}`,
            20,
            y
        );

        y += 10;

        const imageData = await getBase64Image(
            submission.photo
        );

        doc.addImage(
            imageData,
            "JPEG",
            20,
            y,
            60,
            40
        );

        y += 50;

        doc.setFontSize(11);

        doc.text(
            `Report: ${submission.report}`,
            20,
            y
        );

        y += 10;

        doc.text(
            `Status: ${submission.status}`,
            20,
            y
        );

        y += 20;

        if (y > 240) {
            doc.addPage();
            y = 20;
        }
    }

        doc.save(
            `${user.name}_Internship_Report.pdf`
        );
    };

       useEffect(() => {
        checkProfile();
        checkApplication();
        fetchSubmissions();
        fetchProfile();
    }, []);

    const navigate = useNavigate();
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () =>{
        localStorage.removeItem("user");
        navigate("/student-login");
    };

    let currentDay = 0;

    if(startDate){

        const internshipStart = 
                new Date(startDate);
            
        const today = new Date();
        
        const diffDays = Math.floor(
            (
                today-internshipStart
            )/
            (
                1000*60*60*24
            )
        );

        currentDay = diffDays+1;
    }

    const nextDay = currentDay;
    const todaySubmitted = submissions.some(
        submission => submission.day === currentDay
    );

    const pendingDays = [];
    for(let day=1;day<=10;day++){

        const completed = submissions.some(
            (submission) => submission.day === day
        );
         
        if(!completed){
            pendingDays.push(day);
        }
    }

    const missedDays = [];
    for(let day=1;day<currentDay;day++){

        const submitted = submissions.some(
            submission => submission.day === day
        );

        if(!submitted){
            missedDays.push(day);
        }
    }

    const allVerified = 
            submissions.length === 10 &&
            submissions.every(
                (submission)=>
                    submission.status === "verified"
            );

    return(
      
     <div className="min-h-screen bg-gray-100 p-6">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl p-8 mb-6">
        <h1 className="text-4xl font-bold">
            🎓 Student Dashboard
        </h1>

        <p className="text-blue-100 mt-2 text-lg">
            Track your NSS Internship Progress
        </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl mb-8">
            <div className="flex justify-end">
                <button
                   onClick={()=>
                    navigate("/profile-view")
                   }
                   className="
                   w-14
                   h-14
                   rounded-full
                   bg-blue-600
                   text-white
                   text-2xl
                   font-bold
                   flex
                   items-center
                   justify-center
                   "
                  >
                     👤
                    </button> 
                </div>    
        <h1 className="text-4xl font-bold text-blue-600">
            Welcome {user?.name}
        </h1>

        <p className="mt-4 font-semibold text-xl text-blue-600">
            Completed: {submissions.length}/10 Days
        </p>

      
        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
            <div
            className="bg-green-500 h-4 rounded-full"
            style={{
                width: `${(submissions.length / 10) * 100}%`,
            }}
            />
        </div>
        </div>

        <h3 className="text-3xl font-bold mb-6 text-gray-800">
        📅 Submitted Days
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {submissions.map((submission) => (
            <div
            key={submission._id}
            className="
                bg-white
                rounded-2xl
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-1
                transition
                duration-300
                p-5
            "
            >
            <h3 className="text-xl font-bold">
                Day {submission.day}

                <span
                className={
                    submission.status === "verified"
                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full ml-3 text-sm"
                    : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full ml-3 text-sm"
                }
                >
                {submission.status}
                </span>
            </h3>

            <p className="mt-4 text-gray-700">
                {submission.report}
            </p>

            <a
                href={submission.photo}
                target="_blank"
                rel="noreferrer"
                className="
                inline-block
                mt-4
                bg-blue-600
                text-white
                px-4
                py-2
                rounded-lg
                hover:bg-blue-700
                "
            >
                📷 View Photo
            </a>
            </div>
        ))}

         <div>
            <h3 className="text-3xl font-bold mt-12 mb-6 text-red-600">
                ❌Missed Days
            </h3>

            <div className="mb-8">
                {
                    missedDays.map(day=>(
                        <div
                           key={day}
                           className="
                            bg-red-100
                            text-red-700
                            p-3
                            rounded-lg
                            mb-2
                           "
                        >
                            Day{day}Missed 
                         </div>   
                    ))
                }

            </div>

         </div>

        </div>

        <h3 className="text-3xl font-bold mt-12 mb-6 text-gray-800">
        ⏳ Pending Days
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingDays.map((day) => (
            <div
            key={day}
            className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-lg
                transition
                p-6
                text-center
            "
            >
            <h3 className="text-2xl font-bold">
                Day {day}
            </h3>

            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm inline-block mt-3">
                Not Submitted
            </span>
            </div>
        ))}
        </div>

        {!profileExists ? (
        <button
            onClick={() => navigate("/profile")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-8"
        >
            Complete Profile
        </button>
        ) : applicationExists ? (
        applicationStatus === "approved" ? (
            <div>
                {
                allVerified ? (
                    <>
                   <button
                     onClick={generateCertificate}
                     className="
                        bg-purple-600
                        hover:bg-purple-700
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        font-bold
                        mt-6
                        "
                    >
                       Download Certificate 
                        </button>    

                       <button
                         onClick={generateReport} 
                         className="
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          px-6
                          py-3
                          rounded-xl
                          font-bold
                          mt-6
                          ml-3
                         "
                         >
                            Download Internship Report
                         </button>
                    </>     
                ):(

                 !todaySubmitted && (    

                <button
                onClick={() =>
                    navigate(`/submit-day/${nextDay}`)
                }
                className="
                    fixed
                    bottom-8
                    right-8
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-6
                    py-4
                    rounded-full
                    shadow-2xl
                    font-bold
                    text-lg
                "
                >
                + Submit Day {currentDay}
                </button>
            )
            )}
        
            </div>
           
        ) : (
            <div className="mt-8 bg-yellow-100 text-yellow-700 p-4 rounded-xl">
            Application Submitted — Pending Approval
            </div>
        )
        ) : (
        <button 
            onClick={()=> navigate("/apply")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg mt-8">
            Apply for Internship
        </button>
        )}

    </div>
);
    
}

export default StudentDashboard;