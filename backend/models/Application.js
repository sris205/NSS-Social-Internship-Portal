const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    motivation:{
        type:String,
        required:true
    },

    skills:{
        type:String,
        required:true
    },

    emergencyContact:{
        type:String,
        required:true
    },

    status:{
       type:String,
       default:"pending"
    },

    startDate:{
        type:Date,
        default:null
    }
});

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;