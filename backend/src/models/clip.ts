import mongoose from "mongoose";

const ClipSchema = new mongoose.Schema({
  customId: { type: String, unique: true, required: true },
  content: { type: String, required: true },
  expiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now, index: { expires: "1h" } },
});

const Clip = mongoose.model("Clip", ClipSchema);

export default Clip;
