import mongoose from "mongoose";
const Schema = mongoose.Schema;
const postScema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
  },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

var PostMessage = mongoose.model("PostMessage", postScema);

export default PostMessage;
