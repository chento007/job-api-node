const Job = require("../models/jobs")
const ErrorHandler = require("../exceptions/ErrorHandler")
const catchAsyncErros = require("../middlewares/catchAsyncErrors")
const APIFilters = require("../utils/APIFilters")

const getJobs = catchAsyncErros(async (req, res, next) => {

    const apifilters = new APIFilters(Job.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .searchByQuery()
        .pagination()

    const jobs = await apifilters.query;

    res.json({
        success: true,
        message: "Job successfully found.",
        data: jobs
    })
})


const createNewJob = catchAsyncErros(async (req, res, next) => {

    const job = await Job.create(req.body)

    res.status(200).json({
        success: true,
        message: "Job successfully created",
        data: job
    })
})

const updateJob = catchAsyncErros(async (req, res, next) => {

    const id = req.params.id;
    let job = await Job.findById(id)

    if (!job && job.length === 0) {
        return next(
            new ErrorHandler("Job not found", 404)
        )
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    return res.status(200).json({
        success: true,
        message: "Job update sucess",
        data: job
    })

})

const deleteJob = catchAsyncErros(async (req, res, next) => {

    const id = req.params.id;
    let job = await Job.findById(id);

    if (!job) {
        return next(
            new ErrorHandler("Job not found", 404)
        )
    }

    job = await Job.findByIdAndDelete(id)

    return res.status(300).json({
        success: true,
        message: "Job has been deleted"
    })

})

const getJobByIdAndSlug = catchAsyncErros(async (req, res, next) => {

    const id = req.params.id;
    const slug = req.params.slug;

    const job = await Job.find({
        $and: [
            { _id: id },
            { slug: slug }
        ]
    })


    if (!job || job.length === 0) {
        return next(
            new ErrorHandler("Job not found", 404)
        )
    }

    return res.status(200).json({
        success: true,
        message: "Job has been found success.",
        data: job
    })

})

const getJobStat = catchAsyncErros(async (req, res, next) => {

    const stats = await Job.aggregate([
        {
            $match: { title: req.params.topic }
        },
        {
            $group: {
                _id: null,
                avgSalary: { $avg: "$salary" },
                minSalary: { $min: "$salary" },
                maxSalary: { $max: "$salary" },
            }
        }
    ]);

    if (stats.length === 0) {
        return next(
            new ErrorHandler("Topic not found", 404)
        )
    }

    return res.status(200).json({
        success: true,
        data: stats
    })
})


module.exports = {
    getJobs,
    createNewJob,
    updateJob,
    deleteJob,
    getJobByIdAndSlug,
    getJobStat
}