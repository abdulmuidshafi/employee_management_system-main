import mongoose from "mongoose";
const Schema= mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
      },
      paymentDate: {
        type: Date,
        required: true
      },
      grossSalary: {
        type: Number,
        required: true
      },
      deductions: {
        type: Number
      },
      netSalary: {
        type: Number
      }
})
const Payroll=mongoose.model("payrolles",Schema);
export default Payroll;