const Profile = require("../models/Profile");

const createProfile = async(req,res)=>{

    try{

        const{
            userId,
            college,
            course,
            year,
            mobile,
            address
        } = req.body

        const existingProfile = 
              await Profile.findOne({userId});

        if(existingProfile){
            return res.json({
                success:false,
                message:"Profile already exists"
            });
        }   
        
        const profile = await Profile.create({
            userId,
            college,
            course,
            year,
            mobile,
            address
        });

        res.json({
            success: true,
            message: "Profile Created",
            profile
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

const getProfile = async(req,res)=>{

    try{

        const{ userId }  = req.params;

        const profile = await Profile.findOne({ userId });

        if(!profile){
            return res.json({
                success:false,
                message:"Profile not found"
            });
        }

        res.json({
            success:true,
            profile
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

module.exports = {
     createProfile,
     getProfile 
    };