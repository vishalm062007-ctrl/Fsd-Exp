import React from 'react';

export default function ActivityFeed({ items }) {
  return (
    <div className="card feed-card" style={{ flex: 1, minHeight: 0 }}>
      <h3 style={{ marginBottom: '8px' }}>Activity Feed</h3>
      <ul style={{ flex: 1, overflowY: 'auto', margin: 0, paddingRight: '12px' }}>
        {items.map((item, i) => (
          <li key={i} className="feed-item">
            <span className="dot" />
            <div>
              <strong>{item.action}</strong>
              <small>{item.time}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
