import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

mongoose.set("strictQuery", true);
const connect = mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to MongoDB.....");
  })
  .catch((error) => {
    console.log(error);
  });

export default connect;
