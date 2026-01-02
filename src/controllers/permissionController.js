import Permission from "../models/Permission.js";

export const create = async (req, res) => {
    try {
        const perm = new Permission(req.body);
        await perm.save();
        res.status(201).json(perm);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const perms = await Permission.find();
        res.status(200).json(perms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const updated = await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deletePerm = async (req, res) => {
    try {
        await Permission.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};