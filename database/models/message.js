
import mongoose, { Schema, Types, model } from "mongoose";


const messageSchema = new Schema({
    message: { type: String, required: true },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
}, {
    timestamps: true
})
const messageModel = mongoose.models.Message || model('Message', messageSchema)
export default messageModel

