import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: [6,"must be 6 letter long"]
  },
  password: {
    type: String,
    required: [true, "Password is Requried!"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
