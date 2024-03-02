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
    personalityType: String,  // This is from 16 personalities
    personalitySymbol: String, //personality code
    score: Number,
    categoryScore:[{
        type:Number
    }]
})

const User =  models.User || mongoose.model('User', userSchema);

export default User;