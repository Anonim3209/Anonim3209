import mongoose from "mongoose";

const Id = new mongoose.Schema({
  idOFLink: { type: String, required: true },
});

export default mongoose.model("Id", Id);
