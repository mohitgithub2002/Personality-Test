import mongoose , {Schema, models} from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: String,
    password: String,
    paymentid: String,
    premium: Boolean,
    quizAnswer: [{
        type:String,
        
    }],
    score: Number,  // This Score is from 100
    categoryScore:[{
        type:Number
    }]
})

const User =  models.User || mongoose.model('User', userSchema);

export default User;