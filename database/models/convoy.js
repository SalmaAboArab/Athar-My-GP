import mongoose from "mongoose";

const convoySchema = mongoose.Schema({
  charityId: { type: mongoose.Types.ObjectId, ref: "charity" },
  countryId: { type: mongoose.Types.ObjectId, ref: "country" },
  totalVolunteers:{
    type:Number,
    min:0,
  },
  jobs: [
    { 
      job:{
        type:String,
        lowercase:true,
        trim: true,
      },
      count: Number,
      usersId: [{ type: mongoose.Types.ObjectId, ref: "User" }],
      completed :{
        type:Boolean,
        default: false
      }
    }
  ],
  startDate: Date,
  endDate: Date,
  completed:{
    type: Boolean,
    default: false,
  }
},{timestamps:true});

convoySchema.pre(/^find/, function() {
  this.populate('countryId', 'name').populate('charityId' , 'name image verified');
});
const convoyModel = mongoose.model('convoy', convoySchema);
export default convoyModel;