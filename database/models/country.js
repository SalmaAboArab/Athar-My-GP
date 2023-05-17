import mongoose from "mongoose";

const countrySchema = mongoose.Schema({
    name : {
        type: String ,
        required: [true , 'country name required'],
        unique: [true , 'country name is unique'],
        minlength: [3 , 'too short country name'],
        trim: true,
    },
    population: {
        type: Number ,
        required: [true , 'country population required'],
        min : 1,
    },
    births: {
        type: Number ,
        required: [true , 'country births required'],
        min : 1,
    },
    deaths: {
        type: Number ,
        required: [true , 'country deaths required'],
        min : 1,
    },
    needHelp: {
        type: Number ,
        required: [true , 'country patients required'],
        min : 1,
    },
    income: {
        type: Number ,
        required: [true , 'country income required'],
        min : 1,
    },
    war: {
        type: Boolean ,
        default: false
    },
    necessityDonation: {
        type: Number ,
        default: 0
    },
    donationBoxes:{
        type: Number ,
        default: 0
    },
    convoysNumber:{
        type: Number ,
        default: 0
    },
    volunteers:{
        type: Number ,
        default: 0
    },
    cardImage: Object,
    headerImage: Object,
    problems:[
        {
            problem:{
                type: String,
                minlength: [10 , 'too short country problem'],
                trim: true,
            },
            image:{
                type: Object,
            }
        }
    ]
},{timestamps: true});

const countryModel = mongoose.model('country', countrySchema);

export default countryModel;