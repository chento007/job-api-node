const express = require('express');
const router = express.Router();
const authorizeRole = require("../controllers/auth.controller")

const {
    getJobs,
    createNewJob,
    updateJob,
    deleteJob,
    getJobByIdAndSlug,
    getJobStat
} = require("../controllers/job.controller")

const {isAuthenicationedUser,authorizeRoles} =require("../middlewares/auth")

router.route("")
    .get(getJobs)
    .post(isAuthenicationedUser,createNewJob,authorizeRoles("employee"))
router.route("/stats/:topic")
    .get(getJobStat)
router.route("/:id")
    .put(updateJob)
    .delete(deleteJob)
router.route("/:id/:slug")
    .get(getJobByIdAndSlug)

module.exports = router