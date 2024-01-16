const express = require('express');
const router = express.Router();

const {
    GetJobs,
    createNewJob
} = require("../controllers/job.controller")

router.route("/jobs").get(GetJobs)
router.route("/jobs").post(createNewJob)

module.exports = router