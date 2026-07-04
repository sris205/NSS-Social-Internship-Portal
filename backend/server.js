const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cloudinary = require("./config/cloudinary");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoute");
const applicationRoutes =
    require("./routes/applicationRoute");
const DailySubmission = require("./models/DailySubmission");
const dailySubmissionRoutes =
    require("./routes/dailySubmissionRoute");
const certificateRoute = require("./routes/certificateRoute");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("Backend Running");
});

app.get("/api/test", (req, res)=>{
    res.json({
       message:"API working successfully"
    }); 
});

app.get("/test", (req, res) => {
    res.send("Server Working");
});

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/profile",profileRoutes);
app.use("/api/application",applicationRoutes);
app.use("/api/submission",dailySubmissionRoutes);
app.use("/api/certificate", certificateRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});