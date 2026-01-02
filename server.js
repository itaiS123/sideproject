import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// 1. Imports
import userRoutes from "./src/routes/userRoutes.js";
import permissionRoutes from "./src/routes/permissionRoutes.js";
import userPermissionRoutes from "./src/routes/userPermissionRoutes.js";
import { requestLogger } from "./src/middleware/logger.js";

dotenv.config();

// 2. CREATE THE APP FIRST
const app = express();

// 3. SETTINGS
app.use(cors());
app.use(express.json());
app.use(requestLogger); // Use the logging middleware

// 4. USE ROUTES
app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/user-permissions", userPermissionRoutes);

// 5. CONNECT AND START
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sideproject";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("❌ DB Error:", err.message));