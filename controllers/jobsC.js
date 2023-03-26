```javascript
const Job = require('../models/Job'); //importing Job model
const {StatusCodes} = require('http-status-codes'); //importing Status Codes from http-status-codes package
const {BadRequestError, NotFoundError} = require('../errors'); //importing custom error classes

const getAllJobs = async (req, res) => { //controller to get all jobs for a particular user
    const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt'); //getting all jobs which belongs to the authenticated user
    res.status(StatusCodes.OK).json({jobsCount: jobs.length, jobs}); //returning with success status along with job count and jobs data
}

const getJob = async (req, res) => { //controller to get a particular job for a user
    const {user: {userID}, params: {id: jobID}} = req; //extracting userID and jobID from request object
    const job = await Job.findOne({_id: jobID, createdBy: userID}); //finding job with the provided job ID and user ID
    if(!job) throw new NotFoundError('No job with the provided ID'); //if no job is found then the error message is thrown
    res.status(StatusCodes.OK).json({job}); //returning with success status along with job data
}

const createJob = async (req, res) => { //controller to create a new job
    req.body.createdBy = req.user.userID; //setting createdBy field in req.body with the authenticated userID
    const job = await Job.create(req.body); //creating the job with the provided body object
    res.status(StatusCodes.CREATED).json({job}); //returning with success status along with created job data
}

const updateJob = async (req, res) => { //controller to update a job
    const {body: {company, position}, user: {userID}, params: {id: jobID}} = req; //extracting company, position, userID and jobID from req object
    if(!company | !position) throw new BadRequestError('Company or Position fields cannot be empty'); //if company or position fields are empty then bad request error is thrown
    const job = await Job.findByIdAndUpdate({_id: jobID, createdBy: userID}, req.body, {new: true, runValidators: true}); //updating the job with the provided job ID and user ID with new request body
    if(!job) throw new NotFoundError('Cannot find job with the provided ID'); //if no job is found with the provided ID then not found error is thrown
    res.status(StatusCodes.OK).json({job}); //returning with success status along with updated job data
}

const deleteJob = async (req, res) => { //controller to delete a job
    const {user: {userID}, params: {id: jobID}} = req; //extracting userID and jobID from request object
    const job = await Job.findByIdAndRemove({_id: jobID, createdBy: userID}); //finding job with the provided job ID and user ID and deleting
    if(!job) throw new NotFoundError('Cannot find job with the provided ID'); //if no job is found then not found error is thrown
    res.status(StatusCodes.OK).send('Job deleted successfully') //returning with success message
}

module.exports = { //exporting all controller functions
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
```