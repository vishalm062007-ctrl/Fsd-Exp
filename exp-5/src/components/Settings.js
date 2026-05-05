import React from 'react';
import { useTheme } from '../ThemeContext';

export default function Settings({ onClose }) {
  const { settings, update } = useTheme();
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>

        <label>
          Username
          <input
            value={settings.username}
            onChange={(e) => update("username", e.target.value)}
          />
        </label>

        <label>
          Accent Color
          <input
            type="color"
            value={settings.accent}
            onChange={(e) => update("accent", e.target.value)}
          />
        </label>

        <label className="toggle-row">
          Dark Mode
          <div
            className={`toggle ${settings.dark ? "on" : ""}`}
            onClick={() => update("dark", !settings.dark)}
          />
        </label>

        <button className="close-btn" onClick={onClose}>
          Save & Close
        </button>
      </div>
    </div>
  );
}
