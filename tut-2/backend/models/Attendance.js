const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  status: { type: String, enum: ['Present', 'Absent'], default: 'Present' },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', attendanceSchema);
