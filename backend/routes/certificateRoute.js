const express = require("express");

const {
    downloadCertificate
} = require("../controllers/certificateController");

const router = express.Router();

router.get("/:userId", downloadCertificate);

module.exports = router;