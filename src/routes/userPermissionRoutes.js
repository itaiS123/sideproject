import express from "express";
// Import all functions from the controller
import * as userPermController from "../controllers/userPermissionController.js";

const router = express.Router();

// Define the endpoints for the linking entity
router.post("/", userPermController.assign);      // Create a link
router.get("/", userPermController.getAll);       // Get all links with names
router.delete("/:id", userPermController.remove);  // Remove a link

export default router;