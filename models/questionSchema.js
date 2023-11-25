import mongoose, { Schema, models } from "mongoose";

const questionSchema = new Schema({
    id: Number,
    questionType: String,
    question: String,
    optionType: String,
    options: [{
        id: Number,
        option: String,
    }],
})

const Question = models.Question || mongoose.model("Question", questionSchema)

export default Question;