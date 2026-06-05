const DailySubmission = require("../models/DailySubmission");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const createSubmission = async(req,res)=>{
    try{
        const{
            userId,
            day,
            report
        } = req.body;

        const existingSubmission = 
                    await DailySubmission.findOne({
                        userId,
                        day
        });

        if(existingSubmission){
            return res.json({
                success:false,
                message:"Day already submitted"
            });
        }

        let photoUrl = "";
        if(req.file){

        const uploadResult = await new Promise(
            (resolve,reject)=>{

                const stream = 
                  cloudinary.uploader.upload_stream(
                    {
                        folder:"nss-submissions"
                    },
                    (error,result)=>{
                        if(error)reject(error);
                        else resolve(result);
                    }
                  );

                  streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);
            }
        );

        photoUrl = uploadResult.secure_url;
    }    

        const submission = await DailySubmission.create({
                   userId,
                   day,
                   photo:photoUrl,
                   report
        });

        res.json({
            success:true,
            message:"Submission Created",
            submission
        });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

const getUserSubmissions = async(req,res)=>{
    try{

        const{ userId } = req.params;

        const submissions = await DailySubmission.find({
            userId
        });

        res.json({
            success:true,
            submissions
        });
    }catch(error){

        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
        
    };
}

const getAllSubmissions = async(req,res)=>{
    try{
        const submissions = await DailySubmission
            .find()
            .populate("userId", "name email role");

        res.json({
            success:true,
            submissions
        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
        
    }
};

const verifySubmission = async(req,res)=>{

    console.log("Verify Hit");
    console.log(req.params);
    try{

        const { submissionId } = req.params;

        const submission = 
             await DailySubmission.findByIdAndUpdate(
                submissionId,
                {
                    status:"verified"
                },
                {
                    new:true
                }
             );

            res.json({
                success:true,
                message:"Submission Verified",
                submission
            });
    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

const notVerifySubmission = async(req,res)=>{
    try{

        const{ submissionId } = req.params;

        const submission = 
            await DailySubmission.findByIdAndUpdate(
                submissionId,
                {
                    status:"not verified"
                },
                {
                    new:true
                }
            );

        res.json({
            success:true,
            message:"Submission Not Verified",
            submission
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
    createSubmission,
    getUserSubmissions,
    getAllSubmissions,
    verifySubmission,
    notVerifySubmission
};