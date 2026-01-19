import express from "express";
import * as pageController from "../controllers/pageController.js";

const router = express.Router();

router.post("/", pageController.create);
router.get("/notebook/:notebookId", pageController.getByNotebook);

export default router;
