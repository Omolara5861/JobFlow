const {Schema, model} = require('mongoose');

const JobSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Pls provide the company name'],
        maxLength: 3
    },
    position: {
        type: String,
        required: [true, 'Pls provide the job position'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined', 'accepted'],
        default: 'pending'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Pls provide a user ']
    }
}, {timestamps: true});

module.exports = model('Job', JobSchema);