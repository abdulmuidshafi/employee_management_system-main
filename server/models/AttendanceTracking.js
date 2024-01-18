import mongoose from "mongoose";
const Schema=new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      checkInTime: {
        type: Date
      },
      checkOutTime: {
        type: Date
      }
    
})
const AttendanceTracking=mongoose.model("attendances",Schema);
export default AttendanceTracking;