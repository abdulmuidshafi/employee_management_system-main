import mongoose from "mongoose"; 
const Schema=new mongoose.Schema ({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      phone: {
        type: String
      },
      salary: {
        type: Number
      },
      department:{
        type:String
      }
})
const Employee =mongoose.model("emplooyes",Schema);
export default Employee;