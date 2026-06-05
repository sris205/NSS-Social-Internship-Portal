const mongoose = require("mongoose");

const dailySubmissionSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    day:{
        type:Number,
        required:true
    },

    photo:{
        type:String,
        required:true
    },

    report:{
        type:String,
        required:true
    },

    submittedAt:{
        type:Date,
        default:Date.now
    },

    status:{
        type:String,
        default:"pending"
    }    
    
});

const DailySubmission = mongoose.model(
    "DailySubmission",
    dailySubmissionSchema
);

module.exports = DailySubmission