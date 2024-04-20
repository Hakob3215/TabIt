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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/scan-image" element={<ScanImage/>} />
        <Route path="/scan-text" element={<ScanText/>} />
        <Route path="/verify-items" element={<VerifyItems/>} />
        <Route path="/scan-barcode" element={<ScanBarcode/>} />
      </Routes>
    </Router>
  );
}

export default App;
