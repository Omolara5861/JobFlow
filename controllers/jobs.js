const Job = require('../models/Job');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
    res.status(200).send('Fetched all jobs');
}

const getJob = async (req, res) => {
    res.status(200).send(req.user);
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