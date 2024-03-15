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
    options: [optionSchema], // An array of option documents
});

const optionSchema = new Schema({
    option: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {_id : false}); // disable

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

const Tests =  models.Test || mongoose.model('AllTest', testSchema);

export default Tests;