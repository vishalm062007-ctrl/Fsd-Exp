const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Attendance = require('./models/Attendance');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/attendanceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes

// 1. Fetch all attendance records (GET)
app.get('/api/attendance', async (req, res) => {
  try {
    const attendance = await Attendance.find().sort({ date: -1 });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Add a new attendance record (POST - for testing/initial data)
app.post('/api/attendance', async (req, res) => {
  const record = new Attendance({
    studentName: req.body.studentName,
    rollNumber: req.body.rollNumber,
    status: req.body.status
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Update attendance status (PUT)
app.put('/api/attendance/:id', async (req, res) => {
  try {
    const updatedRecord = await Attendance.findByIdAndUpdate(
      req.id || req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4. Delete attendance record (DELETE)
app.delete('/api/attendance/:id', async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ message: 'Attendance record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
