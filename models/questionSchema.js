import mongoose, { Schema, models } from "mongoose";

const questionSchema = new Schema({
    
    category: Number,
    questionType: {
        type: Number,
        required: true,
        default: 0
    }, // 0 for range, 1 for single choice , 2 for multiple options select,
    question: {
        type:String,
        required:true,
    },
    score:{
        type:Number,
        required:true,
    },
    options: [{
        id: Number,
        option: String,
    }],
})

const Question = models.Question || mongoose.model("Question", questionSchema)

export default Question;