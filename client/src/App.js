import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanImage from './pages/ScanImage';
import ScanText from './pages/ScanText';
import VerifyItems from './pages/VerifyItems';
import ScanBarcode from './pages/ScanBarcode';
import GuestNavbar from './components/GuestNavbar';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><GuestNavbar/><HomePage /></>} />
        <Route path="/signup" element={<><GuestNavbar/><SignUp /></>} />
        <Route path="/login" element={<><GuestNavbar/><Login /></>} />
        <Route path="/dashboard" element={<><Dashboard /></>} />
        <Route path="/scan-image" element={<><ScanImage /></>} />
        <Route path="/scan-text" element={<><ScanText /></>} />
        <Route path="/verify-items" element={<><VerifyItems /></>} />
        <Route path="/scan-barcode" element={<><ScanBarcode /></>} />
      </Routes>
    </Router>
  );
}

export default App;
