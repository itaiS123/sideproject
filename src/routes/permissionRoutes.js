import express from "express";
import * as permController from "../controllers/permissionController.js";

const router = express.Router();

router.get("/", permController.getAll);
router.post("/", permController.create);
router.put("/:id", permController.update);
router.delete("/:id", permController.deletePerm);

export default router;