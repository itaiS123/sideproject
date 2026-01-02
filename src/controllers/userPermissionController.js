import UserPermission from "../models/UserPermission.js";

export const assign = async (req, res) => {
    try {
        const link = new UserPermission(req.body);
        await link.save();
        res.status(201).json(link);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAll = async (req, res) => {
    try {
        // This brings the actual user and permission details
        const data = await UserPermission.find()
            .populate('userId', 'username') 
            .populate('permissionId', 'name');
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        await UserPermission.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "Link removed" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};