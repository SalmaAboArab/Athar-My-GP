import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    title:{
        type: String ,
        required: [true , 'job title required'],
        unique: [true , 'job title is unique'],
        trim: true,
    }
});

const jobModel = mongoose.model("job", jobSchema);
export default jobModel;