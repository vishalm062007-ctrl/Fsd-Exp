import React from 'react';

export default function BarChart({ data, label }) {
  const max = Math.max(...data);
  return (
    <div className="card chart-card">
      <h3 style={{ marginBottom: '8px' }}>{label}</h3>
      <div className="bar-row" style={{ flex: 1, minHeight: 0 }}>
        {data.map((v, i) => (
          <div key={i} className="bar-wrap">
            <div
              className="bar"
              style={{ height: `${(v / max) * 100}%` }}
              title={v}
            />
            <span>{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
