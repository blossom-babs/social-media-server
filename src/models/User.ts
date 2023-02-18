import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    min: 2,
    max: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "invalid email"]
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  location: String,
  occupation: String,
  birthday: String,
  following: {
    type: Map,
    of: Boolean
  },
  followers: {
    type: Map,
    of: Boolean
  }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

export default User;