import mongoose from "mongoose";

const financeSchema = mongoose.Schema(
  {
    date: String,
    finance: [
      {
        box: { type: mongoose.Types.ObjectId, ref: "donationBox" },
        amount: {
          type:Number,
          default:0
        },
        charity: String,
        country:String,
        categories:[String]
      },
    ],
  }
);

const financeModel = mongoose.model("finance", financeSchema);

export default financeModel;
