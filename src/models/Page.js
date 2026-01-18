import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  transcribedText: { type: String, required: true },
  notebookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notebook",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Page", pageSchema);
