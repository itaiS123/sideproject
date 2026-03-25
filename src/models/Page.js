import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  notebookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notebook",
    required: true,
  },
  content: { type: String, required: true },
  summary: { type: String },
  accuracy: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Page", pageSchema);
