const express = require("express");
const upload = require("../middleware/upload");

const{
    createSubmission,
    getUserSubmissions,
    getAllSubmissions,
    verifySubmission,
    notVerifySubmission
} = require("../controllers/dailySubmissionController");

const router = express.Router();

router.post("/create", upload.single("photo"),createSubmission);
router.get("/all", getAllSubmissions);
router.put("/verify/:submissionId", verifySubmission);
router.put("/notVerify/:submissionId", notVerifySubmission);
router.get("/:userId",getUserSubmissions);



module.exports = router;

