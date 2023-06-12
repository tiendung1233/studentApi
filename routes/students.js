const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const Classes = require('../model/class');
// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('class');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get student per class

router.get('/:id', async(req,res) =>{
  const id = req.params.id
  try {
    const students = await Student.find({ class: id }).populate('class');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// delete student class
router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    
    await Student.findByIdAndRemove(studentId);

    res.status(200).json({ message: 'Xóa sinh viên thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xóa sinh viên' });
  }
});
router.put('/:id', async (req,res) =>{
  try {
  const studentId = req.params.id

  const {name, age, grade, classId } = req.body
  
  console.log(name, age, grade, classId)
  const existingStudent = await Student.findById(studentId);
  if (!existingStudent) {
    return res.status(404).json({ error: 'Sinh viên không tồn tại' });
  }

  const existingClass = await Classes.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ error: 'Lớp học không tồn tại' });
    }

  existingStudent.name = name;
  existingStudent.age = age;
  existingStudent.grade = grade;
  existingStudent.class = classId;
  await existingStudent.save();

  res.status(200).json({ message: 'Cập nhật thông tin sinh viên thành công' });
 } catch (err) {
  res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình cập nhật thông tin sinh viên' });
}
})
module.exports = router;
