const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

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

        const startDate = new Date();
        startDate.setDate(
            startDate.getDate()+1
        );

        const application = await Application.findByIdAndUpdate(
            applicationId,
            {
                status:"approved",
                startDate:startDate
            },
            {
                new:true
            }
        );

        await application.populate("userId", "name email");

        await sendEmail(
            application.userId.email,
            "NSS Internship Application Approved",
            `Dear ${application.userId.name},

        Congatulations!

        Your application has been approved.

        You can now log in to the NSS Portal and start submitting your daily reports.

        Regards,
        NSS MMMUT Gorakhpur`
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