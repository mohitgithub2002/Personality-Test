import mongoose , {Schema, models} from 'mongoose';

const questionSchema = new Schema({
    category: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
});

const traitSchema = new Schema({
    trait: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const testSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: [questionSchema], // An array of question documents
    traits:[traitSchema],  //An array of trait document
});

const Test =  models.Test || mongoose.model('Test', testSchema);

export default Test;