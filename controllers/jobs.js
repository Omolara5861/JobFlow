const Job = require("../models/Job"); // Import Job model
const { StatusCodes } = require("http-status-codes"); //Imports Status Codes from http-status-codes
const { BadRequestError, NotFoundError } = require("../errors"); // Imports custom error classes

/** Controller to get all jobs for a particular user */
const getAllJobs = async (req, res) => {
    // Gets all jobs that belongs to the authenticated user
    const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
    //Returns success status along with job count and jobs data
    res.status(StatusCodes.OK).json({ jobsCount: jobs.length, jobs });
};

/** Controller to get a particular job for a user */
const getJob = async (req, res) => {
    //Extracts userID and jobID from request object
    const {
        user: { userID },
        params: { id: jobID },
    } = req;
    //Find job with the provided user ID and job ID
    const job = await Job.findOne({ _id: jobID, createdBy: userID });
    //If no job is found then the error message is thrown
    if (!job) throw new NotFoundError("No job with the provided ID");
    //Return success status along with the job data
    res.status(StatusCodes.OK).json({ job });
};

/** Controller to create a new job */
const createJob = async (req, res) => {
    //Sets createdBy field in request body to the authenticated user ID
    req.body.createdBy = req.user.userID;
    //Create the job with the provided body object
    const job = await Job.create(req.body);
    //Return success status along with the created job data
    res.status(StatusCodes.CREATED).json({ job });
};

/** Controller to update a job */
const updateJob = async (req, res) => {
    //Extracts 'company', 'position', 'userID', and 'jobID` from the request object
    const {
        body: { company, position },
        user: { userID },
        params: { id: jobID },
    } = req;
    //If company or position fields are empty then bad request error is thrown
    if (!company | !position)
        throw new BadRequestError("Company or Position fields cannot be empty");
    //Updates the job with the provided job ID and user ID with the new request body and run the model validations
    const job = await Job.findByIdAndUpdate(
        { _id: jobID, createdBy: userID },
        req.body,
        { new: true, runValidators: true }
    );
    //if no job id found with the provided ID then not found error is thrown
    if (!job) throw new NotFoundError("Cannot find job with the provided ID");
    //Return success status along withe the updated job data
    res.status(StatusCodes.OK).json({ job });
};

/** Controller to delete a job */
const deleteJob = async (req, res) => {
    //Extract user and job ID from request object
    const {
        user: { userID },
        params: { id: jobID },
    } = req;
    //Finds job with the provided job
    const job = await Job.findByIdAndRemove({ _id: jobID, createdBy: userID });
    if (!job) throw new NotFoundError("Cannot find job with the provided ID");
    res.status(StatusCodes.OK).send("Job deleted successfully");
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};
