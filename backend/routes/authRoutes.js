const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async(req,res)=>{

    try{
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword
        });

        res.status(201).json({
            success:true,
            user
        });
    }  catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
});

router.post("/login",async(req,res)=>{

   try{
   const {name,email,password} = req.body;
  const user = await User.findOne({email});
         if(!user){
            return res.json({
                success:false,
                message:"User not found"
            });
         }

         const isMatch = await bcrypt.compare(
            password,
            user.password
         );

         if(!isMatch){
            res.json({
                success:false,
                message:"Invalid Password"
            });
         }

         res.json({
            success:true,
            message:"Login Successful!",
            user
         });

    }catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
        
});    

module.exports = router;