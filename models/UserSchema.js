import mongoose , {Schema, models} from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    mobile: String,
    password: String,
    personality: String,

})

const User =  models.User || mongoose.model('User', userSchema);

export default User;