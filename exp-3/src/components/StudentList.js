import React from 'react';

const StudentList = ({ students, removeStudent }) => {
    if (students.length === 0) {
        return (
            <div className="empty-state">
                <p>No students registered yet.</p>
                <small>Use the form form to add records.</small>
            </div>
        );
    }

    return (
        <div className="student-list-container">
            <h2>Registered Students ({students.length})</h2>
            <div className="student-cards">
                {students.map((student) => (
                    <div key={student.id} className="student-card">
                        <div className="card-header">
                            <h3>{student.name}</h3>
                            <span className="badge">{student.course}</span>
                        </div>
                        <div className="card-body">
                            <p><strong>Email:</strong> {student.email}</p>
                            <p><strong>DOB:</strong> {student.dob}</p>
                        </div>
                        <button
                            className="delete-btn"
                            onClick={() => {
                                removeStudent(student.id);
                                alert(`${student.name} has been removed from the student list.`);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentList;
