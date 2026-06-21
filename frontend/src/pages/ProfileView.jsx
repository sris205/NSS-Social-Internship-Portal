import { useEffect, useState } from "react";
import axios from "axios";

function ProfileView(){

    const[profile,setProfile] = useState(null);

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