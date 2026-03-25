import express from "express";
import {
  createNotebook,
  getNotebooksByStudent,
} from "../controllers/notebookController.js";

const router = express.Router();

router.post("/", createNotebook);
router.get("/student/:studentId", getNotebooksByStudent);

export default router;
