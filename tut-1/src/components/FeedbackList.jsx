import React from 'react';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="list-container">
      <h2>Submitted Feedback</h2>
      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback submitted yet. Be the first!</p>
      ) : (
        <div className="feedback-grid">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="feedback-card">
              <div className="feedback-header">
                <h3>{fb.name}</h3>
                <span className="contact-info">
                  <span className="email">{fb.email}</span>
                  <span className="phone">{fb.contact}</span>
                </span>
              </div>
              <div className="feedback-body">
                <p>{fb.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
