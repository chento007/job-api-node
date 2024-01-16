const express = require('express');
const router = express.Router();

const {
    getJobs,
    createNewJob,
    updateJob,
    deleteJob,
    getJobByIdAndSlug,
    getJobStat
} = require("../controllers/job.controller")

router.route("/jobs")
    .get(getJobs)
    .post(createNewJob)
router.route("/stats/:topic")
    .get(getJobStat)
router.route("/jobs/:id")
    .put(updateJob)
    .delete(deleteJob)
router.route("/jobs/:id/:slug")
    .get(getJobByIdAndSlug)

module.exports = router