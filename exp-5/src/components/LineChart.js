import React from 'react';

export default function LineChart({ data, label }) {
  if (!data || data.length === 0) return null;

  const width = 1000;
  const height = 240;
  const padX = 10;
  const padY = 20;

  const max = Math.max(...data, 10);
  
  const getX = (i) => padX + (i / (data.length - 1)) * (width - padX * 2);
  const getY = (v) => height - padY - (v / max) * (height - padY * 2);

  const points = data.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
  const polygonPoints = `${padX},${height} ${points} ${width - padX},${height}`;

  return (
    <div className="card line-chart-card">
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>{label}</h3>
      <div style={{ flex: 1, width: '100%', position: 'relative', minHeight: 0 }}>
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
        >
          {/* subtle fill */}
          <polygon points={polygonPoints} fill="var(--accent)" opacity="0.1" />
          
          {/* line path */}
          <polyline
            points={points}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* points */}
          {data.map((v, i) => (
             <circle 
               key={i} 
               cx={getX(i)} 
               cy={getY(v)} 
               r="6" 
               fill="var(--surface)" 
               stroke="var(--accent)" 
               strokeWidth="3" 
             />
          ))}
        </svg>
      </div>
    </div>
  );
}
