import React, { useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";

/* ───── Main App Logic ───── */
function AppMain() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return <Dashboard />;
}

/* ───── Root ───── */
export default function App() {
  return (
    <ThemeProvider>
      <AppMain />
    </ThemeProvider>
  );
}
