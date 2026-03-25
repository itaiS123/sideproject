import mongoose from "mongoose";

const notebookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// שים לב למילה export default - זה מה שחסר לך!
const Notebook = mongoose.model("Notebook", notebookSchema);
export default Notebook;
