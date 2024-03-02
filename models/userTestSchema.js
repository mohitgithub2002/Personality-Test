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
    dateTaken: {
        type: Date,
        default: Date.now,
    },
})

const userTest =  models.UsersTestData || mongoose.model('UsersTestData', userTestSchema);

export default userTest;