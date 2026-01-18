import Notebook from "../models/Notebook.js";

export const create = async (req, res) => {
  try {
    const notebook = new Notebook(req.body);
    await notebook.save();
    res.status(201).json(notebook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStudentNotebooks = async (req, res) => {
  try {
    const notebooks = await Notebook.find({ studentId: req.params.studentId });
    res.status(200).json(notebooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};