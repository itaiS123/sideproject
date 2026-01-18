import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

export default mongoose.model("Notebook", notebookSchema);
