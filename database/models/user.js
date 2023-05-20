
import mongoose, { Schema, Types, model } from "mongoose";


const userSchema = new Schema({
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
        required: [true, 'userName is required'],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },
    job:String,
    country: String,
    national_id:String,
    volunteer:{
        type:Boolean,
        default:false
    },
    gender: {
        type: String,
        default: 'male',
        enum: ['male', 'female']
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: String,
        default: 'offline',
        enum: ['offline', 'online']
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    image: Object,
    imageId:String,
    forgetCode: {
        type: Number,
        default: null
    },
    changePasswordTime: {
        type: Date
    },
    volunteer:{
        type:Boolean,
        default:false
    },
    convoys: [{ type: mongoose.Types.ObjectId, ref: "convoy" }]
}, {
    timestamps: true
})
userSchema.pre(/^find/, function() {
    this.populate('convoys', 'startDate endDate');
  });
const userModel = mongoose.models.User || model('User', userSchema)
export default userModel