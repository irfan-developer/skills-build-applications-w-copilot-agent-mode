import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand" to="/">OCTOFIT <span>TRACKER</span></NavLink>
          <nav aria-label="Primary navigation">
            {['users', 'activities', 'teams', 'leaderboard', 'workouts'].map((item) => (
              <NavLink key={item} to={`/${item}`} className="nav-link">
                {item}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
