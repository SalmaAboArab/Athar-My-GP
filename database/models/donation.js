import mongoose from "mongoose";

const donateSchema = mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
  donationBox: { type: mongoose.Types.ObjectId, ref: "donationBox" },
  amount:{
    type:Number,
    required: [true , 'amount is required'],
    default : 10
  },
  credit: String,
  cvv:String
},{timestamps:true});

const donateModel = mongoose.model("donation", donateSchema);

export default donateModel;
