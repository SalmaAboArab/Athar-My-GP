import mongoose from "mongoose";

const charitySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        trim: true
    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'email is required'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },
    address:String,
    CRN:String,
    description:String,
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: 'charity',
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online']
    },
    image: Object,
    forgetCode: {
        type: Number,
        default: null
    },
    changePasswordTime: {
        type: Date
    },
    donationBoxNumber: {
        type: Number,
        default:0
    },
    convoysNumber : {
        type: Number,
        default:0
    },
    volunteers: {
        type: Number,
        default:0
    },
    verified:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

const charityModel = mongoose.model('charity', charitySchema);

export default charityModel;