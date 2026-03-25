import express from "express";
import {
  createPage,
  getPagesByNotebook,
} from "../controllers/pageController.js";

const router = express.Router();

// שמירת דף חדש
router.post("/", createPage);

// שליפת דפים של מחברת מסוימת
router.get("/notebook/:notebookId", getPagesByNotebook);

export default router;
