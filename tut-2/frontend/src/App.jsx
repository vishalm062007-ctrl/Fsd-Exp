import React, { useState, useEffect } from 'react';
import AttendanceList from './components/AttendanceList';
import './index.css';

function App() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/attendance';

  // Fetch attendance list (GET)
  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch attendance');
      const data = await response.json();
      setAttendance(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Update attendance status (PUT)
  const handleUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) throw new Error('Update failed');
      
      const updatedRecord = await response.json();
      
      // Update state instantly
      setAttendance(prev => 
        prev.map(item => item._id === id ? updatedRecord : item)
      );
    } catch (err) {
      alert('Error updating record: ' + err.message);
    }
  };

  // Delete attendance record (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      // Update state instantly
      setAttendance(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      alert('Error deleting record: ' + err.message);
    }
  };

  return (
    <div className="portal-container">
      <header className="portal-header">
        <div className="header-content">
          <h1>Students Attendance Portal</h1>
          <p>Manage and track daily attendance with ease</p>
        </div>
      </header>

      <main className="portal-main">
        {loading ? (
          <div className="loader">Loading attendance data...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <div className="content-card">
            <div className="card-header">
              <h2>Attendance Summary</h2>
              <button onClick={fetchAttendance} className="btn-refresh">Refresh List</button>
            </div>
            <AttendanceList 
              attendance={attendance} 
              onUpdate={handleUpdate} 
              onDelete={handleDelete} 
            />
          </div>
        )}
      </main>

      <footer className="portal-footer">
        <p>&copy; 2024 Attendance Management System | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
