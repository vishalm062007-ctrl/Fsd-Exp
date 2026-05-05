import React from 'react';
import AttendanceItem from './AttendanceItem';

const AttendanceList = ({ attendance, onUpdate, onDelete }) => {
  if (attendance.length === 0) {
    return <div className="empty-state">No attendance records found.</div>;
  }

  return (
    <div className="table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Roll Number</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <AttendanceItem 
              key={record._id} 
              record={record} 
              onUpdate={onUpdate} 
              onDelete={onDelete} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
