const express = require("express");

const{
    createApplication,
    getApplication,
    getAllApplications,
    approveApplication
} = require("../controllers/applicationController");

const router = express.Router();

router.post("/create",createApplication);
router.get("/all",getAllApplications);
router.put("/approve/:applicationId",approveApplication);
router.get("/:userId",getApplication);

module.exports = router;