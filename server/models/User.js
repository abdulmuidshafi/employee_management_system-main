import mongoose from "mongoose";
import UniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, min: 6, required: [true, "password is required"] },
  role: { type: String, required: true, enum: ['Admin', 'HR', 'Employee'] },
  active:{type:Boolean,default:true}
});

Schema.plugin(UniqueValidator, {
  message: "Error, expected {PATH} to be unique.",
});
Schema.methods.ispasswordmatch = async function (password) {
  return bcrypt.compareSync(password, this.password);
};
const User = mongoose.model("users", Schema);

export default User;
