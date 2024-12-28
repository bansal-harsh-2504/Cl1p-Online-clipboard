import mongoose from "mongoose";

const ClipSchema = new mongoose.Schema({
  content: String,
  createdAt: { type: Date, default: Date.now, index: { expires: "1h" } },
});

const Clip = mongoose.model("Clip", ClipSchema);

export default Clip;
