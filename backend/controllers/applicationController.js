const Application = require("../models/Application");

const createApplication = async(req,res)=>{
    try{

        const{
            userId,
            motivation,
            skills,
            emergencyContact
        } = req.body;

        const existingApplication = await Application.findOne({userId});

        if(existingApplication){
            return res.json({
                success:false,
                message:"Application already submitted"
            });
        }

        const application = await Application.create({
            userId,
            motivation,
            skills,
            emergencyContact
        });

        res.json({
            success:true,
            message:"Application Submitted",
            application
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

const getApplication = async(req,res)=>{
    try{
        const{ userId } = req.params;
        const application = await Application.findOne({userId});

        if(!application){
            return res.json({
                success:false,
                message:"Application not found"
            });
        }

        res.json({
            success:true,
            application
        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    };
}

const getAllApplications = async(req,res)=>{
    try{

        const applications = await Application.find();

        res.json({
            success:true,
            applications
        });

    }catch(error){
          console.log(error);

          res.status(500).json({
            success:false,
            message:"Server Error"
          }); 
    }
};

const approveApplication = async(req,res)=>{
    try{

        const { applicationId } = req.params;

        const application = await Application.findByIdAndUpdate(
            applicationId,
            {
                status:"approved"
            },
            {
                new:true
            }
        );

        res.json({
            success:true,
            message:"Application Approved",
            application
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
    createApplication,
    getApplication,
    getAllApplications,
    approveApplication
};