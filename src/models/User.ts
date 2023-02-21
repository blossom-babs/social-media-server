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
  username: {
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
}, { timestamps: true })

const FollowerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  following: {
    type: Map,
    of: Boolean
  }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema)
const Follower = mongoose.model("Follower", FollowerSchema)

export {User, FollowerSchema}; 