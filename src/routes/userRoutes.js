import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAll);    // GET - שליפה
router.post("/", userController.create);   // POST - יצירה
router.put("/:id", userController.update); // PUT - עדכון
router.delete("/:id", userController.deleteUser); // DELETE - מחיקה

export default router;