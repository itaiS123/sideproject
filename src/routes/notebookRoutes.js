import express from "express";
import * as notebookController from "../controllers/notebookController.js";

const router = express.Router();

router.post("/", notebookController.create);
router.get("/student/:studentId", notebookController.getStudentNotebooks);

export default router;
