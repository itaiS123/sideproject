import Page from "../models/Page.js";

// יצירת דף חדש
export const createPage = async (req, res) => {
  try {
    const { notebookId, content, summary, accuracy } = req.body;
    if (!notebookId || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newPage = new Page({ notebookId, content, summary, accuracy });
    const savedPage = await newPage.save();
    res.status(201).json(savedPage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// שליפת דפים לפי מחברת (לצורך Review)
export const getPagesByNotebook = async (req, res) => {
  try {
    const { notebookId } = req.params;
    const pages = await Page.find({ notebookId }).sort({ createdAt: -1 });
    res.json(pages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};