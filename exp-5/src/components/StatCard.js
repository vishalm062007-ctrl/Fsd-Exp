import React from 'react';

export default function StatCard({ title, value, unit, trend }) {
  const isPercentage = unit === "%";
  const numValue = parseFloat(value) || 0;
  const percentage = isPercentage ? Math.min(100, Math.max(0, numValue)) : 0;
  const isPositive = trend >= 0;

  return (
    <div className="card stat-card">
      <div className="stat-header">
        <h3>{title}</h3>
        <span className={`trend ${isPositive ? "up" : "down"}`}>
          {isPositive ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          )}
          <span>{Math.abs(trend)}%</span>
        </span>
      </div>
      <div className="stat-content">
        <p className="big-num">
          {value}
          <small>{unit}</small>
        </p>
      </div>
      {isPercentage && (
        <div className="progress-bg">
          <div 
            className="progress-fill" style={{ width: `${percentage}%` }} 
          />
        </div>
      )}
    </div>
  );
}
