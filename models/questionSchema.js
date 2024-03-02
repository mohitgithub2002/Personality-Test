import mongoose, { Schema, models } from "mongoose";

const questionSchema = new Schema({
    
    category: Number,
    
    question: {
        type:String,
        required:true,
    },
    
})

const Question = models.Question || mongoose.model("Question", questionSchema)

export default Question;