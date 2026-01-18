import Page from "../models/Page.js";

// יצירת דף (הבסיס לכל המערכת)
export const create = async (req, res) => {
  try {
    const newPage = new Page(req.body);
    await newPage.save();
    res.status(201).json({ message: "הדף נוצר בהצלחה!", data: newPage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// שליפת דפים של מחברת מסוימת
export const getByNotebook = async (req, res) => {
  try {
    const pages = await Page.find({ notebookId: req.params.notebookId });
    res.status(200).json(pages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
