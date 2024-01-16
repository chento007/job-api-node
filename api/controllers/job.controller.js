const Job = require("../models/jobs")

const GetJobs = (req, res, next) => {
    res.json({
        success: true,
        message: "Job successfully"
    })
}

const createNewJob = async (req, res, next) => {
    const job = await Job.create(req.body)

    res.json({
        success: true,
        message: "Job successfully created",
        data: job
    })
}

module.exports = {
    GetJobs,
    createNewJob,
}