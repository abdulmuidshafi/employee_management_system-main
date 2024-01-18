import mongoose from "mongoose";
const Schema=new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',  
        
    required: true
      },
      startDate: {
        type: Date,
        required: true
      },
      endDate: {
        type: Date,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      reason: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected']
      }
})
const Leave=mongoose.model("leaves",Schema);
export default Leave;