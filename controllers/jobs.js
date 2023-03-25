const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobsCount: jobs.length, jobs});
}

const getJob = async (req, res) => {
    const {user: {userID}, params: {id: jobID}} = req;
    const job = await Job.findOne({_id: jobID, createdBy: userID});
    if(!job) throw new NotFoundError('No job with the provided ID');
    res.status(StatusCodes.OK).json({job});
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({job});
}

const updateJob = async (req, res) => {
    res.status(200).send('Job updated');
}

const deleteJob = async (req, res) => {
    res.status(200).send('Job deleted')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}