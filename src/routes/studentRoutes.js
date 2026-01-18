import express from "express";
import * as studentController from "../controllers/studentController.js";

const router = express.Router();

router.post("/", studentController.create);
router.get("/", studentController.getAll);

export default router;
