const Job = require("../models/jobs")

const getJobs = async (req, res, next) => {

    const jobs = await Job.find();

    res.json({
        success: true,
        message: "Job successfully found.",
        data: jobs
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

const updateJob = async (req, res, next) => {

    const id = req.params.id;
    let job = await Job.findById(id)

    if (!job && job.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Job not found"
        })
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

}

const deleteJob = async (req, res, next) => {

    const id = req.params.id;
    let job = await Job.findById(id);

    if (!job) {
        return res.status(404).json({
            success: false,
            message: "Job not found."
        })
    }

    job = await Job.findByIdAndDelete(id)

    return res.status(300).json({
        success: true,
        message: "Job has been deleted"
    })

}

const getJobByIdAndSlug = async (req, res, next) => {

    const id = req.params.id;
    const slug = req.params.slug;

    const job = await Job.find({
        $and: [
            { _id: id },
            { slug: slug }
        ]
    })


    if (!job || job.length === 0) {
        return res.json({
            success: false,
            message: "Job not found"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Job has been found success.",
        data: job
    })

}

const getJobStat = async (req, res, next) => {

    // const stats = await Job.aggregate([
    //     {
    //         // $match: { $text: { $search: "\"" + req.params.topic + "\"" } }
    //         $match: { $text: { $search: "\"" + req.params.topic + "\"" } }

    //     },
    //     {
    //         $group: {
    //             _id: null,
    //             avgSalary: { $avg: "$salary" }
    //         }
    //     }
    // ])
    const stats = await Job.aggregate([
        {
            $match: { $text: { $search: req.params.topic  } }
        },
        {
            $group: {
                _id : null,
                avgSalary: { $avg: '$salary' },
                minSalary: { $min: '$salary' },
                maxSalary: { $max: '$salary' }
            }
        }
    ]);
    if (stats.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No statistic found."
        })
    }

    return res.status(200).json({
        success: true,
        data: stats
    })
}

module.exports = {
    getJobs,
    createNewJob,
    updateJob,
    deleteJob,
    getJobByIdAndSlug,
    getJobStat
}