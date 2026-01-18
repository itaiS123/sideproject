import Student from "../models/Student.js";

export const create = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const students = await Student.find().populate("userId");
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
