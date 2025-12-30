import express from "express";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", userController.getAll);    // GET 
router.post("/", userController.create);   // POST 
router.put("/:id", userController.update); // PUT 
router.delete("/:id", userController.deleteUser); // DELETE 

export default router;