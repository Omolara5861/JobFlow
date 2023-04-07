/** Imports Mongoose to interact with MongoDB database */
const { Schema, model } = require('mongoose');

/** Define a new schema for jobs */
const JobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Pls provide the company name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'Pls provide the job position'],
        maxLength: 100
    },
    status: {
        type: String,
        //Allowed status values for validation
        enum: ['applied', 'interviewing', 'offer received', 'rejected'],
        //Default value if the status is not provided
        default: 'applied'
    },
    createdBy: {
        //ObjectId to identify each job's creator
        type: Schema.Types.ObjectId,
        //Mongoose model that @createdBy field refers to
        ref: 'User',
        required: [true, 'Pls provide a user ']
    }
}, { timestamps: true });

// Export the job model which uses the defined JobSchema
module.exports = model('Job', JobSchema);