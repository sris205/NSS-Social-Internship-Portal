import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ProfileView(){

    const navigate = useNavigate();

    const[profile,setProfile] = useState(null);

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    )

    useEffect(()=>{
        const fetchProfile = async()=>{
            const user = JSON.parse(
                localStorage.getItem("user")
            );

            const response = await axios.get(
                `http://localhost:5000/api/profile/${user._id}`
            );

            if(response.data.success){
                setProfile(response.data.profile);
            }
        };

        fetchProfile();
    },[]);

    if(!profile){
        return <h1>Loading...</h1>;
    }

    return(
        <div className="min-h-screen bg-gray-100 p-8">

            <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">

            <div className="flex justify-center mb-6">
                <img
                   src={`https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=ffffff&size=150`}
                   alt="Profile"
                   className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                   />
            </div>

            <div className="flex justify-end mb-4">
                <button
                  onClick={()=> navigate("/profile")}
                  className="
                   bg-blue-600
                   hover:bg-blue-700
                   text-white
                   px-5
                   py-2
                   rounded-lg
                   font-semibold
                  "
                  >
                    Edit Profile
                  </button>
                  

            </div>

                <h1 className="text-3xl font-bold mb-6">
                     Student Profile
                </h1>

                <p><b>Name:</b>{user.name}</p>
                <p><b>Email:</b>{user.email}</p>
                 <p><b>Mobile:</b> {profile.mobile}</p>

                <p><b>College:</b> {profile.college}</p>
                <p><b>Course:</b> {profile.course}</p>
                <p><b>Year:</b> {profile.year}</p>
                <p><b>Address:</b> {profile.address}</p>


            </div>

        </div>
    );
}

export default ProfileView;