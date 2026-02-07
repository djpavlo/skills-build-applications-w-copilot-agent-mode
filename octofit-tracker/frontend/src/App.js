import React from 'react';
import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App container py-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand d-flex align-items-center" to="/">
            <img src="/octofitapp-small.svg" alt="OctoFit" className="app-logo-small me-2" />
            <span>OctoFit</span>
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<div><h1>Welcome to OctoFit Tracker</h1><p>Select a page from the navigation.</p></div>} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
