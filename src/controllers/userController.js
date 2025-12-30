import User from "../models/User.js";

// 1. יצירת משתמש (Create)
export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "המשתמש נוצר בהצלחה!", data: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 2. שליפת כל המשתמשים (Read All)
export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. עדכון משתמש לפי ID (Update)
export const update = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "משתמש לא נמצא" });
        res.status(200).json({ message: "המשתמש עודכן!", data: updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// 4. מחיקת משתמש (Delete)
export const deleteUser = async (req, res) => { 
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "משתמש לא נמצא" });
        res.status(200).json({ message: "המשתמש נמחק בהצלחה" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};