import React, { useState } from 'react';
import ActivityFeed from './ActivityFeed';
import { useTheme } from '../ThemeContext';

export default function Login({ onLogin }) {
  const { settings } = useTheme();
  
  const feedItems = [
    { action: "System online", time: "just now" },
    { action: "Database synced", time: "2m ago" },
    { action: "Worker node started", time: "5m ago" },
    { action: "Security check passed", time: "12m ago" },
    { action: "Cache warmed up", time: "18m ago" },
  ];

  return (
    <div className={`app login-layout ${settings.dark ? "dark" : "light"}`} style={{ "--accent": settings.accent }}>
      <div className="login-container card">
        <h1 style={{ marginBottom: "8px", fontSize: "1.8rem", color: "var(--text)" }}>Welcome Back</h1>
        <p style={{ color: "var(--sub)", marginBottom: "36px", fontSize: "0.95rem" }}>
          Sign in to access the system dashboard.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--sub)', fontWeight: 500 }}>
            Username
            <input 
              type="text" 
              placeholder="admin" 
              className="login-input"
              required 
            />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--sub)', fontWeight: 500 }}>
            Password
            <input 
              type="password" 
              placeholder="••••••••" 
              className="login-input"
              required 
            />
          </label>

          <button type="submit" className="close-btn" style={{ marginTop: '16px', padding: '16px', fontSize: '1rem' }}>
            Sign In
          </button>
        </form>
      </div>

      <div className="login-feed">
         <ActivityFeed items={feedItems} />
      </div>
    </div>
  );
}
