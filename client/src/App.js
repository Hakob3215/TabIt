import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanImage from './pages/ScanImage';
import VerifyItems from './pages/VerifyItems';
import GuestNavbar from './components/GuestNavbar';
import ProfilePage from './pages/ProfilePage';
import MatchPage from './pages/MatchPage';
import Final from './pages/Final';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><GuestNavbar/><HomePage /></>} />
        <Route path="/signup" element={<><GuestNavbar/><SignUp /></>} />
        <Route path="/login" element={<><GuestNavbar/><Login /></>} />
        <Route path="/dashboard" element={<><Dashboard /></>} />
        <Route path="/scan-image" element={<><ScanImage /></>} />
        <Route path="/verify-items" element={<><VerifyItems /></>} />
        <Route path="/profile-page" element={<><ProfilePage /></>} />
        <Route path="/match-page" element={<><MatchPage /></>} />
        <Route path = "/final" element={<><Final/></>} />
      </Routes>
    </Router>
  );
}

export default App;
