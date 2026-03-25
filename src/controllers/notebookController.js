import Notebook from "../models/Notebook.js";
import Page from "../models/Page.js";

export const getNotebooksByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const notebooks = await Notebook.find({ studentId }).lean();

    // הוספת ספירת דפים לכל מחברת
    const notebooksWithCount = await Promise.all(
      notebooks.map(async (nb) => {
        const pageCount = await Page.countDocuments({ notebookId: nb._id });
        return { ...nb, pageCount };
      })
    );

    res.json(notebooksWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNotebook = async (req, res) => {
  try {
    const { name, studentId, description } = req.body;
    const newNotebook = new Notebook({ name, studentId, description });
    await newNotebook.save();
    res.status(201).json(newNotebook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};