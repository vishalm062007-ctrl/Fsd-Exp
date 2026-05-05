import React from 'react';

const AttendanceItem = ({ record, onUpdate, onDelete }) => {
  const toggleStatus = () => {
    const newStatus = record.status === 'Present' ? 'Absent' : 'Present';
    onUpdate(record._id, newStatus);
  };

  return (
    <tr className="attendance-row">
      <td>{record.studentName}</td>
      <td>{record.rollNumber}</td>
      <td>
        <span className={`status-badge ${record.status.toLowerCase()}`}>
          {record.status}
        </span>
      </td>
      <td>{new Date(record.date).toLocaleDateString()}</td>
      <td className="actions">
        <button 
          onClick={toggleStatus} 
          className="btn-update"
          title="Toggle Status"
        >
          Change Status
        </button>
        <button 
          onClick={() => onDelete(record._id)} 
          className="btn-delete"
          title="Delete Record"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AttendanceItem;
