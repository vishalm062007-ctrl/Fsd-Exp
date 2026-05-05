import React, { useState } from 'react';

const ControlledForm = ({ addStudent }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: '',
        dob: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Invalid email format';
        if (!formData.course) newErrors.course = 'Please select a course';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addStudent(formData);
            setFormData({ name: '', email: '', course: '', dob: '' }); // Reset form
            setErrors({});
            alert('Student Registered Successfully!');
        }
    };

    return (
        <form className="student-form controlled" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="course">Course</label>
                <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={errors.course ? 'error-input' : ''}
                >
                    <option value="">Select a Course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Electronics">Electronics</option>
                </select>
                {errors.course && <span className="error-msg">{errors.course}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? 'error-input' : ''}
                />
                {errors.dob && <span className="error-msg">{errors.dob}</span>}
            </div>

            <button type="submit" className="submit-btn primary">Register Student</button>
        </form>
    );
};

export default ControlledForm;
