import mongoose from "mongoose";

const htmlQuestion = new mongoose.Schema({
  html: { type: String, required: true },
  timeOfActivation: { type: String, required: true },
  username: { type: String, required: true },
});

export default mongoose.model("htmlQuestion", htmlQuestion);
