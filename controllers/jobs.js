const getAllJob = async (req, res) => {
    res.status(200).send('Fetched all jobs');
}

const getJob = async (req, res) => {
    res.status(200).send('Job fetched');
}

const createJob = async (req, res) => {
    res.status(201).send('Job created');
}

const updateJob = async (req, res) => {
    res.status(200).send('Job updated');
}

const deleteJob = async (req, res) => {
    res.status(200).send('Job deleted')
}

module.exports = {
    getAllJob,
    getJob,
    createJob,
    updateJob,
    deleteJob
}