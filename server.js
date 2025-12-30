import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// ייבוא הראוטרים
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// חיבור הראוטים - חשוב שזה יהיה לפני ה-listen
app.use("/api/users", userRoutes);

// דף בית לבדיקה מהירה בדפדפן
app.get("/", (req, res) => {res.send("Server is UP")});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sideproject";

// חיבור למסד נתונים והפעלת השרת
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        // רק אחרי שה-DB מחובר, אנחנו מפעילים את השרת
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });