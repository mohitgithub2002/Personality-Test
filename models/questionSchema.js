import mongoose, { Schema, models } from "mongoose";

const questionSchema = new Schema({
    id: Number,
    question: String,
    options: [{
        id: Number,
        option: String,
    }],
})

const Question = models.Question || mongoose.model("Question", questionSchema)

export default Question;