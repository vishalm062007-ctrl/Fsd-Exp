import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './index.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleFeedbackSubmit = (newFeedback) => {
    setFeedbacks([newFeedback, ...feedbacks]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Feedback Portal</h1>
        <p>We value your thoughts! Share your experience with us.</p>
      </header>
      <main className="app-main">
        <section className="form-section">
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </section>
        <section className="list-section">
          <FeedbackList feedbacks={feedbacks} />
        </section>
      </main>
    </div>
  );
}

export default App;
