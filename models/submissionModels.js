import mongoose , {Schema, models} from 'mongoose';

const userTestSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
    },
    score: Number,
    categoryScore:[{
        type:Number
    }],
    answers: [answerSchema], // An array of answer documents
    dateTaken: {
        type: Date,
        default: Date.now,
    },
})

const answerSchema = new Schema({
    category: {
        type: Number,
        required: true,
    },
    answer: [{
        type: String,
    }],
});

const submission =  models.UsersTestData || mongoose.model('submissionData', userTestSchema);

export default submission;