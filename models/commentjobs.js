// Importing Mongoose module to interact with MongoDB database.
const { Schema, model } = require('mongoose');

// Defined a new schema for the jobs.
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
        // Allowed values for validation.
        enum: ['pending', 'interview', 'declined', 'accepted'],
        // Default value if the status is not provided.
        default: 'pending'
    },
    createdBy: {
        // ObjectId to identify each job's creator.
        type: Schema.Types.ObjectId,
        // Mongoose model that this field refers to.
        ref: 'User',
        required: [true, 'Pls provide a user ']
    }
}, { timestamps: true });

// Exporting the Job model which uses the defined JobSchema.
module.exports = model('Job', JobSchema);