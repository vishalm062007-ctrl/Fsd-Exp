import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import StatCard from './StatCard';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ActivityFeed from './ActivityFeed';
import Settings from './Settings';
import { randomBetween } from '../utils';

export default function Dashboard() {
  const { settings } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({
    cpu: 42,
    memory: 68,
    requests: 1240,
    uptime: 99.9,
    cpuTrend: 3,
    memTrend: -2,
    reqTrend: 5,
  });
  const [chartData, setChartData] = useState([40, 65, 55, 80, 70, 90, 60]);
  const [lineData, setLineData] = useState(() => Array.from({length: 12}, () => randomBetween(20, 100)));
  const [feed, setFeed] = useState([
    { action: "Server restarted", time: "2s ago" },
    { action: "New user signed up", time: "15s ago" },
    { action: "Deployment completed", time: "1m ago" },
    { action: "Cache cleared", time: "3m ago" },
    { action: "Alert resolved", time: "5m ago" },
  ]);

  /* Real-time simulation */
  useEffect(() => {
    const tick = setInterval(() => {
      setTime(new Date());

      setStats((prev) => ({
        cpu: Math.max(10, Math.min(99, prev.cpu + randomBetween(-5, 5))),
        memory: Math.max(20, Math.min(95, prev.memory + randomBetween(-3, 3))),
        requests: prev.requests + randomBetween(0, 30),
        uptime: 99.9,
        cpuTrend: randomBetween(-8, 8),
        memTrend: randomBetween(-5, 5),
        reqTrend: randomBetween(0, 12),
      }));

      setChartData((prev) => {
        const next = [...prev.slice(1), randomBetween(30, 100)];
        return next;
      });

      setLineData((prev) => {
        const next = [...prev.slice(1), randomBetween(20, 100)];
        return next;
      });

      setFeed((prev) => {
        const events = [
          "Request received",
          "Cache hit",
          "DB query executed",
          "New session started",
          "File uploaded",
          "Alert triggered",
          "User logged in",
        ];
        const newItem = {
          action: events[randomBetween(0, events.length - 1)],
          time: "just now",
        };
        return [newItem, ...prev.slice(0, 4)];
      });
    }, 2000);

    return () => clearInterval(tick);
  }, []);

  const accent = settings.accent;

  return (
    <div
      className={`app ${settings.dark ? "dark" : "light"}`}
      style={{ "--accent": accent }}
    >
      {/* Header */}
      <header className="topbar">
        <div>
          <h1>LiveDash</h1>
          <span className="greeting">Hello, {settings.username}!</span>
        </div>
        <div className="topbar-right">
          <span className="clock">{time.toLocaleTimeString()}</span>
          <span className="live-badge">LIVE</span>
          <button
            className="settings-btn"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </button>
        </div>
      </header>

      {/* Stat Cards */}
      <section className="grid stats-grid">
        <StatCard
          title="CPU Usage"
          value={stats.cpu}
          unit="%"
          trend={stats.cpuTrend}
        />
        <StatCard
          title="Memory"
          value={stats.memory}
          unit="%"
          trend={stats.memTrend}
        />
        <StatCard
          title="Requests"
          value={stats.requests}
          unit="/hr"
          trend={stats.reqTrend}
        />
        <StatCard
          title="Uptime"
          value={stats.uptime}
          unit="%"
          trend={0.1}
        />
      </section>

      {/* Charts + Feed Container */}
      <section className="grid bottom-grid">
        <div className="charts-column">
          <BarChart data={chartData} label="Weekly Requests" />
          <LineChart data={lineData} label="Users Connected" />
        </div>
        <div className="feed-column">
          <ActivityFeed items={feed} />
        </div>
      </section>

      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </div>
  );
}
