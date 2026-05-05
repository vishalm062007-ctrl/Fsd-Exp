import React, { useState } from 'react';
import ControlledForm from './ControlledForm';
import StudentList from './StudentList';
import '../App.css'; // We will style everything here

const StudentRegistration = () => {
    const [students, setStudents] = useState([]);

    const addStudent = (student) => {
        // Add unique ID
        const newStudent = { ...student, id: Date.now() };
        setStudents([...students, newStudent]);
    };

    const removeStudent = (id) => {
        setStudents(students.filter(student => student.id !== id));
    };

    return (
        <div className="registration-container">
            <header className="header">
                <h1>Student Registration Portal</h1>
                <p>Manage student records with precision and ease.</p>
            </header>



            <div className="content-grid">
                <div className="form-section">
                    <h2>New Student Registration</h2>
                    <p className="form-desc">
                        This form uses React state to control inputs, allowing for real-time validation.
                    </p>

                    <ControlledForm addStudent={addStudent} />
                </div>

                <div className="list-section">
                    <StudentList students={students} removeStudent={removeStudent} />
                </div>
            </div>
        </div>
    );
};

export default StudentRegistration;