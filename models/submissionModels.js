import mongoose , {Schema, models} from 'mongoose';

const answerSchema = new Schema({
    category: {
        type: Number,
        required: true,
    },
    answer: [{
        type: Number,
    }],
});

const userTestSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
    },
    answers: [answerSchema], // An array of answer documents
    dateTaken: {
        type: Date,
        default: Date.now,
    },
})



const Submit=  models.SubmissionTestData || mongoose.model('SubmissionTestData', userTestSchema);

export default Submit;