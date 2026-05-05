import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", venue: "" });

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/event");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async () => {
    if (!form.title || !form.venue || !form.date) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://localhost:5000/events", form);
      fetchEvents();
      setForm({ title: "", date: "", venue: "" });
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="event-manager">
      <div className="container">
        <header>
          <h1>Event Manager</h1>
          <p>Organize your occasions with style</p>
        </header>

        <div className="form-section card">
          <h2>Create New Event</h2>
          <div className="input-group">
            <input
              placeholder="Event Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            <input
              placeholder="Venue"
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
            />
          </div>
          <button onClick={addEvent} className="btn-add">
            Add Event
          </button>
        </div>

        <div className="list-section">
          <h2>Upcoming Events</h2>
          {events.length === 0 ? (
            <p className="empty-msg">No events scheduled yet.</p>
          ) : (
            <ul className="event-list">
              {events.map((e) => (
                <li key={e._id} className="event-item card">
                  <div className="event-info">
                    <h3>{e.title}</h3>
                    <div className="details">
                      <span>📅 {e.date}</span>
                      <span>📍 {e.venue}</span>
                    </div>
                  </div>
                  <button onClick={() => deleteEvent(e._id)} className="btn-delete">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
