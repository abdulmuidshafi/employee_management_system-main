import mongoose from "mongoose";
const Schema=new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
      },
      reviewDate: {
        type: Date,
        required: true
      },
      goals: {
        type: Array
      },
      achievements: {
        type: Array
      },
      feedback: {
        type: String
      }
})
const Performance =mongoose.model("performances",Schema);
export default Performance ;