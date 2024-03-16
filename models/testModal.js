import mongoose , {Schema, models} from 'mongoose';

const optionSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    option: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const questionSchema = new Schema({
    category: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [optionSchema], // An array of option documents
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

const Tests =  models.AllTest || mongoose.model('AllTest', testSchema);

export default Tests;