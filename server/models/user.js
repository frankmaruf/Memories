import mongoose from "mongoose";
import uuid from "node-uuid";
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  avatar: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  id: {
    type: String,
    default: uuid.v4,
  },
});

var User = mongoose.model("User", userSchema);

export default User;
