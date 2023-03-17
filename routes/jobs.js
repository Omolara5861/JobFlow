const {Router} = require('express');
const router = Router();
const {getAllJobs, getJob, createJob, updateJob, deleteJob } = require('../controllers/jobs');

router.route('jobs').get(getAllJobs).post(createJob);
router.route('/jobs/:id').get(getJob).patch(updateJob).delete(deleteJob);
