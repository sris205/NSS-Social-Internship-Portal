const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },

    college:{
        type:String,
        required:true
    },

    course:{
        type:String,
        required:true
    },

    year:{
        type:String,
        required:true
    },

    mobile:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    }
});

const Profile = mongoose.model(
    "Profile",
    profileSchema
);

module.exports = Profile;