import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Imports - Core
import userRoutes from "./src/routes/userRoutes.js";
import permissionRoutes from "./src/routes/permissionRoutes.js";
import userPermissionRoutes from "./src/routes/userPermissionRoutes.js";
import { requestLogger } from "./src/middleware/logger.js";

// Imports - Smart Notebook
import studentRoutes from "./src/routes/studentRoutes.js";
import notebookRoutes from "./src/routes/notebookRoutes.js";
import pageRoutes from "./src/routes/pageRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/user-permissions", userPermissionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/notebooks", notebookRoutes);
app.use("/api/pages", pageRoutes);

// --- Global Error Handler (מונע מהשרת לקרוס בגלל שגיאות רנדומליות) ---
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).send({ error: "Something broke on the server!" });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/testDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB (testDB)");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB Error:", err.message));
