import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<h1>Signing Up</h1>}/>
        <Route path="/login" element={<h1>Logging In</h1>}/>
        <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
        <Route path="/scan-image" element={<h1>Scan Image</h1>}/>
        <Route path="/scan-text" element={<h1>Scan Text</h1>}/>
        <Route path="/verify-items" element={<h1>Scan Voice</h1>}/>
        <Route path="/scan-barcode" element={<h1>Scan Barcode</h1>}/>
      </Routes>
    </Router>
  );
}

export default App;
