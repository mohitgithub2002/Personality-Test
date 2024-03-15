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
    personalityType: String,  // This is from 16 personalities
    personalitySymbol: String, //personality code
})

const Users =  models.User || mongoose.model('AllUser', userSchema);

export default Users;